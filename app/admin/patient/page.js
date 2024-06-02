'use client'
import '../dashboard.css'
import { useEffect, useState } from 'react'
import AdminSideBar from '../../components/common/admin/AdminSideBar'
import patientApi from '../../api/patient/PatientApi'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RoleEnum } from '../../../utils/enum/role.enum'
import Link from 'next/link'

const AdminPatientPage = () => {
    const router = useRouter();
    const auth = useSelector(state => state.auth);
    const [listPatients, setListPatients] = useState([])
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedWard, setSelectedWard] = useState('')

    if (auth.role !== RoleEnum.ADMIN) {
        router.push('/login');
        return null;
    }

    const getAllPatients = async () => {
        try {
            let response = await patientApi.getAllPatients()
            setListPatients(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getListProvinces = async () => {
        try {
          const response = await patientApi.getAllProvinces();
          setProvinces(response.data); 
        } catch (error) {
          console.error('Error fetching provinces:', error);
        }
    };

    const getListDistricts = async (selectedProvince) => {
        try {
          const response = await patientApi.getAllDistricts(selectedProvince);
          setDistricts(response.data); 
        } catch (error) {
          console.error('Error fetching provinces:', error);
        }
    };

    const getListWards = async (selectedDistrict) => {
        try {
          const response = await patientApi.getAllWards(selectedDistrict);
          setWards(response.data); 
        } catch (error) {
          console.error('Error fetching provinces:', error);
        }
    };

    useEffect(() => {
        getAllPatients()
        getListProvinces()
    }, [])

    useEffect(() => {
        if (selectedProvince) {
            getListDistricts(selectedProvince);
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            getListWards(selectedDistrict);
        }   
    }, [selectedDistrict]);


    const formatDate = (isoString) => {
        const date = new Date(isoString)
        return date.toLocaleDateString('vi-VN')
    }

    return (
        <main className='w-screen flex 2xl:mx-auto 2xl:border-x-2 2xl:border-indigo-50 '>
            <AdminSideBar />
            <section className='bg-indigo-50/60 w-full py-10 px-3 sm:px-10'>
                <nav className='text-lg flex items-center justify-between content-center '>
                    <div className=' font-semibold text-xl text-gray-800 flex space-x-4 items-center'>
                        <span className='px-3'>Quản lý bệnh nhân</span>
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
                        <Link
                            className='px-4 py-2 bg-indigo-100 rounded-md flex items-center space-x-2 text-indigo-500 hover:bg-indigo-200'
                            href='/admin/patient/create'
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
                        </Link>
                    </div>
                </nav>

                <div>
                    <div className='bg-rose-100/70 mt-12  rounded-xl px-5 sm:px-10  pt-8 pb-4 relative bg-no-repeat bg-right bg-contain '>
                        <div className='text-rose-500 font-semibold text-lg'>Thống kê</div>

                        <div className='mt-6 grid grid-cols-1 xs:grid-cols-2 gap-y-6  gap-x-6 md:flex md:space-x-6 md:gap-x-0 '>
                            <div className='flex flex-col md:w-40  text-gray-600 text-sm space-y-2 font-semibold'>
                                <label htmlFor='gender'>Giới tính</label>
                                <div className='inline-flex relative'>
                                    <select
                                        className='bg-blue-600/90 text-white  px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300'
                                        id='gender'
                                        name='gender'
                                    >
                                        <option value=''>Tất cả</option>
                                        <option value='Male'>Nam</option>
                                        <option value='Female'>Nữ</option>
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
                                <label htmlFor='province'>Tỉnh/Thành phố</label>
                                <div className='inline-flex relative'>
                                    <select
                                        className='bg-indigo-800/80 text-white  px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300'
                                        id='province'
                                        name='province'
                                        onChange={(e) => {
                                            setSelectedProvince(e.target.value)
                                        }}
                                    >
                                        <option value=''>Tất cả</option>
                                        {provinces?.map((province, index) => (
                                            <option key={index} value={province.id}>{province?.fullName}</option>
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

                            <div className='flex flex-col md:w-40  text-gray-600 text-sm space-y-2 font-semibold'>
                                <label htmlFor='district'>Quận/Huyên</label>
                                <div className='inline-flex relative'>
                                    <select
                                        className='bg-rose-400 text-white  px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300'
                                        id='district'
                                        name='district'
                                        onChange={(e) => {
                                            setSelectedDistrict(e.target.value)
                                        }}
                                        disabled={!selectedProvince}
                                    >
                                        <option value=''>Tất cả</option>
                                        {districts?.map((district, index) => (
                                            <option key={index} value={district.id}>{district?.fullName}</option>
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

                            <div className='flex flex-col md:w-40 text-gray-600 text-sm space-y-2 font-semibold'>
                                <label htmlFor='ward'>Xã/Phường/Thị trấn</label>
                                <div className='inline-flex relative'>
                                    <select
                                        className='bg-blue-600/70  text-white  px-4 py-3 rounded-lg appearance-none w-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300'
                                        id='ward'
                                        name='ward'
                                        onChange={(e) => {
                                            setSelectedWard(e.target.value)
                                        }}
                                        disabled={!selectedDistrict}
                                    >
                                        <option value=''>Tất cả</option>
                                        {wards?.map((ward, index) => (
                                            <option key={index} value={ward.id}>{ward?.fullName}</option>
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

                        <div className='mt-5 text-gray-500 text-sm '>
                            * Dữ liệu hiển thị theo thông tin đươc chọn
                        </div>
                    </div>
                </div>

                <div>
                    <div className='invoice-table-row invoice-table-header bg-white mt-10 rounded-xl px-10 py-4 flex items-center gap-x-3 text-sm font-semibold text-gray-600'>
                        <div className='text-center'>Bệnh nhân</div>
                        <div className='text-center'>Email</div>
                        <div className='text-center'>Ngày sinh</div>
                        <div className='text-center '>Số điện thoại</div>
                        <div className='text-center'>Địa chỉ</div>
                        <div className='text-center'>Giới tính</div>
                    </div>

                    <div className='bg-white mt-5 rounded-xl text-sm  text-gray-500 divide-y divide-indigo-50 overflow-x-auto text-center shadow cursor-pointer'>
                        {listPatients?.map((patient, index) => (
                            <Link 
                                href={`/admin/patient/${patient?.id}`}
                                key={index}
                                className='invoice-table-row flex items-center gap-x-3 px-2 py-4'
                            >
                                <div className='text-center '>{patient?.fullName}</div>
                                <div className='text-center'>{patient?.email}</div>
                                <div className='text-center'>
                                    {formatDate(patient?.birthday)}
                                </div>
                                <div className='text-center'>{patient?.phone}</div>
                                <div className='text-center'>{patient?.address}</div>
                                <div key={index} className='text-center'>{patient?.gender === 'Male' ? 'Nam' : 'Nữ' }</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AdminPatientPage
