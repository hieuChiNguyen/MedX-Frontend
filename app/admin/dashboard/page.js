'use client'
import '../dashboard.css'
import AdminSideBar from '../../components/common/admin/AdminSideBar'
import { useSelector } from 'react-redux'
import { RoleEnum } from '../../../utils/enum/role.enum'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import patientApi from '../../api/patient/PatientApi'
import doctorApi from '../../api/doctor/DoctorApi'
import appointmentApi from '../../api/appointment/AppointmentApi'

const AdminDashboardPage = () => {
    const router = useRouter();
    const auth = useSelector(state => state.auth)
    const [patientsLen, setPatientsLen] = useState(0)
    const [doctorsLen, setDoctorsLen] = useState(0)
    const [appointmentsLen, setAppointmentsLen] = useState(0)
    const [specialtiesLen, setSpecialtiesLen] = useState(0)
    const [doctorStatus, setDoctorStatus] = useState('all')
    const [appointmentStatus, setAppointmentStatus] = useState('all')
    const specialty = 'all'

    if (auth.role !== RoleEnum.ADMIN && auth.role !== RoleEnum.RECEPTIONIST) {
        router.push('/login');
        return null;
    }

    const fetchPatients = async() => {
        try {
            const response = await patientApi.getAllPatients();
            setPatientsLen(response.data.length); 
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    }

    const fetchDoctors = async(status) => {
        try {
            const response = await doctorApi.getAllDoctors(status, specialty)
            setDoctorsLen(response.data.length)
        } catch (error) {
            console.error('Error fetching patients:', error)
        }
    }

    const fetchAppointments = async(status) => {
        try {
            const response = await appointmentApi.getAllAppointments(status)
            setAppointmentsLen(response.data.length)
        } catch (error) {
            console.error('Error fetching patients:', error)
        }
    }

    const fetchSpecialties = async() => {
        try {
            const response = await doctorApi.getAllSpecialties()
            setSpecialtiesLen(response.data.length)
        } catch (error) {
            console.error('Error fetching patients:', error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([fetchPatients(), fetchDoctors(doctorStatus, specialty), fetchAppointments(appointmentStatus), fetchSpecialties()]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [doctorStatus, appointmentStatus]);

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
                    </div>
                </nav>

                <div>
                    <div className='bg-rose-100/70 mt-12  rounded-xl px-5 sm:px-10  pt-8 pb-4 relative bg-no-repeat bg-right bg-contain '>
                        <div className='text-rose-400 font-semibold text-lg'>Thống kê</div>

                        <div className='mt-6 grid grid-cols-1 xs:grid-cols-2 gap-y-6  gap-x-6 md:flex md:space-x-6 md:gap-x-0 '>
                            <div className='flex flex-col md:w-40  text-gray-600 text-sm space-y-2 font-semibold'>
                                <label htmlFor='doctor'>Bác sĩ</label>
                                <div className='inline-flex relative'>
                                    <select
                                        className='bg-indigo-400 text-white  px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300'
                                        id='doctor'
                                        name='doctor'
                                        onChange={(e) => setDoctorStatus(e.target.value)}
                                    >
                                        <option value='all'>Tất cả</option>
                                        <option value='active'>Đã duyệt</option>
                                        <option value='inactive'>Chờ duyệt</option>
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

                            <div className='flex flex-col md:w-40  text-gray-600 text-sm space-y-2 font-semibold'>
                                <label htmlFor='appointment'>Lịch hẹn</label>
                                <div className='inline-flex relative'>
                                    <select
                                        className='bg-rose-400 text-white  px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300'
                                        id='appointment'
                                        name='appointment'
                                        onChange={(e) => setAppointmentStatus(e.target.value)}
                                    >
                                        <option value='all'>Tất cả</option>
                                        <option value='new'>Lịch hẹn mới</option>
                                        <option value='accepted'>Đã chấp nhân</option>
                                        <option value='completed'>Đã khám xong</option>
                                        <option value='cancel'>Đã hủy</option>
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
                        <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                            <div className='bg-white rounded-lg shadow-lg p-6 flex flex-col items-center'>
                            <svg fill="#000000" className='h-12 w-12 text-indigo-600 mb-4' viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689zM23.001 30.015h-21.001v-1.788c0.143-0.105 0.344-0.226 0.502-0.298 0.047-0.021 0.094-0.044 0.139-0.070l6.459-3.503c0.589-0.32 0.979-0.912 1.039-1.579s-0.219-1.32-0.741-1.739c-1.677-1.345-2.396-4.322-2.396-5.911v-4.223c0-1.437 2.708-3.91 5.544-3.91 2.889 0 5.447 2.44 5.447 3.91v4.223c0 1.566-0.486 4.557-2.212 5.915-0.528 0.416-0.813 1.070-0.757 1.739s0.446 1.267 1.035 1.589l6.296 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.809zM30.312 21.123l-6.39-3.488c2.34-1.841 3.070-5.459 3.070-7.488v-4.223c0-2.796-3.808-5.941-7.54-5.941-2.425 0-4.904 1.319-6.347 3.007 0.823 0.051 1.73 0.052 2.514 0.302 1.054-0.821 2.386-1.308 3.833-1.308 2.889 0 5.54 2.47 5.54 3.941v4.223c0 1.566-0.58 4.557-2.305 5.915-0.529 0.416-0.813 1.070-0.757 1.739 0.056 0.67 0.445 1.267 1.035 1.589l6.39 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.779h-4.037c0.61 0.46 0.794 1.118 1.031 2h3.319c0.931 0 1.688-0.757 1.688-1.689v-2.503c-0.001-0.995-1.689-1.691-1.689-1.691z"></path>
                            </svg>
                                <div className='text-lg font-semibold text-gray-800'>Số bệnh nhân</div>
                                <div className='text-3xl font-bold text-indigo-600'>{patientsLen}</div>
                            </div>
                            
                            <div className='bg-white rounded-lg shadow-lg p-6 flex flex-col items-center'>
                            <svg fill="#000000" className='h-12 w-12 text-indigo-600 mb-4' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16,1H8A5.006,5.006,0,0,0,3,6v8a9,9,0,0,0,18,0V6A5.006,5.006,0,0,0,16,1ZM5,6A3,3,0,0,1,8,3h8a3,3,0,0,1,3,3v5H5Zm14,8A7,7,0,0,1,5,14V13H19ZM13,6h2V8H13v2H11V8H9V6h2V4h2Z"/>
                            </svg>
                                <div className='text-lg font-semibold text-gray-800'>Số bác sĩ</div>
                                <div className='text-3xl font-bold text-indigo-600'>{doctorsLen}</div>
                            </div>

                            <div className='bg-white rounded-lg shadow-lg p-6 flex flex-col items-center'>
                            <svg className='h-12 w-12 text-indigo-600 mb-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 10.312C3 5.93757 3.93757 5 8.312 5H15.688C20.0624 5 21 5.93757 21 10.312V15.688C21 20.0624 20.0624 21 15.688 21H8.312C3.93757 21 3 20.0624 3 15.688V10.312Z" stroke="#323232" stroke-width="2"/>
                                <path d="M6 5L6 3" stroke="#323232" stroke-width="2" stroke-linecap="round"/>
                                <path d="M18 5L18 3" stroke="#323232" stroke-width="2" stroke-linecap="round"/>
                                <path d="M7 9H17" stroke="#323232" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                                <div className='text-lg font-semibold text-gray-800'>Số lịch khám</div>
                                <div className='text-3xl font-bold text-indigo-600'>{appointmentsLen}</div>
                            </div>

                            <div className='bg-white rounded-lg shadow-lg p-6 flex flex-col items-center'>
                                <svg className='h-12 w-12 text-black mb-4' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 19V6h6v13M5 10h14' />
                                </svg>
                                <div className='text-lg font-semibold text-gray-800'>Số chuyên khoa</div>
                                <div className='text-3xl font-bold text-indigo-600'>{specialtiesLen}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AdminDashboardPage
