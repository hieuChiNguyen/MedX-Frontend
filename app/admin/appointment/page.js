'use client'
import '../dashboard.css'
import { useEffect, useState } from 'react'
import AdminSideBar from '../../components/common/admin/AdminSideBar'
import appointmentApi from '../../api/appointment/AppointmentApi'
import doctorApi from '../../api/doctor/DoctorApi'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RoleEnum } from '../../../utils/enum/role.enum'
import { AppointmentStatusEnum } from '../../../utils/enum/appointment_status.enum'
import Link from 'next/link'

const AdminAppointmentPage = () => {
    const router = useRouter();
    const auth = useSelector(state => state.auth);
    const [listAppointments, setListAppointments] = useState([])
    const [specialties, setSpecialties] = useState([])

    if (auth.role !== RoleEnum.ADMIN) {
        router.push('/login');
        return null;
    }

    const getAllAppointments = async () => {
        try {
            let response = await appointmentApi.getAllAppointments()
            setListAppointments(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getListSpecialties = async () => {
        try {
          const response = await doctorApi.getAllSpecialties();
          setSpecialties(response.data); 
        } catch (error) {
          console.error('Error fetching specialties:', error);
        }
    };

    useEffect(() => {
        getAllAppointments()
        getListSpecialties()
    }, [])

    const formatDate = (isoString) => {
        const date = new Date(isoString)
        return date.toLocaleDateString('vi-VN')
    }

    return (
        <main className='w-screen flex 2xl:mx-auto 2xl:border-x-2 2xl:border-indigo-50 '>
            <AdminSideBar />
            <section className='bg-indigo-50/60 w-full py-10 px-3'>
                <nav className='text-lg flex items-center justify-between content-center '>
                    <div className=' font-semibold text-xl text-gray-800 flex space-x-4 items-center'>
                        <span className='px-3'>Quản lý lịch khám</span>
                    </div>

                    <div className='flex space-x-5 md:space-x-10 text-gray-500 items-center content-center text-base '>
                        <a className='flex items-center space-x-3 px-4 py-2 rounded-md  hover:bg-indigo-100 cursor-pointer'>
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
                            href='/admin/appointment/create'
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
                        </a>
                    </div>
                </nav>

                <div>
                    <div className='bg-rose-100/70 mt-12  rounded-xl px-5 pt-8 pb-4 relative bg-no-repeat bg-right bg-contain '>
                        <div className='text-rose-500 font-semibold text-lg'>Thống kê</div>

                        <div className='mt-6 grid grid-cols-1 xs:grid-cols-2 gap-y-6  gap-x-6 md:flex md:space-x-6 md:gap-x-0 '>
                            <div className='flex flex-col  md:w-40  text-gray-600 text-sm space-y-2 font-semibold'>
                                <label htmlFor='client'>Từ ngày</label>
                                <div className='inline-flex relative'>
                                    <input
                                        className='bg-blue-600/90 text-white tracking-wider pl-4 pr-10 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 cursor-pointer'
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
                                <label htmlFor='client'>Đến ngày</label>
                                <div className='inline-flex relative'>
                                    <input
                                        className='bg-indigo-800/80 text-white tracking-wider pl-4 pr-10 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 cursor-pointer'
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
                                <label htmlFor='client'>Trạng thái</label>
                                <div className='inline-flex relative'>
                                    <select
                                        className='bg-rose-400 text-white  px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 cursor-pointer'
                                        id='client'
                                        name='client'
                                    >
                                        <option selected value=''>Tất cả</option>
                                        <option value='New'>Lịch hẹn mới</option>
                                        <option value='New'>Đã xác nhận</option>
                                        <option value='New'>Đã khám xong</option>
                                        <option value='New'>Đã hủy</option>
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
                                <label htmlFor='appointment'>Chuyên khoa</label>
                                <div className='inline-flex relative'>
                                    <select
                                        className='bg-blue-600/70  text-white  px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 cursor-pointer'
                                        id='appointment'
                                        name='appointment'
                                    >
                                        <option value=''>Tất cả</option>
                                        {specialties?.map((specialty, index) => (
                                            <option key={index}>{specialty?.nameVi}</option>
                                        ))}
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

                        <div className='mt-5 text-gray-500 text-sm'>
                            * Dữ liệu hiển thị theo thông tin đươc chọn
                        </div>
                    </div>
                </div>

                <div>
                    <div className='invoice-table-row invoice-table-header bg-white mt-10 rounded-xl py-4 flex px-5 items-center gap-x-1 text-sm font-semibold text-gray-600'>
                        <div className='text-center'>Patient</div>
                        <div className='text-center'>Expected Date Time</div>
                        <div className='text-center'>Expected Doctor</div>
                        <div className='text-center'>Reason</div>
                        <div className='text-center'>Health Insurance</div>
                        <div className='text-center'>Status</div>
                    </div>

                    <div className='bg-white mt-5 rounded-xl text-sm text-gray-500 divide-y divide-indigo-50 overflow-x-auto text-center shadow cursor-pointer'>
                        {listAppointments?.map((appointment, index) => (
                            <Link
                                href={`/admin/appointment/${appointment.id}`}
                                key={index}
                                className='invoice-table-row flex items-center gap-x-3 px-4 py-4'
                            >
                                <div className='text-center'>{appointment?.patientAppointment?.fullName}</div>
                                <div className='text-center'>
                                    {appointment?.expectedTime}, {formatDate(appointment?.appointmentDate)}
                                </div>
                                <div className='text-center'>{appointment?.expectedPosition}</div>
                                <div className='text-center'>{appointment?.examReason}</div>
                                <div className='text-center'>{appointment?.healthInsurance ? 'Có' : 'Không'}</div>
                                <div key={index} className='text-center '>
                                    <span className='px-4 py-1 rounded-lg bg-rose-400  text-white'>
                                        {appointment?.status ? appointment?.status : AppointmentStatusEnum.NEW}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AdminAppointmentPage
