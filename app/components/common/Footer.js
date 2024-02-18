'use client'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='bg-blue-900 mt-10'>
            <div className='flex flex-row gap-40 justify-start px-10 py-5'>
                <div className='flex flex-col gap-1 text-white'>
                    <h1 className='uppercase  text-2xl font-semibold'>
                        Med<span className=''>X</span>
                    </h1>
                    <p>
                        Dẫn đầu xu hướng dịch vụ <br /> chăm sóc sức khỏe
                    </p>
                </div>
                ,
                <div className='flex flex-col gap-4 text-white'>
                    <h3 className='text-lg font-semibold'>Về chúng tôi</h3>
                    <div className='flex flex-col gap-1'>
                        <Link href='/home/doctors' className='cursor-pointer hover:underline'>
                            Bác sĩ
                        </Link>
                        <Link href='/home/services' className='cursor-pointer hover:underline'>
                            Dịch vụ
                        </Link>
                        <Link href='/home/news' className='cursor-pointer hover:underline'>
                            Bản tin
                        </Link>
                        <Link href='/home/specialties' className='cursor-pointer hover:underline'>
                            Chuyên khoa
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col gap-4 text-white'>
                    <h3 className='text-lg font-semibold'>Liên hệ</h3>
                    <div className='flex flex-col gap-1'>
                        <p>Call : 0969871766</p>
                        <p>Email: nguyenchihieu1707@gmail.com</p>
                        <p>Address: Số 1 Giải Phóng</p>
                        <div className='flex flex-row gap-4'>
                            <i className='fa-brands fa-facebook-messenger text-2xl cursor-pointer'></i>
                            <i className='fa-brands fa-facebook text-2xl cursor-pointer'></i>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <h3 className='text-lg font-semibold text-white'>Đóng góp ý kiến</h3>
                    <div className='flex flex-row gap-4 py-2 px-6 bg-blue-email rounded-lg'>
                        <p className='text-blue-950'>Gửi email góp ý</p>
                        <i className='fa-regular fa-paper-plane text-blue-950'></i>
                    </div>
                </div>
            </div>

            <div className='border-t border-white py-5 px-10 text-white justify-center text-center'>
                <div className='flex flex-row justify-between'>
                    <p className='text-sm'>
                        <a href='#' className='block hover:underline'>
                            &copy; {new Date().getFullYear()} All Rights Reserved
                        </a>
                    </p>

                    <div className='col-span-1 text-sm'>
                        <ul className='flex flex-row gap-10'>
                            <li>
                                <a href='#' className='hover:underline'>
                                    Terms and Conditions
                                </a>
                            </li>
                            <li>
                                <a href='#' className='hover:underline'>
                                    Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
