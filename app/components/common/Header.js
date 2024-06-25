import assets from '../../../assets'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Profile from './Profile'
import { RoleEnum } from '../../../utils/enum/role.enum'
import Link from 'next/link'

const Header = () => {
    const authState = useSelector((state) => state.auth)
    return (
        <>
            <header className='flex flex-row justify-around mx-auto p-2'>
                <div className='uppercase font-bold text-5xl my-auto'>
                    <Link href={`${authState.role === RoleEnum.DOCTOR ? '/doctor' : '/'}`} className='text-black cursor-pointer'>
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
                            <p className='text-blue-400'>1900 1001</p>
                        </div>
                    </div>

                    <div className='flex flex-row justify-between gap-2'>
                        <div className='text-center justify-center'>
                            <Image src={assets.images.workHourIcon} alt='Work Hour' className='w-9 h-9' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='font-semibold'>Giờ làm việc</p>
                            <p className='text-blue-400'>08:00 - 17:00 Hằng ngày</p>
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
                    {
                        (authState.role === RoleEnum.PATIENT || authState.role === RoleEnum.DOCTOR) && (
                            <Profile />  
                        )
                    }
                </div>
            </header>
        </>
    )
}

export default Header
