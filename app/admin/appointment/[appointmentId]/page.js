'use client'
import React, { useState, useEffect } from 'react'
import AdminSideBar from '../../../components/common/admin/AdminSideBar'
import doctorApi from '../../../api/doctor/DoctorApi'
import toasts from '../../../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import appointmentApi from '../../../api/appointment/AppointmentApi'
import scheduleApi from '../../../api/schedule/ScheduleApi'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import TimeSlotEnum from '../../../../utils/enum/time_slot.enum'
import Image from 'next/image';
import assets from '../../../../assets'
import { useSelector } from 'react-redux'
import '../../datepicker.css'
import formatDateUntilSecond from '../../../../utils/ChangeDate'
import { parse, isWithinInterval } from 'date-fns';

const AppointmentInformationPage = ({params}) => {
  const appointmentId = params.appointmentId;
  const router = useRouter()
  const auth = useSelector(state => state.auth);

  const [appointment, setAppointment] = useState(null)
  const [specialties, setSpecialties] = useState([])
  const [positions, setPositions] = useState([])
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const timeSlots = Object.values(TimeSlotEnum)
  const [remainTimeSlots, setRemainTimeSlots] = useState([])
  const [suitableDoctors, setSuitableDoctors] = useState([])
  const [remainSchedule, setRemainSchedule] = useState({
    date: '',
    doctorId: ''
  })

  const [input, setInput] = useState({
    specialtyId: '',
    position: '',
    date: '',
    timeSlot:''
  })

  const handleInput = (fieldName, value) => {
    setInput({
        ...input,
        [fieldName]: value
    });
  };

  useEffect(() => {
    const fetchAppointmentDetail = async () => {
      try {
        const response = await appointmentApi.getAppointmentById(appointmentId);
        setAppointment(response.data);
      } catch (error) {
        console.error('Error fetching appointment detail:', error);
      }
    };

    if (appointmentId) {
      fetchAppointmentDetail();
    }
  }, [appointmentId]);

  const formatDate = (isoString) => {
    if (!isoString) return "";
  
    const date = new Date(isoString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
  
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  const getListSpecialties = async () => {
    try {
      const response = await doctorApi.getAllSpecialties();
      setSpecialties(response.data); 
    } catch (error) {
      console.error('Error fetching specialties:', error);
    }
  };

  const getListPositions = async () => {
    try {
      const response = await doctorApi.getAllPositions();
      setPositions(response.data); 
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  useEffect(() => {
      getListSpecialties()
      getListPositions()
  }, [])

  const findSuitableDoctors = async () => {
    try {
      const response = await doctorApi.findSuitableDoctors(input);
      if (response.errCode === 0) {
        setSuitableDoctors(response.data);
      } else {
        toasts.errorTopRight(response.message)
      }
    } catch (error) {
      console.error('Error fetching suitable doctors:', error)
    }
  }

  useEffect(() => {
    const isValid = Object.values(input).every((value) => value !== '')
    if (isValid && suitableDoctors.length > 0) {
      findSuitableDoctors()
    }
  }, [input])
  
  let appointmentDoctor = {
    doctorId: '',
    appointmentId: appointmentId,
    date: input.date,
    timeSlot: input.timeSlot,
    createBy: auth.id
  };

  const addDoctorToAppointment = async (doctorId) => {
    try {
        appointmentDoctor = {
          doctorId: doctorId,
          appointmentId: appointmentId,
          date: input.date,
          timeSlot: input.timeSlot,
          createBy: auth.id
        };
        let response = await appointmentApi.addDoctorToAppointment(appointmentDoctor)

        // Fail to create new doctor schedule
        if (response.errCode !== 0) {
            toasts.errorTopRight('Thêm bác sĩ thất bại.')
        }

        // Success to create new doctor schedule
        if (response.data && response.errCode === 0) {
            toasts.successTopRight('Thêm bác sĩ vào lịch khám thành công.')
            // setInput('')
            setInput(prevInput => ({
              ...prevInput,
              date: '',
              timeSlot: ''
            }));
            setTimeout(function () {
                router.push('/admin/appointment')
            }, 1500)
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    if (remainSchedule.date) {
        const getRemainSchedule = async () => {
            try {
                // console.log('chek remain::', remainSchedule)
                const response = await scheduleApi.getRemainScheduleByDate(remainSchedule)
                setRemainTimeSlots(response.data)
            } catch (error) {
                console.error('Error fetching remain schedules:', error)
            }
        }
        getRemainSchedule()
    }   
  }, [remainSchedule.date])

  // console.log('check console::', appointment);

  // Hàm parseTime chuyển đổi chuỗi giờ (hh:mm) thành đối tượng có giờ và phút
  const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(part => parseInt(part, 10));
    return { hours, minutes };
  }

  const filterTimeSlots = () => {
    if (!appointment?.expectedTime) return timeSlots;
  
    const [startTime, endTime] = appointment.expectedTime.split('-').map(parseTime);
  
    return timeSlots.filter((timeSlot) => {
      const [slotStartTime, slotEndTime] = timeSlot.split('-').map(parseTime);
      const slotStart = new Date(2000, 0, 1, slotStartTime.hours, slotStartTime.minutes);
      const slotEnd = new Date(2000, 0, 1, slotEndTime.hours, slotEndTime.minutes);
  
      const expectedStart = new Date(2000, 0, 1, startTime.hours, startTime.minutes);
      const expectedEnd = new Date(2000, 0, 1, endTime.hours, endTime.minutes);
  
      return isWithinInterval(slotStart, { start: expectedStart, end: expectedEnd }) &&
             isWithinInterval(slotEnd, { start: expectedStart, end: expectedEnd });
    });
  };
  
  const filteredTimeSlots = filterTimeSlots();  

  const cancelAppointment = async () => {
    try {
      const response = await appointmentApi.cancelAppointment(appointmentId)
      if (response.errCode === 0) {
        toasts.successTopRight('Hủy lịch khám thành công.')
        setTimeout(function () {
          router.push('/admin/appointment')
        }, 2000)
      } else {
        toasts.errorTopRight('Hủy lịch khám thất bại.')
      }
      
    } catch (error) {
      console.error('Error cancel appointment:', error);
    }
  }

  return (
    <main className='w-screen flex 2xl:mx-auto 2xl:border-x-2 2xl:border-indigo-50'>
      <AdminSideBar />

      <section className='bg-indigo-50/60 w-full py-10 px-3 sm:px-10'>
        <nav className='text-lg flex items-center justify-between content-center '>
            <div className=' font-semibold text-xl text-gray-800 flex space-x-4 items-center my-5'>
                <span>Thông tin chi tiết lịch khám</span>
            </div>

            <div 
              className='flex space-x-5 md:space-x-10 text-gray-500 items-center content-center text-base cursor-pointer'
              onClick={cancelAppointment}
            >
                <div
                    className='px-4 py-2 bg-red-100 rounded-md flex items-center space-x-2 text-red-500 hover:bg-red-200'
                    href='/admin/patient/create'
                >
                    <svg  className='h-5 w-5 fill-red-500' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.5001 6H3.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                      <path d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                      <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="#1C274C" stroke-width="1.5"/>
                    </svg>
                    <span>Hủy lịch khám</span>
                </div>
            </div>
        </nav>

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default">
              <div className="p-7">
                <form action="#">
                  <div className="mb-6 flex flex-col gap-6 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-16 font-medium text-blue-600"
                        htmlFor="fullName"
                      >
                        Họ và tên bệnh nhân
                      </label>
                      <div className="relative flex flex-row gap-10">
                        <input
                          className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                          type="text"
                          name="fullName"
                          id="fullName"
                          placeholder="Nguyễn Văn A"
                          value={appointment?.patientAppointment?.fullName}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-16 font-medium text-blue-600"
                        htmlFor="phone"
                      >
                        Số điện thoại bệnh nhân
                      </label>
                      <input
                        className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="+84 *** *** ***"
                        defaultValue={appointment?.patientAppointment?.phone}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="mb-6 flex flex-col gap-6 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-16 font-medium text-blue-600"
                        htmlFor="appointmentDate"
                      >
                        Hẹn lịch vào ngày
                      </label>
                      <div className="relative flex flex-row gap-10">
                        <input
                          className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                          name="appointmentDate"
                          id="appointmentDate"
                          placeholder="Ngày hẹn"
                          defaultValue={formatDate(appointment?.appointmentDate)}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-16 font-medium text-blue-600"
                        htmlFor="expectedTime"
                      >
                        Khung giờ mong muốn
                      </label>
                      <input
                        className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                        type="text"
                        name="expectedTime"
                        id="expectedTime"
                        placeholder="xx:xx AM - yy:yy AM"
                        defaultValue={appointment?.expectedTime}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="mb-6 flex flex-col gap-6 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-16 font-medium text-blue-600"
                        htmlFor="specialty"
                      >
                        Chuyên khoa
                      </label>
                      <div className="relative flex flex-row gap-10">
                        <input
                          className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                          name="specialty"
                          id="specialty"
                          placeholder="Chuyên khoa"
                          defaultValue={appointment?.specialtyAppointment?.nameVi}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-16 font-medium text-blue-600"
                        htmlFor="expectedPosittion"
                      >
                        Chức danh bác sĩ mong muốn
                      </label>
                      <input
                        className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                        type="text"
                        name="expectedPosittion"
                        id="expectedPosittion"
                        placeholder="Chức danh bác sĩ"
                        defaultValue={appointment?.expectedPosition}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="mb-6 flex flex-col gap-6 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-16 font-medium text-blue-600"
                        htmlFor="healthInsurance"
                      >
                        Sử dụng bảo hiểm y tế
                      </label>
                      <div className="relative flex flex-row gap-10">
                        <input
                          className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                          name="healthInsurance"
                          id="healthInsurance"
                          placeholder="Bảo hiểm y tế"
                          defaultValue={appointment?.healthInsurance === true ? 'Có' : 'Không'}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-16 font-medium text-blue-600"
                        htmlFor="status"
                      >
                        Trạng thái lịch hẹn
                      </label>
                      <input
                        className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                        type="text"
                        name="status"
                        id="status"
                        placeholder="Trạng thái"
                        defaultValue={appointment?.status}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      className="mb-3 block text-16 font-medium text-blue-600"
                      htmlFor="createdAt"
                    >
                      Thời gian đặt lịch
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                        type='text'
                        name="createdAt"
                        id="createdAt"
                        placeholder="Thời gian đặt lịch"
                        defaultValue={formatDateUntilSecond(appointment?.createdAt)}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      className="mb-3 block text-16 font-medium text-blue-600"
                      htmlFor="description"
                    >
                      Lý do khám bệnh
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                        name="description"
                        id="description"
                        rows={6}
                        placeholder="Sơ lược về bác sĩ"
                        defaultValue={appointment?.examReason}
                        disabled
                      ></textarea>
                    </div>
                  </div>

                  {/* <div className="flex justify-end gap-5">
                    <button
                      className="flex justify-center rounded bg-blue-400 py-2 px-6 font-medium text-gray hover:bg-opacity-80"
                      type="submit"
                    >
                      Sửa
                    </button>
                  </div> */}
                </form>
              </div>
            </div>
          </div>

          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default">
              <div className="p-7 flex flex-col gap-5">
                <div className='flex flex-col md:w-40 text-gray-600 text-sm space-y-2 font-semibold'>
                  <label htmlFor='specialtyId'>Chuyên khoa</label>
                    <div className='inline-flex relative w-60'>
                      <select
                          className='bg-blue-600/70 text-white px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 cursor-pointer'
                          id='specialtyId'
                          name='specialtyId'
                          onChange={(e) => {
                            handleInput('specialtyId', e.target.value)
                            setSelectedSpecialty(e.target.value)
                          }}
                      >
                          <option disabled hidden selected value=''>Chọn chuyên khoa</option>
                          {specialties?.map((specialty, index) => (
                              <option key={index} value={specialty.id}>{specialty?.nameVi}</option>
                          ))}
                      </select>
                      <span className='absolute top-0 right-0 m-3 pointer-events-none text-white'>
                          <svg
                              className='h-5 w-5'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                          >
                              <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M19 9l-7 7-7-7'
                              ></path>
                          </svg>
                      </span>
                    </div>
                </div>

                <div className='flex flex-col md:w-40 text-gray-600 text-sm space-y-2 font-semibold'>
                  <label htmlFor='appointment'>Chức danh</label>
                    <div className='inline-flex relative w-60'>
                      <select
                          className='bg-green-600/70 text-white px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 cursor-pointer'
                          id='appointment'
                          name='appointment'
                          onChange={(e) => {
                            handleInput('position', e.target.value)
                            setSelectedPosition(e.target.value)
                          }}
                      >
                        <option disabled hidden selected value=''>Chọn chức danh</option>
                        {positions?.map((position, index) => (
                          <option key={position.id} value={position.position}>
                            {position.position}
                          </option>
                        ))}
                      </select>
                      <span className='absolute top-0 right-0 m-3 pointer-events-none text-white'>
                          <svg
                              className='h-5 w-5'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                          >
                              <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M19 9l-7 7-7-7'
                              ></path>
                          </svg>
                      </span>
                    </div>
                </div>

                <div className='flex flex-col md:w-40 text-gray-600 text-sm space-y-2 font-semibold'>
                  <label htmlFor='timeSlot'>Khung giờ</label>
                    <div className='inline-flex relative w-60'>
                      <select
                          className='bg-orange-600/70 text-white px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 cursor-pointer'
                          id='timeSlot'
                          name='timeSlot'
                          onChange={(e) => {
                            handleInput('timeSlot', e.target.value)
                          }}
                      >
                          <option disabled hidden selected value=''>Chọn khung giờ</option>
                          {filteredTimeSlots?.map((timeSlot) => (
                              <option key={timeSlot} value={timeSlot}>
                                  {timeSlot}
                              </option>
                          ))}
                      </select>
                      <span className='absolute top-0 right-0 m-3 pointer-events-none text-white'>
                          <svg
                              className='h-5 w-5'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                          >
                              <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M19 9l-7 7-7-7'
                              ></path>
                          </svg>
                      </span>
                    </div>
                </div>

                <div className='flex flex-col md:w-40 text-sm space-y-2 font-semibold'>
                  <label htmlFor='appointment'>Ngày hẹn</label>
                    <div className='inline-flex relative w-60'>
                      <div
                          className='bg-pink-600/70 text-white rounded-lg appearance-none w-full'
                      >
                          <DatePicker
                            placeholderText={'Chọn ngày'}
                            selected={selectedDate}
                            onChange={(date) => {
                                setSelectedDate(date)
                                handleInput('date', format(date, 'yyyy-MM-dd'))
                            }}
                            dateFormat="dd-MM-yyyy"
                            showPopperArrow={true}
                            className='custom-datepicker w-60 rounded-lg px-4 py-3 text-sm outline-none text-white bg-pink-600/70 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 cursor-pointer'
                          />
                      </div>
                      <span className='absolute top-0 right-0 m-3 pointer-events-none text-white'>
                            <svg
                                className='h-5 w-5'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M19 9l-7 7-7-7'
                                ></path>
                            </svg>
                          </span>
                    </div>
                </div>
              </div>
            </div>

            <button
              className="rounded-2xl bg-blue-400 py-3 px-6 font-medium hover:bg-opacity-80 w-full my-5"
              onClick= { findSuitableDoctors }
            >
              Tìm bác sĩ phù hợp
            </button>
          </div>
        </div>

        {
          suitableDoctors ? (
            <div className='w-full px-1 py-10 flex flex-col gap-5'>
              <a id='list-doctors' className='text-blue-600 font-semibold text-xl'>-- Danh sách bác sĩ phù hợp --</a>
                {suitableDoctors.map((doctor, index) => (
                  <div className='flex flex-row w-full p-3 gap-20 border shadow-md rounded-lg' key={index}>
                    <div className='flex flex-row gap-10 bol'>
                      <Image sizes={20} src={assets.images.avatar} className='rounded-full w-28 h-28' alt='Avatar'/>
                      <div className='flex flex-col gap-4'>
                        <p className='text-blue-600 font-semibold'>{doctor?.position} {doctor?.doctorInformation?.fullName}</p>
                        <p>Chuyên khoa: {doctor?.doctorSpecialty?.nameVi}</p>
                        <button 
                          type='button' 
                          className='bg-blue-400 hover:bg-opacity-90 rounded-lg py-2 px-2'
                          onClick={() => addDoctorToAppointment(doctor.id) }
                        >
                          Thêm vào lịch khám
                        </button>
                      </div>
                    </div>
        
                    <div className='px-6 border-l-2'>
                      <div className='flex flex-row gap-2 items-center'>
                          <i className='fa-light fa-calendar-days text-lg'></i>
                          <p className='uppercase font-semibold text-blue-600'>Lịch khám còn trống </p>
                      </div>
        
                      <div className="relative inline-block my-3">
                            <select 
                                className="block appearance-none w-full text-sm rounded-lg bg-white border border-gray-300 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
                                onChange={(e) =>  {     
                                  setRemainSchedule({ doctorId: doctor.id, date: format(e.target.value, 'yyyy-MM-dd')})}
                                }   
                                value={remainSchedule.date} 
                                name='date'
                                id='date'
                            >
                                <option value='' disabled hidden selected>
                                    Chọn ngày trong tuần
                                </option>
                                <option id='date' value={selectedDate}>
                                    {selectedDate.toLocaleDateString('vi', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})}
                                </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 7l5 5 5-5z" /></svg>
                            </div>
                        </div>
        
                      <div className='grid grid-cols-4 gap-4 w-650 h-fit'>
                          {remainTimeSlots.map((timeSlot, index) => (
                              <div
                                  key={index}
                                  className='bg-gray-200 p-2 font-semibold text-sm cursor-pointer rounded-lg'
                              >
                                  {timeSlot.timeSlot}
                              </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : <></>
        }
      </section>
      <ToastContainer />
    </main>
  );
};

export default AppointmentInformationPage;
