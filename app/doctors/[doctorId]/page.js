'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import Image from 'next/image'
import assets from '../../../assets'
import doctorApi from '../../api/doctor/DoctorApi'
import Link from 'next/link'
import scheduleApi from '../../api/schedule/ScheduleApi'

const DoctorDetailPage = ({ params }) => {
    const router = useRouter()
    const doctorId = params.doctorId
    const [doctor, setDoctor] = useState(null)
    const [doctorContent, setDoctorContent]= useState(null)
    const timeSlotsSample = [
        '08:00 AM - 08:30 AM', '08:30 AM - 09:00 AM', '09:00 AM - 09:30 AM', '09:30 AM - 10:00 AM',
        '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM', '11:00 AM - 11:30 AM', '11:30 AM - 12:00 AM',
        '01:00 PM - 01:30 PM', '01:30 PM - 02:00 PM', '02:00 PM - 02:30 PM', '02:30 PM - 03:00 PM',
        '03:00 PM - 03:30 PM', '03:30 PM - 04:00 PM', '04:00 PM - 04:30 PM', '04:30 PM - 05:00 PM',
    ]
    const [timeSlots, setTimeSlots] = useState([])
    const [remainSchedule, setRemainSchedule] = useState({
        date: '',
        doctorId: doctorId
    }) 
  
    useEffect(() => {
      const fetchDoctorDetail = async () => {
        try {
          const response = await doctorApi.getDoctorById(doctorId)
          setDoctor(response.data)
        } catch (error) {
          console.error('Error fetching doctor detail:', error)
        }
      };

      const fetchDoctorDetailContent = async () => {
        try {
          const response = await doctorApi.getDoctorDetailContent(doctorId)
          setDoctorContent(response.data)
          console.log('check response.data::', response.data)
          console.log('check content::', doctorContent)
        } catch (error) {
          console.error('Error fetching doctor detail content:', error)
        }
      };
  
      if (doctorId) {
        fetchDoctorDetail()
        fetchDoctorDetailContent()
      }
    }, [doctorId]);
  
    const bookAppointment = () => {
        router.push(`/book-appointment`)
    }

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
        if (remainSchedule.date) {
            const getRemainSchedule = async () => {
                try {
                    console.log('run here::')
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
            {
                doctor && (
                    <>
                        <section className='w-[70%] mx-auto flex flex-row p-5 gap-4'>
                            <Image src={assets.images.doctorSample} alt='Doctor Sample' className='rounded-full h-28 w-28' />
                            <div className='flex flex-col gap-4'>
                                <h2 className='font-semibold text-2xl'>{doctor?.position} {doctor?.doctorInformation.fullName}</h2>
                                <div className='font-light text-gray-500'>
                                    Nguyên Trưởng phòng chỉ đạo tuyến tại Bệnh viện Da liễu Trung ương
                                    <br />
                                    Bác sĩ từng công tác tại Bệnh viện Da liễu Trung ương
                                    <br />
                                </div>
                            </div>
                        </section>

                        <section className='w-[70%] mx-auto flex flex-row p-5'>
                            <div className='flex flex-col gap-5 border-r-2 pr-20'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <i className='fa-light fa-calendar-days text-lg'></i>
                                    <p className='uppercase font-semibold'>Lịch khám còn trống</p>
                                </div>

                                <div className="relative inline-block my-3">
                                    <select 
                                        className="block appearance-none w-full rounded-lg bg-white border border-gray-300 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
                                        onChange={(e) =>  {      
                                            setRemainSchedule({ ...remainSchedule, date: e.target.value })}}   
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

                                <div>
                                    <p>Phí đặt lịch : 0 VND</p>
                                </div>
                            </div>

                            <div className='flex flex-col gap-5 pl-20 font-semibold'>
                                <div>
                                    <h3>CHUYÊN KHOA: 
                                        <span className='text-blue-800 uppercase'> {doctor?.doctorSpecialty.nameVi}</span>
                                    </h3>
                                </div>
                                <div className='uppercase'>GIÁ KHÁM:
                                    <span className='text-blue-800 uppercase'> {doctor?.price}.000 VND</span>
                                </div>
                                <Link
                                    href={'/book-appointment'}
                                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-16 px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                                >
                                    Đặt lịch khám
                                </Link>
                            </div>
                        </section>

                        <section className='w-[70%] mx-auto flex flex-row gap-10 p-5'>
                            <div>
                                <p className='text-xl font-semibold'>
                                    Thông tin chi tiết về {doctor?.position} {doctor?.doctorInformation.fullName}
                                </p>
                                {doctorContent ? (
                                    <div dangerouslySetInnerHTML={{ __html: doctorContent.contentHTML }} />
                                ) : (
                                    <p>Bác sĩ chưa cập nhật thông tin</p>
                                )}
                            </div>
                        </section>
                    </>
                    
                )
            }
            <Footer />
        </main>
    )
  };

export default DoctorDetailPage
