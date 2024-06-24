import { RoleEnum } from '../../../utils/enum/role.enum'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const tabs = [
        {
            link: '/',
            name: 'Trang chủ'
        },
        {
            link: '/about',
            name: 'Về chúng tôi'
        },
        {
            link: '/doctors',
            name: 'Bác sĩ'
        },
        {
            link: '/specialties',
            name: 'Chuyên khoa'
        },
        {
            link: '/news',
            name: 'Bản tin'
        }
    ]

    const [showModalUserMenu, setShowModalUserMenu] = useState(false)
    const authState = useSelector((state) => state.auth)

    const openModalUserMenu = () => {
        setShowModalUserMenu(true)
    }

    const closeModalUserMenu = () => {
        setShowModalUserMenu(false)
    }

    return (
        <nav className='flex flex-row justify-around bg-blue-800 py-5 text-white text-center'>
            <div className='flex flex-row justify-between gap-10'>
                {tabs.map((tab, index) => (
                    <Link href={tab.link} key={index} className='cursor-pointer text-lg hover:text-orange-500'>
                        {tab.name}
                    </Link>
                ))}
            </div>
            
            <div className='flex flex-row gap-10 '>
                {/* <i className='fa-regular fa-magnifying-glass' style={{ fontSize: '20px' }}></i> */}
                {
                    (authState.loggedIn && authState.role === RoleEnum.PATIENT) ? 
                        <div className='text-white text-center text-lg'>
                            Xin chào, {authState.username}
                        </div>
                        :
                        <Link href='/login' >
                            <button type='button' className='bg-blue-400 px-8 rounded-2xl py-1 hover:bg-red-400'>
                                Đăng nhập
                            </button>
                        </Link>     
                }
            </div>
        </nav>
    )
}

export default Navbar
