'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import assets from '../../../assets'
import { logout } from '../../../redux/reducers/authSlice'
import Link from 'next/link'
import authApi from '../../api/auth/AuthApi'
import { RoleEnum } from '../../../utils/enum/role.enum'
import toasts from '../../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Profile() {
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.auth)
    const doctorState = useSelector((state) => state.doctor)

    let profile_name, history_name
    if (authState.role === RoleEnum.PATIENT) {
        profile_name = 'Hồ sơ bệnh nhân'
        history_name = 'Lịch sử đặt khám'
    }

    if (authState.role === RoleEnum.DOCTOR) {
        profile_name = 'Hồ sơ bác sĩ'
        history_name = 'Lịch sử khám bệnh'
    }

    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [avatar, setAvatar] = useState(null);

    const handleShowProfileMenu = (e) => {
        e.preventDefault()
        setShowProfileMenu(!showProfileMenu)
    }

    const handleLogOut = async () => {
        let res = await authApi.logout()
        dispatch(logout())
        setShowProfileMenu(!showProfileMenu)
        localStorage.removeItem('accessToken')
        toasts.successTopCenter('Đăng xuất thành công !')
    }

    return (
        <div
            className='
                tl:inline-block
                lt:inline-block
                rounded-full
                my-auto
                cursor-pointer
                hover:shadow-md
                mb:mr-2
            '
        >
            <Image
                alt='AvatarIcon'
                height={60}
                width={60}
                src={authState.loggedIn && avatar ? avatar : assets.images.avatar}
                className='tl:block lt:block rounded-full p-1 h-[60px] mb:h-14 mb:w-14'
                onClick={(e) => handleShowProfileMenu(e)}
            />
            <div className='absolute rounded-xl shadow-md bg-white overflow-hidden top-24 z-10'>
                <div className='flex flex-col cursor-pointer'>
                    {authState.loggedIn ? (
                        <>
                            {showProfileMenu ? (
                                <>
                                    <Link href={authState.role === RoleEnum.PATIENT ? '/profile' : '/doctor/profile'}>
                                        <div className='px-2 py-2 hover:bg-neutral-200 transition-all font-medium'>
                                            {profile_name}
                                        </div>
                                    </Link>
                                    <Link href={authState.role === RoleEnum.PATIENT ? '/history' : '/doctor/history'}>
                                        <div className='px-2 py-2 hover:bg-neutral-200 transition-all font-medium'>
                                            {history_name}
                                        </div>
                                    </Link>
                                    <hr className='h-[2px] bg-gray-200' />
                                    <Link href={'/'}>
                                        <div
                                            className='px-2 py-2 hover:bg-neutral-200 transition-all font-medium'
                                            onClick={handleLogOut}
                                        >
                                            Đăng xuất
                                        </div>
                                    </Link>
                                </>
                            ) : null}
                        </>
                    ) : (
                        <>
                            {showProfileMenu ? (
                                <>
                                    <Link href={'/login'}>
                                        <div className='px-2 py-2 hover:bg-neutral-200 transition-all font-medium'>
                                           Đăng nhập 
                                        </div>
                                    </Link>
                                    <Link href={'/register'}>
                                        <div className='px-2 py-2 hover:bg-neutral-200 transition-all font-medium'>
                                            Đăng ký
                                        </div>
                                    </Link>
                                </>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Profile