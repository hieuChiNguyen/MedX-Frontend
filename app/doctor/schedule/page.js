'use client'
import React, { useState, useEffect } from 'react';
import Header from "../../components/common/Header";
import TimeSlotEnum from "../../../utils/enum/time_slot.enum"
import { useSelector } from 'react-redux';
import { RoleEnum } from '../../../utils/enum/role.enum';
import { useRouter } from 'next/navigation';
import scheduleApi from '../../api/schedule/ScheduleApi'
import toasts from '../../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addDays, getDay  } from 'date-fns'

const DoctorSchedulePage = () => {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState('')
    const timeSlots = Object.values(TimeSlotEnum);
    const [slotStatus, setSlotStatus] = useState(
        timeSlots.map(slot => ({ timeSlot: slot, isSelected: false }))
    );
    const auth = useSelector((state) => state.auth); 

    if (auth?.role === RoleEnum.DOCTOR && (auth?.doctorStatus === 'Inactive' || auth?.doctorStatus === '')) {
        router.push('/doctor');
        return null;
    }

    const [schedule, setSchedule] = useState({
        date: '',
        timeSlots: [],
        doctorId: auth.doctorId
    })

    const [doctorSchedules, setDoctorSchedules] = useState([]);

    const fetchDoctorSchedules = async () => {
        try {
            const response = await scheduleApi.getSchedulesOfDoctor(auth.doctorId);
            setDoctorSchedules(response.data);
        } catch (error) {
            console.error('Failed to fetch doctor schedules:', error);
        }
    };

    useEffect(() => {
        fetchDoctorSchedules();
    }, []);

    const handleSlotClick = (index) => {
        const updatedSlots = [...slotStatus];
        // Đảo ngược trạng thái isSelected của slot khi click
        updatedSlots[index].isSelected = !updatedSlots[index].isSelected;
        setSlotStatus(updatedSlots);
    };

    const getWeekdays = () => {
        const weekdays = [];
        const currentDate = new Date();
        let dayOfWeek = getDay(currentDate); // Lấy ngày hiện tại trong tuần (0 là Chủ nhật, 1 là Thứ 2, ..., 6 là Thứ 7)
        let startOfWeek;

        if (dayOfWeek === 6 ) {
            startOfWeek = addDays(currentDate, 2); // Next Monday
            for (let i = 0; i < 5; i++) {
                const date = new Date(startOfWeek);
                date.setDate(startOfWeek.getDate() + i);
                weekdays.push(date);
            }
        } else if (dayOfWeek === 0) {
            startOfWeek = addDays(currentDate, 1); // Next Monday
            for (let i = 0; i < 5; i++) {
                const date = new Date(startOfWeek);
                date.setDate(startOfWeek.getDate() + i);
                weekdays.push(date);
            }
        } else {
            const daysUntilFriday = 5 - dayOfWeek; // Calculate days until next Friday
            startOfWeek = currentDate;
            // endOfWeek = addDays(currentDate, daysUntilFriday);
            for (let i = 0; i <= daysUntilFriday; i++) {
                const date = new Date(startOfWeek);
                date.setDate(startOfWeek.getDate() + i);
                weekdays.push(date);
            }
        }
    
        return weekdays;
    };
    
    const weekdays = getWeekdays();

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const registerSchedule = async () => {
        const selectedTimeSlots = slotStatus.filter(slot => slot.isSelected).map(slot => slot.timeSlot);
        setSchedule(prevSchedule => ({
            ...prevSchedule,
            timeSlots: selectedTimeSlots
        }));

        if (selectedTimeSlots.length === 0) {
            setErrorMessage('Chưa chọn khung giờ nào.')
        }
    
        // Validate nếu ngày không được cung cấp
        if (!schedule.date) {
            setErrorMessage('Chưa chọn ngày trong tuần.')
        }

        const input = {
            date: schedule.date,
            timeSlots: selectedTimeSlots,
            doctorId: auth.doctorId
        };

        const isValid = Object.values(input).every((value) => value !== '')

        if (isValid) {
            try {
                let response = await scheduleApi.createNewSchedules(input)
    
                // Fail to create new schedules
                if (response.message !== 'OK') {
                    setErrorMessage(response.message)
                }
    
                // Success to create new schedules
                if (response.data && response.message === 'OK') {
                    toasts.successTopRight('Bác sĩ đăng ký lịch khám thành công.')
                    setErrorMessage('')
                    fetchDoctorSchedules()
                    // setTimeout(function () {
                    //     router.push('/doctor')
                    // }, 1500)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const groupedSchedules = {};
    if (doctorSchedules && doctorSchedules.length > 0) {
        doctorSchedules.forEach(schedule => {
            const date = formatDate(new Date(schedule.date));
            if (!groupedSchedules[date]) {
                groupedSchedules[date] = [];
            }
            groupedSchedules[date].push(schedule.timeSlot);
        });
    }

    return (
        <main>
            <Header />
            <div className="flex flex-col w-[80%] mx-auto items-center justify-center mb-10">
                <p className="p-1 mx-auto text-blue-600 font-semibold text-2xl mt-5">Đăng kí lịch khám trong tuần</p>
                <div className="relative inline-block my-3">
                    <select 
                        className="block appearance-none w-full rounded-lg bg-white border border-gray-300 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
                        value={schedule.date}
                        onChange={(e) => setSchedule({ ...schedule, date: e.target.value })}   
                    >
                        <option value='' disabled hidden selected>
                            Chọn ngày trong tuần
                        </option>
                        {weekdays.map((weekday, index) => (
                        <option key={index} id='date' value={formatDate(weekday)}>
                            {weekday.toLocaleDateString('vi', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 7l5 5 5-5z" /></svg>
                    </div>
                </div>
    
                <div className="my-3 grid grid-cols-4 gap-8">
                    {slotStatus?.map((slot, index) => (
                        <div 
                            key={index}
                            className={`border-2 rounded-lg border-gray-300 hover:bg-blue-400 p-3 cursor-pointer ${slot.isSelected ? 'bg-blue-400': 'bg-white'}`}
                            onClick={() => handleSlotClick(index)}
                        >
                            {slot.timeSlot}
                        </div>
                    ))}
                </div>

                {/* Error Notification */}
                <div className='w-full text-red-600 text-center text-sm py-5'>{errorMessage}</div>
         
                <button
                    className='p-3 w-60 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-opacity-80'
                    type="submit"
                    onClick={() => {
                        // console.log({ selectedSlots: slotStatus.filter(slot => slot.isSelected)})
                        registerSchedule()
                    }}
                >
                    Đăng ký lịch
                </button>
                
                <hr className='border-2 w-full my-2 border-blue-400'></hr>

                {/* Phần hiển thị các lịch bác sĩ vừa đăng ký */}
                <p className="p-1 mx-auto text-blue-600 font-semibold text-2xl mt-5">Các lịch đã đăng ký</p>
                <div className="grid grid-cols-3 gap-4">
                    {Object.entries(groupedSchedules).map(([date, timeSlots], index) => (
                        <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                            <h3 className="text-lg font-bold mb-2">{date}</h3>
                            <div className="flex flex-wrap">
                                {timeSlots.map((timeSlot, idx) => (
                                    <span 
                                        key={idx} 
                                        className="bg-gray-200 px-2 py-1 rounded mr-2 mb-2 cursor-pointer hover:bg-blue-300"
                                    >
                                        {timeSlot}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </main>
    );
};

export default DoctorSchedulePage;
