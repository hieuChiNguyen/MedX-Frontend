'use client'
import React, { useState, useEffect } from 'react'
import Header from "../../components/common/Header"
import Navbar from "../../components/common/Navbar"
import doctorApi from '../../api/doctor/DoctorApi'
import scheduleApi from '../../api/schedule/ScheduleApi'
import Image from 'next/image'
import assets from '../../../assets'
import Link from 'next/link'

const SpecialtyDetailPage = ({ params }) => {
    const specialtyId = params.specialtyId
    const [doctors, setDoctors] = useState([])
    const [specialty, setSpecialty] = useState(null)
    const [timeSlots, setTimeSlots] = useState([])
    const [remainSchedule, setRemainSchedule] = useState({
        date: '',
        doctorId: ''
    }) 

    const getWeekdays = () => {
        const weekdays = [];
        const currentDate = new Date();
        let day = currentDate.getDay(); // Lấy ngày hiện tại trong tuần (0 là Chủ nhật, 1 là Thứ 2, ..., 6 là Thứ 7)
    
        // Tính toán ngày bắt đầu của tuần
        let startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - (day - 1)); // Chuyển đến ngày đầu tiên của tuần (thứ 2)
    
        // Nếu ngày hiện tại là Chủ nhật hoặc Thứ 7, chuyển đến thứ 2 gần nhất sau
        if (day === 0 || day === 6) {
            startOfWeek.setDate(startOfWeek.getDate() + (day === 0 ? 1 : 2));
        }
    
        // Lặp qua các ngày từ Thứ 2 đến Thứ 6
        for (let i = 0; i < 5; i++) {
            // Tính toán ngày của mỗi ngày trong tuần
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            weekdays.push(date);
        }
    
        return weekdays;
    };
    
    const weekdays = getWeekdays()

    const formatDate = (date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    useEffect(() => {
        const getDoctorsBySpecialty = async () => {
        try {
            const response = await doctorApi.getListDoctorsBySpecialty(specialtyId)
            setDoctors(response.data)
        } catch (error) {
            console.error('Failed to fetch doctors by specialty:', error)
        }
        }

        const getDetailSpecialty = async () => {
            try {
                const response = await doctorApi.getDetailSpecialty(specialtyId)
                setSpecialty(response.data)
            } catch (error) {
                console.error('Failed to fetch detail specialty:', error)
            }
        }

        getDoctorsBySpecialty()
        getDetailSpecialty()
    }, [specialtyId]);

    useEffect(() => {
        if (remainSchedule.date) {
            const getRemainSchedule = async () => {
                try {
                    const response = await scheduleApi.getRemainScheduleByDate(remainSchedule)
                    setTimeSlots(response.data)
                    console.log('check t=re::', response.data);
                } catch (error) {
                    console.error('Error fetching remain schedules:', error)
                }
            }
            getRemainSchedule()
        }   
    }, [remainSchedule.date])

  return (
    <main>
      <Header />
      <Navbar />
      <section className="container mx-auto mt-5">
        <h1 className="text-2xl font-semibold mb-2 text-blue-500">{specialty?.nameVi}</h1>
        <p className='font-medium text-16'>{specialty?.description}</p>

        <h2 className='font-semibold text-lg my-5'>Danh sách bác sĩ {specialty?.nameVi}</h2>
        <div className="grid grid-cols-1 gap-6">
          {doctors && doctors.map((doctor) => (
            <div key={doctor.id} className="flex flex-row gap-10 bg-white shadow-md rounded-lg p-6">
                <div className="px-6 mx-auto flex flex-col gap-4 content-center">
                    <Image className="h-24 w-24 rounded-full mx-auto" src={assets.images.avatar} alt={doctor?.doctorInformation?.fullName} />
                    <h2 className="text-xl font-semibold">{doctor?.position} {doctor?.doctorInformation?.fullName}</h2>
                    <Link href={`/doctors/${doctor.id}`} className='text-blue-400 font-medium cursor-pointer'>Xem thêm ...</Link>
                </div>

                <div className='flex flex-col gap-5 border-l-2 pr-20 px-20 h-80 w-800'>
                    <div className='items-center'>
                        <p className='uppercase font-semibold p-2'>Lịch khám còn trống</p>
                    </div>

                    <div className="relative inline-block my-3">
                        <select 
                            className="block appearance-none w-full rounded-lg bg-white border border-gray-300 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
                            onChange={(e) =>  {      
                                setRemainSchedule({ doctorId: doctor.id, date: e.target.value })}
                            }   
                            value={remainSchedule.date}
                            name='date'
                            id='date'
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

                    <div className='grid grid-cols-4 gap-4'>
                        {
                            (timeSlots.length > 0 && remainSchedule.date !== '') && timeSlots.map((timeSlot, index) => (
                                <div
                                    key={index}
                                    className='bg-gray-200 p-2 font-semibold text-12'
                                >
                                    {timeSlot.timeSlot}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SpecialtyDetailPage;
