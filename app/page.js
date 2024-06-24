'use client'
import Link from 'next/link'
import Footer from '../app/components/common/Footer'
import Header from '../app/components/common/Header'
import Navbar from '../app/components/common/Navbar'
import assets from '../assets'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import doctorApi from './api/doctor/DoctorApi'
import shareApi from './api/share/ShareApi'
import DoctorsList from './components/doctor/DoctorList'
import SpecialtyList from './components/doctor/SpecialtyList'
import toasts from './components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const HomePage = () => {
    const [listDoctors, setListDoctors] = useState([])
    const [listSpecialties, setListSpecialties] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [inputCode, setInputCode] = useState({
        code: ''
    })
    const [sharedLink, setSharedLink] = useState('')

    const getListDoctors = async () => {
        try {
            let response = await doctorApi.getRandomTopDoctors()
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

    const verifyCode = async () => {
        try {
            let response = await shareApi.verifyCode(inputCode)
            if (response.data.check === true) {
                setSharedLink(response.data.url)
            }
            if (response.data.check === false) {
                toasts.errorTopCenter(response.message)
            }
           
        } catch (error) {
            console.log(error)
        }
    }

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
                            <p>Với sứ mệnh đem đến dịch vụ chăm sóc sức khỏe tốt nhất cho khách hàng, </p>

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

                    <p className='text-blue-500 font-semibold text-xl'>Bác sĩ nổi bật của MedX</p>

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

                    <p className='text-blue-500 font-semibold text-xl'>Chuyên khoa nổi bật của MedX</p>
                    
                    <SpecialtyList listSpecialties={listSpecialties}/>
                </section>
                <Footer />
            </section>
            {/* Fixed Button */}
            <button 
                className='fixed bottom-12 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg'
                onClick={() => setShowModal(true)}
            >
                Nhập mã code
            </button>

            {/* Modal */}
            {showModal && (
                <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50'>
                    <div className='bg-white p-5 rounded-lg shadow-lg w-full max-w-md'>
                        <h2 className='text-xl font-semibold mb-4'>Nhập mã code</h2>
                        <input
                            type='text'
                            placeholder='Nhập mã xác nhận'
                            value={inputCode.code}
                            onChange={(e) => setInputCode({ code: e.target.value })}
                            className='border p-2 w-full mb-4'
                        />
                        {sharedLink && (
                            <a 
                                href={sharedLink}
                                className='text-blue-500 underline mb-4 block'
                            >
                                Nhấn vào đây để tải về
                            </a>
                        )}
                        <button 
                            className='p-2 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600 cursor-pointer'
                            onClick={verifyCode}
                        >
                            Xác nhận
                        </button>
                        <button 
                            className='mt-4 p-2 bg-red-500 rounded-lg w-full hover:bg-red-600 cursor-pointer'
                            onClick={() => {
                                setShowModal(false)
                                setSharedLink('')
                                setInputCode('')
                            }}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
            <ToastContainer />
        </main>
    )
}

export default HomePage
