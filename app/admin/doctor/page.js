'use client'
import '../dashboard.css'
import { useEffect, useState } from 'react'
import doctorApi from '../../api/doctor/DoctorApi'
import AdminSideBar from '../../components/common/admin/AdminSideBar'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RoleEnum } from '../../../utils/enum/role.enum'
import Link from 'next/link'
import toasts from '../../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminDoctorPage = () => {
    const router = useRouter();
    const auth = useSelector(state => state.auth);
    const [render, setRender] = useState(false)

    useEffect(() => {
        if (auth.role !== RoleEnum.ADMIN && auth.role !== RoleEnum.RECEPTIONIST) {
            return router.push('/');
            // return null;
        } else {
            setRender(true)
        }
    }, [auth.id])

    if (auth?.role === RoleEnum.RECEPTIONIST) {
        router.push('/admin/dashboard');
        toasts.errorTopRight('Trang này chỉ dành cho Admin')
        // alert('Trang này chỉ dành cho Admin')
        return null;
    }

    const [listDoctors, setListDoctors] = useState([])
    const [specialties, setSpecialties] = useState([])
    const [doctorStatus, setDoctorStatus] = useState(0)
    const [specialtyId, setSpecialtyId] = useState('all')
    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 5;

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = listDoctors && listDoctors.length > 0 ? listDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor) : []

    const totalDoctors = listDoctors ? listDoctors.length : 0;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalDoctors / doctorsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getAllDoctors = async () => {
        try {
            let response = await doctorApi.getAllDoctors(doctorStatus, specialtyId)
            setListDoctors(response.data)
        } catch (error) {
            console.log('Error fetching doctors: ', error)
        }
    }

    const getListSpecialties = async () => {
        try {
          const response = await doctorApi.getAllSpecialties();
          setSpecialties(response.data); 
        } catch (error) {
          console.error('Error fetching specialties: ', error);
        }
    };

    useEffect(() => {
        getAllDoctors()
    }, [doctorStatus, specialtyId])

    useEffect(() => {
        getListSpecialties()
    }, [])

    return (
        render && 
        <main className='w-screen flex 2xl:mx-auto 2xl:border-x-2 2xl:border-indigo-50'>
            <AdminSideBar />
            <section className='bg-indigo-50/60 w-full py-10 px-3 sm:px-10'>
                <nav className='text-lg flex items-center justify-between content-center '>
                    <div className=' font-semibold text-xl text-gray-800 flex space-x-4 items-center'>
                        <span className='px-3'>Quản lý bác sĩ</span>
                    </div>
                </nav>

                <div>
                    <div className='bg-rose-100/70 mt-12  rounded-xl px-5 sm:px-10  pt-8 pb-4 relative bg-no-repeat bg-right bg-contain '>
                        <div className='text-rose-500 font-semibold text-lg'>Thống kê</div>

                        <div className='mt-6 grid grid-cols-1 xs:grid-cols-2 gap-y-6  gap-x-6 md:flex md:space-x-6 md:gap-x-0 '>
                            <div className='flex flex-col md:w-40  text-gray-600 text-sm space-y-2 font-semibold'>
                                <label htmlFor='doctor'>Trạng thái</label>
                                <div className='inline-flex relative'>
                                    <select
                                        className='bg-rose-400 text-white  px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 cursor-pointer'
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
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                                stroke-width='2'
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
                                        onChange={(e) => setSpecialtyId(e.target.value)}
                                    >
                                        <option value='all'>Tất cả</option>
                                        {specialties?.map((specialty, index) => (
                                            <option key={index} value={specialty.id}>{specialty?.nameVi}</option>
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
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                                stroke-width='2'
                                                d='M19 9l-7 7-7-7'
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='mt-5 text-gray-500 text-sm '>
                            * Dữ liệu hiển thị theo thông tin đươc chọn
                        </div>
                    </div>
                </div>

                <div className='relative'>
                    <div className='invoice-table-row invoice-table-header bg-white mt-10 rounded-xl px-5 py-4 flex items-center gap-x-3 text-sm font-semibold text-gray-600'>
                        <div className='text-center'>Bác sĩ</div>
                        <div className='text-center'>Email</div>
                        <div className='text-center'>CCCD</div>
                        <div className='text-center'>Chức danh</div>
                        <div className='text-center'>Chuyên khoa</div>
                        <div className='text-center'>Trạng thái</div>
                    </div>

                    <div className='bg-white mt-5 rounded-xl text-sm  text-gray-500 divide-y divide-indigo-50 overflow-x-auto text-center shadow cursor-pointer'>
                        {currentDoctors && currentDoctors?.map((doctor, index) => (
                            <Link
                                href={`/admin/doctor/${doctor.id}`}
                                key={index}
                                className='invoice-table-row flex items-center gap-x-3 px-4 py-4'
                            >
                                <div className='text-center '>{doctor?.doctorInformation?.fullName}</div>
                                <div className='text-center'>{doctor?.doctorInformation?.email}</div>
                                <div className='text-center'>{doctor?.citizenCard}</div>
                                <div className='text-center'>{doctor?.position}</div>
                                <div className='text-center'>{doctor?.doctorSpecialty.nameVi}</div>
                                <div className='text-center'>{doctor?.citizenNumber}</div>

                                <div className='text-center '>
                                    <span className={`px-4 py-1 rounded-lg text-white 
                                        ${doctor?.status === 'Inactive' ? 'bg-rose-400' : 'bg-blue-400'}`}
                                    >
                                        {doctor?.status}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <ul className="flex items-center mx-auto justify-center absolute -bottom-20 left-0 right-0">
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
                            {currentPage < Math.ceil(totalDoctors / doctorsPerPage) && (
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
            <ToastContainer />
        </main>
    )
}

export default AdminDoctorPage
