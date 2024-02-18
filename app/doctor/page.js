'use client'
import Image from 'next/image'
import Header from '@/app/components/common/Header'
import assets from '@/assets'
import Link from 'next/link'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const OnlyForDoctorPage = () => {
    return (
        <main>
            <Header />
            <Navbar />
            <section>
                <div className='relative '>
                    <Image src={assets.images.posterDoctor} alt='Poster Doctor' className='w-screen h-500' />
                    <p className='text-white text-lg absolute top-10 left-32 w-400 leading-8'>
                        MedX là nền tảng đặt lịch khám chuyên nghiệp
                        <br />
                        giúp bệnh nhân dễ dàng lựa chọn bác sĩ và
                        <br />
                        chuyên khoa phù hợp và đặt lịch nhanh chóng
                    </p>
                    <Link href='/doctor/cooperate'>
                        <button
                            className='p-3 w-60 rounded-2xl bg-blue-500 relative bottom-40 left-40 text-white font-semibold '
                            type='button'
                        >
                            Liên hệ hợp tác
                        </button>
                    </Link>
                </div>
            </section>

            <section className='w-[80%] flex flex-col gap-20 justify-center text-center mx-auto'>
                <p className='text-2xl text-blue-500 font-semibold'>Những lợi ích khi hợp tác cùng MedX</p>
                <div className='flex flex-row justify-around'>
                    <div className='flex flex-col border-1 p-5 gap-4 shadow-sm bg-blue-email text-blue-950 rounded-lg'>
                        <i className='fa-solid fa-up text-blue-600 font-semibold text-2xl'></i>
                        <p className='uppercase'>Tăng số lượng bệnh nhân</p>
                        <p>
                            Thông qua MedX , tăng số lượng <br /> bệnh nhân đặt khám với bác sĩ
                        </p>
                    </div>

                    <div className='flex flex-col border-1 p-5 gap-4 shadow-sm bg-blue-email text-blue-950 rounded-lg'>
                        <i className='fa-solid fa-up text-blue-600 font-semibold text-2xl'></i>
                        <p className='uppercase'>Tăng số lượng bệnh nhân</p>
                        <p>
                            Thông qua MedX , tăng số lượng <br /> bệnh nhân đặt khám với bác sĩ
                        </p>
                    </div>

                    <div className='flex flex-col border-1 p-5 gap-4 shadow-sm bg-blue-email text-blue-950 rounded-lg'>
                        <i className='fa-solid fa-up text-blue-600 font-semibold text-2xl'></i>
                        <p className='uppercase'>Tăng số lượng bệnh nhân</p>
                        <p>
                            Thông qua MedX , tăng số lượng <br /> bệnh nhân đặt khám với bác sĩ
                        </p>
                    </div>
                </div>
                <Link href='/doctor/cooperate'>
                    <button className='p-3 w-60 rounded-2xl bg-blue-500 text-white font-semibold ' type='button'>
                        Liên hệ hợp tác
                    </button>
                </Link>
            </section>

            <Footer />
        </main>
    )
}

export default OnlyForDoctorPage
