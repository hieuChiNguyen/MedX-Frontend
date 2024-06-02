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

const DoctorDetailPage = ({ params }) => {
    const router = useRouter()
    const doctorId = params.doctorId
    const [doctor, setDoctor] = useState(null)
    const [doctorContent, setDoctorContent]= useState(null)
    const timeSlots = [
        '08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30', '09:30 - 10:00',
        '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00',
        '13:00 - 13:30', '13:30 - 14:00', '14:00 - 14:30', '14:30 - 15:00',
        '15:00 - 15:30', '15:30 - 16:00', '16:00 - 16:30', '16:30 - 17:00',
    ]
  
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
          console.log('check response.data::', response.data);
          console.log('check content::', doctorContent);
        } catch (error) {
          console.error('Error fetching doctor detail content:', error);
        }
      };
  
      if (doctorId) {
        fetchDoctorDetail()
        fetchDoctorDetailContent()
      }
    }, [doctorId]);
  
    const bookAppointment = () => {
        router.push(`/patient-info`)
    }

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
                                    Nguyên Tổng Thư ký Hiệp hội Da liễu Việt Nam
                                </div>
                            </div>
                        </section>

                        <section className='w-[70%] mx-auto flex flex-row p-5'>
                            <div className='flex flex-col gap-5 border-r-2 pr-20'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <i className='fa-light fa-calendar-days text-lg'></i>
                                    <p className='uppercase font-semibold'>Lịch khám</p>
                                </div>

                                <div className='grid grid-cols-4 gap-4'>
                                    {timeSlots.map((timeSlot, index) => (
                                        <div
                                            key={index}
                                            className='bg-gray-200 p-2 font-semibold text-sm cursor-pointer'
                                            onClick={bookAppointment}
                                        >
                                            {timeSlot}
                                        </div>
                                    ))}
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
