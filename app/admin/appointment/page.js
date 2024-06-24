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
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import '../datepicker.css'
import 'react-datepicker/dist/react-datepicker.css';

const AdminAppointmentPage = () => {
    const router = useRouter();
    const auth = useSelector(state => state.auth);
    const [listAppointments, setListAppointments] = useState([])
    const [specialties, setSpecialties] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [appointmentStatus, setAppointmentStatus] = useState('all')
    const [selectedSpecialtyId, setSelectedSpecialtyId] = useState('all')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [render, setRender] = useState(false)
    const [rangeDate, setRangeDate] = useState({
        start: '',
        end: ''
    }) 
    const appointmentsPerPage = 5

    const handleRangeDate = (fieldName, value) => {
        setRangeDate({
            ...rangeDate,
            [fieldName]: value
        });
    };

    useEffect(() => {
        if (auth.role !== RoleEnum.ADMIN && auth.role !== RoleEnum.RECEPTIONIST) {
            return router.push('/');
            // return null;
        } else {
            setRender(true)
        }
    }, [auth.id])

    const getAllAppointments = async () => {
        try {
            let response = await appointmentApi.getAllAppointments(appointmentStatus, selectedSpecialtyId, rangeDate.start, rangeDate.end)
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

    const indexOfLastAppointment = currentPage * appointmentsPerPage
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage
    const currentAppointments = listAppointments && listAppointments.length > 0 ? listAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment): []
    const totalAppointments = listAppointments ? listAppointments.length : 0

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalAppointments / appointmentsPerPage); i++) {
        pageNumbers.push(i)
    }
    
    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const fetchAppointments = async() => {
        try {
            const response = await appointmentApi.getAllAppointments(appointmentStatus, selectedSpecialtyId, rangeDate.start, rangeDate.end)
            setListAppointments(response.data)
        } catch (error) {
            console.error('Error fetching patients:', error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchAppointments()
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        };

        fetchData();
    }, [appointmentStatus, selectedSpecialtyId, start, end])

    return (
        render && 
        <main className='w-screen flex 2xl:mx-auto 2xl:border-x-2 2xl:border-indigo-50 '>
            <AdminSideBar />
            <section className='bg-indigo-50/60 w-full py-10 px-3'>
                <nav className='text-lg flex items-center justify-between content-center '>
                    <div className=' font-semibold text-xl text-gray-800 flex space-x-4 items-center'>
                        <span className='px-3'>Quản lý lịch khám</span>
                    </div>
                </nav>

                <div>
                    <div className='bg-rose-100/70 mt-12  rounded-xl px-5 pt-8 pb-4 relative bg-no-repeat bg-right bg-contain '>
                        <div className='text-rose-500 font-semibold text-lg'>Thống kê</div>

                        <div className='mt-6 grid grid-cols-1 xs:grid-cols-2 gap-y-6  gap-x-6 md:flex md:space-x-6 md:gap-x-0 '>
                            <div className='flex flex-col  md:w-40  text-gray-600 text-sm space-y-2 font-semibold'>
                                <label htmlFor='start'>Từ ngày</label>
                                <div className='inline-flex relative'>
                                    <DatePicker
                                        id='start'
                                        selected={start}
                                        onChange={(date) => {
                                            setStart(date)
                                            handleRangeDate('start', format(date, 'yyyy-MM-dd'))
                                        }}
                                        placeholderText={'Chọn ngày'}
                                        dateFormat="dd-MM-yyyy"
                                        showPopperArrow={true}
                                        className='custom-datepicker bg-blue-600/90 text-white tracking-wider pl-4 pr-10 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 cursor-pointer'
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
                                <label htmlFor='end'>Đến ngày</label>
                                <div className='inline-flex relative'>
                                    <DatePicker
                                        id='end'
                                        selected={end}
                                        onChange={(date) => {
                                            setEnd(date)
                                            handleRangeDate('end', format(date, 'yyyy-MM-dd'))
                                        }}
                                        placeholderText={'Chọn ngày'}
                                        dateFormat="dd-MM-yyyy"
                                        showPopperArrow={true}
                                        className='custom-datepicker bg-indigo-800/80 text-white rounded-lg border-gray-200 p-3 text-sm border-2 cursor-pointer w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300'
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
                                <label htmlFor='appointment'>Trạng thái</label>
                                <div className='inline-flex relative'>
                                    <select
                                        className='bg-rose-400 text-white  px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 cursor-pointer'
                                        id='appointment'
                                        name='appointment'
                                        onChange={(e) => setAppointmentStatus(e.target.value)}
                                    >
                                        <option value='all'>Tất cả</option>
                                        <option value='new'>Lịch hẹn mới</option>
                                        <option value='accepted'>Đã xác nhận</option>
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

                            <div className='flex flex-col md:w-40 text-gray-600 text-sm space-y-2 font-semibold'>
                                <label htmlFor='specialty'>Chuyên khoa</label>
                                <div className='inline-flex relative'>
                                    <select
                                        className='bg-blue-600/70  text-white  px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 cursor-pointer'
                                        id='specialty'
                                        name='specialty'
                                        onChange={(e) => setSelectedSpecialtyId(e.target.value)}
                                    >
                                        <option value='all'>Tất cả</option>
                                        {specialties?.map((specialty, index) => (
                                            <option key={index} value={specialty?.id}>{specialty?.nameVi}</option>
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
                        <div className='text-center'>Bệnh nhân</div>
                        <div className='text-center'>Ngày hẹn đã đặt</div>
                        <div className='text-center'>Chức danh yêu cầu</div>
                        <div className='text-center'>Lý do khám</div>
                        <div className='text-center'>BHYT</div>
                        <div className='text-center'>Trạng thái</div>
                    </div>

                    <div className='bg-white mt-5 rounded-xl text-sm text-gray-500 divide-y divide-indigo-50 overflow-x-auto text-center shadow cursor-pointer'>
                        {currentAppointments?.map((appointment, index) => (
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
                                    <span className={`px-4 py-1 rounded-lg text-white ${appointment?.status === AppointmentStatusEnum.NEW || appointment?.status === AppointmentStatusEnum.CANCEL ? 'bg-rose-400' : 'bg-blue-400'}`}>
                                        {appointment?.status ? appointment?.status : AppointmentStatusEnum.NEW}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <ul className="flex items-center mx-auto justify-center absolute -bottom-40 left-40 right-0">
                        <li>
                            {currentPage > 1 && (
                                <button 
                                    className="py-2 px-4 bg-gray-200 text-gray-600 rounded-md hover:bg-indigo-500 hover:text-white transition duration-300"
                                    onClick={() => paginate(currentPage - 1)}
                                >
                                    {'<'}
                                </button>
                            )}
                        </li>
                        <li>
                            <div className="py-2 px-4 bg-gray-200 text-gray-600 rounded-md">
                                {currentPage}
                            </div>
                        </li>
                        <li>
                            {currentPage < Math.ceil(totalAppointments / appointmentsPerPage) && (
                                <button 
                                    className="py-2 px-4 bg-gray-200 text-gray-600 rounded-md hover:bg-indigo-500 hover:text-white transition duration-300"
                                    onClick={() => paginate(currentPage + 1)}
                                >
                                    {'>'}
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    )
}

export default AdminAppointmentPage
