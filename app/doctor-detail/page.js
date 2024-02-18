'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Navbar from '../components/common/Navbar'
import Image from 'next/image'
import assets from '@/assets'
import doctorApi from '../api/doctor/DoctorApi'

const DetailDoctorPage = () => {
    const router = useRouter()
    // const { doctorId } = router.query
    // console.log('check router query doctorId: ', doctorId)
    // console.log('check router query doctorId_: ', router.query)
    const doctorId = localStorage.getItem('doctorId')
    const [doctor, setDoctor] = useState({})

    const timeSlots = [
        '8:00 - 9:00',
        '9:00 - 10:00',
        '10:00 - 11:00',
        '11:00 - 12:00',
        '14:00 - 15:00',
        '15:00 - 16:00',
        '16:00 - 17:00',
        '17:00 - 18:00',
        '18:00 - 19:00'
    ]

    const getDetailDoctor = async (doctorId) => {
        try {
            let response = await doctorApi.getDoctorById(doctorId)
            setDoctor(response.data)
            console.log('doctors response: ', response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDetailDoctor(doctorId)
    }, [])

    const bookAppointment = () => {
        router.push(`/patient-info`)
    }

    return (
        <main>
            <Header />
            <Navbar />

            <section className='w-[70%] mx-auto flex flex-row p-5 gap-4'>
                <Image src={assets.images.doctorSample} alt='Doctor Sample' className='rounded-full h-28 w-28' />
                <div className='flex flex-col gap-4'>
                    <h2 className='font-semibold text-2xl'>Phó Giáo sư, Tiến sĩ {doctor.fullName}</h2>
                    <div>
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
                        <p>Phí đặt lịch : 0 Đ</p>
                    </div>
                </div>

                <div className='flex flex-col gap-5 pl-20'>
                    <div>
                        <h3>ĐỊA CHỈ KHÁM</h3>
                        <p>Phòng khám Chuyên khoa Da Liễu </p>
                        <p>207 Phố Huế - Hai Bà Trưng - Hà Nội</p>
                    </div>

                    <div className='uppercase'>GIÁ KHÁM: 300.000đ - 400.000đ</div>
                    <div className='uppercase'>LOẠI BẢO HIỂM ÁP DỤNG</div>
                </div>
            </section>

            <section className='w-[70%] mx-auto flex flex-row gap-10 p-5'>
                <div>
                    <p className='text-xl font-semibold'>
                        Thông tin chi tiết về Phó Giáo sư, Tiến sĩ {doctor.fullName}
                    </p>
                </div>
            </section>
            <Footer />
        </main>
    )
}

export default DetailDoctorPage
