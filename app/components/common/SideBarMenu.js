'use client'
import Link from 'next/link'

const SideBarMenu = ({ isOpenSidebar }) => {
    return (
        <aside
            className={`sidebar-container bg-white w-1/5 opacity-100 pl-10 border-r border-indigo-900/20 hidden md:block h-screen fixed top-0 left-0 z-10 
            ${isOpenSidebar ? 'animate-appearLeft' : ''}`}
        >
            <div className='mt-8 flex flex-col space-y-7 text-gray-500 font-medium'>
                <Link
                    className=' flex items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold'
                    href='/doctor'
                >
                    <i className='fa-light fa-user-doctor font-medium text-lg'></i>
                    <span>Dành cho Bác sĩ</span>
                </Link>
                <Link
                    className=' flex items-center space-x-2 py-1  group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold '
                    href='/login'
                >
                    <i className='fa-light fa-users-medical font-medium text-lg'></i>
                    <span>Dành cho bệnh nhân</span>
                </Link>
                <Link
                    className=' flex items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold '
                    href='/login'
                >
                    <i className='fa-sharp fa-light fa-calendar-check font-light text-lg'></i>
                    <span>Dành cho Quản trị viên</span>
                </Link>
            </div>
        </aside>
    )
}

export default SideBarMenu
