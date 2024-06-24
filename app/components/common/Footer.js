'use client'
import Link from 'next/link'
import { useState } from 'react';
import FeedbackModal from './FeedbackModal'
import { useSelector } from 'react-redux';
import toasts from '../../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Footer = () => {
    const auth = useSelector((state) => state.auth)
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    const openFeedbackModal = () => {
        if (auth.id) {
            setIsFeedbackModalOpen(true);
        } else {
            toasts.errorTopCenter('Đăng nhập để gửi phản hồi')
        }
    };

    const closeFeedbackModal = () => {
        setIsFeedbackModalOpen(false);
    };

    return (
        <footer className='bg-blue-900 mt-10'>
            <div className='flex flex-row gap-36 justify-start px-10 py-5'>
                <div className='flex flex-col gap-1 text-white'>
                    <h1 className='uppercase  text-2xl font-semibold'>
                        Med<span className=''>X</span>
                    </h1>
                    <p>
                        Dịch vụ chăm sóc sức khỏe uy tín
                    </p>
                </div>
                ,
                <div className='flex flex-col gap-4 text-white'>
                    <h3 className='text-lg font-semibold'>Về chúng tôi</h3>
                    <div className='flex flex-col gap-1'>
                        <Link href='/about' className='cursor-pointer hover:underline'>
                            Về MedX
                        </Link>
                        <Link href='/doctors' className='cursor-pointer hover:underline'>
                            Bác sĩ
                        </Link>
                        <Link href='/news' className='cursor-pointer hover:underline'>
                            Bản tin
                        </Link>
                        <Link href='/specialties' className='cursor-pointer hover:underline'>
                            Chuyên khoa
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col gap-4 text-white'>
                    <h3 className='text-lg font-semibold'>Liên hệ</h3>
                    <div className='flex flex-col gap-1'>
                        <p>Call : 0969871888</p>
                        <p>Email: nguyenchihieu1707@gmail.com</p>
                        <p>Address: Số 1 Giải Phóng</p>
                        <div className='flex flex-row gap-4'>
                            <Link href={'https://www.facebook.com/profile.php?id=100047590084942&locale=vi_VN'}>
                                <i className='fa-brands fa-facebook-messenger text-2xl cursor-pointer'></i>
                            </Link>
                            <Link href={'https://www.facebook.com/profile.php?id=100047590084942&locale=vi_VN'}>
                                <i className='fa-brands fa-facebook text-2xl cursor-pointer'></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <h3 className='text-lg font-semibold text-white'>Đóng góp ý kiến</h3>
                    <div className='flex flex-row gap-4 py-2 px-6 bg-blue-email rounded-lg cursor-pointer' onClick={openFeedbackModal}>
                        <p className='text-blue-950'>Gửi email góp ý</p>
                        <i className='fa-regular fa-paper-plane text-blue-950'></i>
                    </div>
                </div>
            </div>

            <div className='border-t border-white py-5 px-10 text-white justify-center text-center'>
                <div className='flex flex-row justify-between'>
                    <p className='text-sm'>
                        <a href='/' className='block hover:underline'>
                            {/* &copy; {new Date().getFullYear()} All Rights Reserved */}
                            &copy; {new Date().getFullYear()} Bản quyền thuộc MedX
                        </a>
                    </p>

                    <div className='col-span-1 text-sm'>
                        <ul className='flex flex-row gap-10'>
                            <li>
                                <a href='/' className='hover:underline'>
                                    {/* Terms and Conditions */}
                                    Điều khoản và điều kiện
                                </a>
                            </li>
                            <li>
                                <a href='/' className='hover:underline'>
                                    {/* Policy */}
                                    Chính sách
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {isFeedbackModalOpen && <FeedbackModal onClose={closeFeedbackModal} auth={auth}/>}
            <ToastContainer />
        </footer>
    )
}

export default Footer
