'use client'
import '../dashboard.css'
import AdminSideBar from '../../components/common/admin/AdminSideBar'
import { useSelector } from 'react-redux'
import { RoleEnum } from '../../../utils/enum/role.enum'
import { useRouter } from 'next/navigation'

const AdminDashboardPage = () => {
    const router = useRouter();
    const auth = useSelector(state => state.auth);

    if (auth.role !== RoleEnum.ADMIN) {
        router.push('/login');
        return null;
    }

    return (
        <main className='w-screen flex 2xl:mx-auto 2xl:border-x-2 2xl:border-indigo-50 '>
            <AdminSideBar />
            <section className='bg-indigo-50/60 w-full py-10 px-3 sm:px-10'>
                <nav className='text-lg flex items-center justify-between content-center '>
                    <div className=' font-semibold text-xl text-gray-800 flex space-x-4 items-center'>
                        <a href='#'>
                            <span className='md:hidden'>
                                <svg
                                    className='h-6 w-6'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M4 6h16M4 12h16M4 18h7'
                                    ></path>
                                </svg>
                            </span>
                        </a>
                        <span>Dashboard</span>
                    </div>

                    <div className='flex space-x-5 md:space-x-10 text-gray-500 items-center content-center text-base '>
                        <a className='flex items-center space-x-3 px-4 py-2 rounded-md  hover:bg-indigo-100' href='#'>
                            <span>
                                <svg
                                    className='h-5 w-5'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                                    ></path>

                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                    ></path>
                                </svg>
                            </span>
                            <span className='hidden sm:block'>Cài đặt</span>
                        </a>
                        <a
                            className='px-4 py-2 bg-indigo-100 rounded-md flex items-center space-x-2 text-indigo-500 hover:bg-indigo-200'
                            href='#'
                        >
                            <svg
                                className='h-5 w-5 fill-indigo-500'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
                                    clipRule='evenodd'
                                ></path>
                            </svg>
                            <div className='hidden xs:block'>
                                <span className='hidden sm:inline-block'>Create</span> New
                            </div>
                        </a>
                        <a className='' href='#'>
                            {/* <img
                                className='rounded-full w-10 h-10 border-2 border-indigo-200 hover:border-indigo-300'
                                src='images/avatar.jpg'
                                alt
                                srcset
                            /> */}
                        </a>
                    </div>
                </nav>

                <div>
                    <div className='bg-rose-100/70 mt-12  rounded-xl px-5 sm:px-10  pt-8 pb-4 relative bg-no-repeat bg-right bg-contain '>
                        <div className='text-rose-400 font-semibold text-lg'>Thống kê</div>

                        <div className='mt-6 grid grid-cols-1 xs:grid-cols-2 gap-y-6  gap-x-6 md:flex md:space-x-6 md:gap-x-0 '>
                            <div className='flex flex-col  md:w-40  text-gray-600 text-sm space-y-2 font-semibold'>
                                <label htmlFor='client'>Begin Date</label>
                                <div className='inline-flex relative'>
                                    <input
                                        className='bg-indigo-800/80 text-white tracking-wider pl-4 pr-10 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300'
                                        id='client'
                                        name='client'
                                        type='text'
                                        value='2019/02/28'
                                        onChange={() => {}}
                                    />

                                    <span className='absolute top-0 right-0 m-3 pointer-events-none text-white'>
                                        <svg
                                            className='h-5 w-5'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className='flex flex-col md:w-40  text-gray-600 text-sm space-y-2 font-semibold'>
                                <label htmlFor='client'>End Date</label>
                                <div className='inline-flex relative'>
                                    <input
                                        className='bg-indigo-800/50 text-white tracking-wider pl-4 pr-10 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300'
                                        id='client'
                                        name='client'
                                        type='text'
                                        value='2019/12/09'
                                        onChange={() => {}}
                                    />

                                    <span className='absolute top-0 right-0 m-3 pointer-events-none text-white'>
                                        <svg
                                            className='h-5 w-5'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className='flex flex-col md:w-40  text-gray-600 text-sm space-y-2 font-semibold'>
                                <label htmlFor='client'>Status</label>
                                <div className='inline-flex relative'>
                                    <select
                                        className='bg-rose-400 text-white  px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300'
                                        id='client'
                                        name='client'
                                    >
                                        <option value='Any'>Any</option>
                                    </select>
                                    <span className='absolute top-0 right-0 m-3 pointer-events-none text-white'>
                                        <svg
                                            className='h-5 w-5'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M19 9l-7 7-7-7'
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className='flex flex-col md:w-40 text-gray-600 text-sm space-y-2 font-semibold'>
                                <label htmlFor='appointment'>Appointments</label>
                                <div className='inline-flex relative'>
                                    <select
                                        className='bg-blue-600/70  text-white  px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300'
                                        id='appointment'
                                        name='appointment'
                                    >
                                        <option value='Any'>Any</option>
                                    </select>
                                    <span className='absolute top-0 right-0 m-3 pointer-events-none text-white'>
                                        <svg
                                            className='h-5 w-5'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M19 9l-7 7-7-7'
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='mt-5 text-gray-500 text-sm '>
                            * Dữ liệu sẽ hiển thị theo thông tin được cung cấp
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AdminDashboardPage
