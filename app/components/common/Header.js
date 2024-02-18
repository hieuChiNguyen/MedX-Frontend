import { useState } from 'react'
import assets from '@/assets'
import Image from 'next/image'
import Link from 'next/link'

const Header = ({ openSidebar }) => {
    return (
        <>
            <header className='flex flex-row justify-around mx-auto p-2'>
                <div className='flex flex-row gap-5 uppercase font-bold text-4xl my-auto'>
                    <i
                        onClick={openSidebar}
                        className='fa-sharp fa-regular fa-bars cursor-pointer hover:text-blue-500'
                    ></i>
                    <Link href='/' className='text-black '>
                        Med
                        <span className='text-blue-400'>X</span>
                    </Link>
                </div>

                <div className='flex flex-row justify-between gap-10 text-start'>
                    <div className='flex flex-row justify-between gap-2'>
                        <div className='text-center justify-center'>
                            <Image src={assets.images.emergencyIcon} alt='Emergency' className='w-10 h-10' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='font-semibold'>Khẩn cấp</p>
                            <p className='text-blue-400'>0969871766</p>
                        </div>
                    </div>

                    <div className='flex flex-row justify-between gap-2'>
                        <div className='text-center justify-center'>
                            <Image src={assets.images.workHourIcon} alt='Work Hour' className='w-9 h-9' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='font-semibold'>Giờ làm việc</p>
                            <p className='text-blue-400'>09:00 - 20:00 Hằng ngày</p>
                        </div>
                    </div>

                    <div className='flex flex-row justify-between gap-2'>
                        <div className='text-center justify-center'>
                            <Image src={assets.images.locationIcon} alt='Location' className='w-8 h-10' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='font-semibold'>Vị trí</p>
                            <p className='text-blue-400'>Số 1 Giải Phóng</p>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
