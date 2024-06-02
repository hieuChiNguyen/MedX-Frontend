'use client'
import Link from 'next/link'
import Footer from '../app/components/common/Footer'
import Header from '../app/components/common/Header'
import Navbar from '../app/components/common/Navbar'
import assets from '../assets'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import doctorApi from './api/doctor/DoctorApi'
import DoctorsList from './components/doctor/DoctorList'
import SpecialtyList from './components/doctor/SpecialtyList'

const HomePage = () => {
    const [listDoctors, setListDoctors] = useState([])
    const [listSpecialties, setListSpecialties] = useState([])

    const getListDoctors = async () => {
        try {
            let response = await doctorApi.getAllActiveDoctors()
            setListDoctors(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getListSpecialties = async () => {
        try {
            let response = await doctorApi.getTopSpecialties()
            setListSpecialties(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getListDoctors()
        getListSpecialties()
    }, [])

    return (
        <main>
            <section>
                <Header />
                <Navbar />

                <section className='relative'>
                    <div>
                        <Image
                            src={assets.images.posterHome}
                            alt='Poster Home'
                            className='w-[80%] mx-auto min-h-fit cursor-pointer'
                        />
                    </div>
                    <div className='flex flex-row justify-around text-center font-medium w-[80%] mx-auto relative -top-8 left-0'>
                        <Link href='/book-appointment' className='flex flex-row justify-between'>
                            <div className='flex flex-row p-4 bg-blue-300 w-60 gap-5 text-xl text-center justify-center rounded-md cursor-pointer'>
                                <p className='text-lg'>Đặt lịch khám</p>
                                <i className='fa-sharp fa-light fa-calendar-days font-medium'></i>
                            </div>
                        </Link>

                        <Link href='/doctors' className='flex flex-row justify-between'>
                            <div className='flex flex-row p-4 bg-blue-300 w-60 gap-5 text-xl text-center justify-center rounded-md cursor-pointer '>
                                <p className='text-lg'>Bác sĩ</p>
                                <i className='fa-light fa-user-doctor font-medium'></i>
                            </div>
                        </Link>

                        <Link href='/specialties' className='flex flex-row justify-between'>
                            <div className='flex flex-row p-4 bg-blue-300 w-60 gap-5 text-xl text-center justify-center rounded-md cursor-pointer'>
                                <p className='text-lg'>Chuyên khoa</p>
                                <i className='fa-regular fa-list font-medium'></i>
                            </div>
                        </Link>
                    </div>
                </section>

                <section className='mt-5'>
                    <div className='flex flex-col w-[80%] mx-auto text-center justify-center gap-5'>
                        <p className='uppercase font-semibold text-blue-500 text-lg'>Chào mừng đến với MEDX</p>
                        <p className='uppercase font-semibold text-blue-800 text-2xl'>
                            Sức khỏe của bạn là niềm vui của chúng tôi
                        </p>
                        <div>
                            <p>Với sứ mệnh đem đến dịch vụ chăm sóc sức khỏe tại nhà tốt nhất cho khách hàng, </p>

                            <p>MedX là nơi bạn có thể trao trọn niềm tin</p>
                        </div>
                        <Link href='/about' className='text-center justify-center mx-auto'>
                            <div className='flex flex-row gap-1'>
                                <p className='text-blue-400'>Xem thêm</p>
                                <i className='fa-sharp fa-solid fa-arrow-right text-blue-800 '></i>
                            </div>
                        </Link>
                        <Image
                            src={assets.images.posterIntro}
                            alt='Poster Introduction'
                            className='mx-auto justify-center'
                        />
                    </div>
                </section>

                <section className='flex flex-col gap-5 mx-auto w-[80%] text-center justify-center mt-10'>
                    <div>
                        <p className='uppercase font-semibold text-blue-500 text-lg'>Bạn có thể tin tưởng</p>
                        <p className='uppercase font-semibold text-blue-800 text-2xl'>Dịch vụ của chúng tôi</p>
                    </div>

                    <p className='text-blue-500 font-semibold text-xl'>Bác sĩ của MedX</p>

                    <Link href='/doctors' className='text-center justify-center mx-auto'>
                        <div className='flex flex-row gap-1'>
                            <p className='text-blue-400'>Xem thêm</p>
                            <i className='fa-sharp fa-solid fa-arrow-right text-blue-800 '></i>
                        </div>
                    </Link>

                    <DoctorsList listDoctors={listDoctors} />
                </section>

                <section className='flex flex-col gap-5 mx-auto w-[80%] text-center justify-center mt-20'>
                    <div>
                        <p className='uppercase font-semibold text-blue-500 text-lg'>Bạn có thể tìm thấy</p>
                        <p className='uppercase font-semibold text-blue-800 text-2xl'>
                            Chuyên khoa đa dạng từ chúng tôi
                        </p>
                    </div>

                    <Link href='/specialties' className='text-center justify-center mx-auto'>
                        <div className='flex flex-row gap-1'>
                            <p className='text-blue-400'>Xem thêm</p>
                            <i className='fa-sharp fa-solid fa-arrow-right text-blue-800 '></i>
                        </div>
                    </Link>

                    <p className='text-blue-500 font-semibold text-xl'>Chuyên khoa của MedX</p>
                    
                    <SpecialtyList listSpecialties={listSpecialties}/>
                </section>
                <Footer />
            </section>
        </main>
    )
}

export default HomePage
