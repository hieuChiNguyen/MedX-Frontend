'use client'
import Image from 'next/image'
import Header from '..//components/common/Header'
import assets from '../../assets'
import Link from 'next/link'
import Footer from '../components/common/Footer'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RoleEnum } from '../../utils/enum/role.enum'

const OnlyForDoctorPage = () => {
    const router = useRouter();
    const auth = useSelector(state => state.auth);

    if (auth.role !== RoleEnum.DOCTOR) {
        router.push('/login');
        return null;
    }

    return (
        <main>
            <Header />
            <section>
                <div className='relative'>
                    <Image src={assets.images.posterDoctor} alt='Poster Doctor' className='w-screen h-500 bg-opacity-10' />
                    <p className='text-blue-400 text-2xl absolute top-10 left-32 font-semibold'>Chào mừng 
                        <span className='text-blue-600'> {auth?.username} </span>
                        tham gia MedX.
                    </p>
                    <p className='text-white text-lg absolute top-20 left-32 w-fit leading-8'>
                        MedX là nền tảng đặt lịch khám chuyên nghiệp, tiện lợi và nhanh chóng
                        <br />
                        giúp bệnh nhân dễ dàng lựa chọn bác sĩ cùng chuyên khoa phù hợp.
                    </p>
                    <div className='flex flex-row gap-20'>
                        <Link href='/doctor/cooperate' >
                            <button
                                className='p-3 w-60 rounded-2xl bg-blue-500 relative bottom-40 left-32 text-white font-semibold'
                            >
                                Đăng ký hợp tác
                            </button>
                        </Link>

                        <Link href='/doctor/schedule' >
                            <button
                                className='p-3 w-60 rounded-2xl bg-blue-500 relative bottom-40 left-32 text-white font-semibold'
                            >
                                Đăng ký lịch khám bệnh
                            </button>
                        </Link>

                        <Link href='/doctor/cooperate' >
                            <button
                                className='p-3 w-60 rounded-2xl bg-blue-500 relative bottom-40 left-32 text-white font-semibold'
                            >
                                Lịch khám bệnh 
                            </button>
                        </Link>
                    </div>
                    
                </div>
                
            </section>

            <section className='w-[80%] flex flex-col gap-20 justify-center text-center mx-auto'>
                <p className='text-2xl text-blue-500 font-semibold'>Những lợi ích khi hợp tác cùng MedX</p>
                <div className='flex flex-row justify-around'>
                    <div className='flex flex-col border-1 p-5 gap-4 shadow-sm bg-blue-email text-blue-950 rounded-lg w-[30%]'>
                        <i className='fa-solid fa-up text-blue-600 font-semibold text-2xl'></i>
                        <p className='uppercase'>Tăng số lượng bệnh nhân</p>
                        <p>
                            Thông qua MedX , tăng số lượng <br /> bệnh nhân đặt khám với bác sĩ
                        </p>
                    </div>

                    <div className='flex flex-col border-1 p-5 gap-4 shadow-sm bg-blue-email text-blue-950 rounded-lg w-[30%]'>
                        <i className='fa-solid fa-money-bill text-blue-600 font-semibold text-2xl'></i>
                        <p className='uppercase'>Chế độ đãi ngộ</p>
                        <p>
                            Chế độ và lương thường tại MedX <br /> dành cho bác sĩ vô cùng hấp dẫn
                        </p>
                    </div>

                    <div className='flex flex-col border-1 p-5 gap-4 shadow-sm bg-blue-email text-blue-950 rounded-lg w-[30%]'>
                        <i className='fa-solid fa-globe text-blue-600 font-semibold text-2xl'></i>
                        <p className='uppercase'>Xây dựng danh tiếng trên Internet</p>
                        <p>
                            Ngày nay, bệnh nhân có xu hướng tìm hiểu <br /> thông tin trực tuyến trước khi đi khám
                        </p>
                    </div>
                </div>

                <div className='flex flex-row justify-around'>
                    <div className='flex flex-col border-1 p-5 gap-4 shadow-sm bg-blue-email text-blue-950 rounded-lg w-[30%]'>
                        <i className='fa-solid fa-up text-blue-600 font-semibold text-2xl'></i>
                        <p className='uppercase'>Tăng số lượng bệnh nhân</p>
                        <p>
                            Thông qua MedX , tăng số lượng <br /> bệnh nhân đặt khám với bác sĩ
                        </p>
                    </div>

                    <div className='flex flex-col border-1 p-5 gap-4 shadow-sm bg-blue-email text-blue-950 rounded-lg w-[30%]'>
                        <i className='fa-solid fa-money-bill text-blue-600 font-semibold text-2xl'></i>
                        <p className='uppercase'>Chế độ đãi ngộ</p>
                        <p>
                            Chế độ và lương thường tại MedX <br /> dành cho bác sĩ vô cùng hấp dẫn
                        </p>
                    </div>

                    <div className='flex flex-col border-1 p-5 gap-4 shadow-sm bg-blue-email text-blue-950 rounded-lg w-[30%]'>
                        <i className='fa-solid fa-globe text-blue-600 font-semibold text-2xl'></i>
                        <p className='uppercase'>Xây dựng danh tiếng trên Internet</p>
                        <p>
                            Ngày nay, bệnh nhân có xu hướng tìm hiểu <br /> thông tin trực tuyến trước khi đi khám
                        </p>
                    </div>
                </div>
                <Link href='/doctor/cooperate'>
                    <button className='p-3 w-60 rounded-2xl bg-blue-500 text-white font-semibold ' type='button'>
                        Đăng ký hợp tác
                    </button>
                </Link>
            </section>

            <Footer />
        </main>
    )
}

export default OnlyForDoctorPage
