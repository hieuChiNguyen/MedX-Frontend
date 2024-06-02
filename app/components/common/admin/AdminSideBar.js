import Link from 'next/link'
import { useState, useEffect } from 'react'
import { logout } from '../../../../redux/reducers/authSlice'
import { useDispatch } from 'react-redux'
import authApi from '../../../api/auth/AuthApi'
import toasts from '../../common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const AdminSideBar = () => {
    const dispatch = useDispatch()
    const [selectedLink, setSelectedLink] = useState(null)

    const handleLinkClick = (link) => {
        setSelectedLink(link)
    }

    useEffect(() => {
        // Lấy href của trang hiện tại và cập nhật selectedLink
        const currentPath = window.location.pathname
        setSelectedLink(currentPath)
    }, [])

    const handleLogOut = async () => {
        let res = await authApi.logout()
        dispatch(logout())
        localStorage.removeItem('accessToken')
        toasts.successTopCenter('Đăng xuất thành công !')
    }

    return (
        <aside className='bg-white w-1/5 py-10 pl-10 border-r border-indigo-900/20 hidden md:block '>
            <div className=' font-bold text-2xl uppercase text-blue-500'>MedX Admin</div>

            <div className='mt-12 flex flex-col space-y-7 text-gray-500 font-medium'>
                <Link
                    className={`flex flex-row gap-4 text-center w-full items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold ${
                        selectedLink === '/admin/dashboard' ? 'font-semibold border-r-indigo-700' : ''
                    }`}
                    href='/admin/dashboard'
                    onClick={() => handleLinkClick('/admin/dashboard')}
                >
                    <i className='fa-light fa-table-columns font-semibold text-lg w-1/5'></i>
                    <span>Tổng quan</span>
                </Link>

                <Link
                    className={`flex flex-row gap-4 text-center w-full items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold ${
                        selectedLink === '/admin/doctor' ? 'font-semibold border-r-indigo-700' : ''
                    }`}
                    href='/admin/doctor'
                    onClick={() => handleLinkClick('/admin/doctor')}
                >
                    <i className='fa-light fa-user-doctor font-medium text-lg w-1/5'></i>
                    <span>Bác sĩ</span>
                </Link>
                <Link
                    className={`flex flex-row gap-4 text-center w-full items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold ${
                        selectedLink === '/admin/patient' ? 'font-semibold border-r-indigo-700' : ''
                    }`}
                    href='/admin/patient'
                    onClick={() => handleLinkClick('/admin/patient')}
                >
                    <i className='fa-light fa-users-medical font-medium text-lg w-1/5'></i>
                    <span>Bệnh nhân</span>
                </Link>
                <Link
                    className={`flex flex-row gap-4 text-center w-full items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold ${
                        selectedLink === '/admin/appointment' ? 'font-semibold border-r-indigo-700' : ''
                    }`}
                    href='/admin/appointment'
                    onClick={() => handleLinkClick('/admin/appointment')}
                >
                    <i className='fa-sharp fa-light fa-calendar-check font-light text-lg w-1/5'></i>
                    <span>Lịch khám</span>
                </Link>
                <div
                    className={`flex flex-row gap-4 text-center w-full items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold cursor-pointer`}
                    onClick={handleLogOut}
                >
                    <i className='fa-light fa-right-from-bracket font-light text-lg w-1/5'></i>
                    <span>Đăng xuất</span>
                </div>
            </div>
            <ToastContainer />
        </aside>
    )
}

export default AdminSideBar
