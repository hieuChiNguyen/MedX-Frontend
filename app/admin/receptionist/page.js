'use client'
import '../dashboard.css'
import { useEffect, useState } from 'react'
import AdminSideBar from '../../components/common/admin/AdminSideBar'
import receptionistApi from '../../api/receptionist/ReceptionistApi'
import patientApi from '../../api/patient/PatientApi'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RoleEnum } from '../../../utils/enum/role.enum'
import Link from 'next/link'
import toasts from '../../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminReceptionistPage = () => {
    const router = useRouter();
    const auth = useSelector(state => state.auth);
    const [listReceptionists, setListReceptionists] = useState([])
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedWard, setSelectedWard] = useState('')
    const [selectedProvinceName, setSelectedProvinceName] = useState('')
    const [selectedDistrictName, setSelectedDistrictName] = useState('')
    const [selectedWardName, setSelectedWardName] = useState('')
    const [selectedGender, setSelectedGender] = useState('all')
    const [render, setRender] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedReceptionist, setSelectedReceptionist] = useState(null)
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [selectedReceptionistToDelete, setSelectedReceptionistToDelete] = useState(null);
    const [editReceptionist, setEditReceptionist] = useState({
        phone: ''
    })
    const [currentPage, setCurrentPage] = useState(1);
    const receptionistsPerPage = 5;

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
        return null;
    }

    const getAllReceptionists = async () => {
        try {
            let response = await receptionistApi.getAllReceptionists(selectedGender, selectedProvinceName, selectedDistrictName, selectedWardName)
            setListReceptionists(response.data)

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

    const handleProvinceChange = (e) => {
        setSelectedDistrict('')
        setSelectedWard('')
        setSelectedDistrictName('')
        setSelectedWardName('')
        const selectedProvinceId = e.target.value;;
        setSelectedProvince(selectedProvinceId);
        const selectedProvince = provinces.find(p => p.id === selectedProvinceId);
        setSelectedProvinceName(selectedProvince ? selectedProvince.fullName : '');
    };

    const handleDistrictChange = (e) => {
        setSelectedWard('')
        setSelectedWardName('')
        const selectedDistrictId = e.target.value;
        setSelectedDistrict(selectedDistrictId);
        const selectedDistrict = districts.find(d => d.id === selectedDistrictId);
        setSelectedDistrictName(selectedDistrict ? selectedDistrict.fullName : '');
    };

    const handleWardChange = (e) => {
        const selectedWardId = e.target.value;
        setSelectedWard(selectedWardId);
        const selectedWard = wards.find(w => w.id === selectedWardId);
        setSelectedWardName(selectedWard ? selectedWard.fullName : '');
    };

    useEffect(() => {
        getAllReceptionists()
        getListProvinces()
    }, [selectedGender, selectedProvince, selectedDistrict, selectedWard])

    useEffect(() => {
        setSelectedDistrict('')
        setSelectedWard('')
        setDistricts([])
        setWards([])
        if (selectedProvince) {
            getListDistricts(selectedProvince);
        }
    }, [selectedProvince]);

    useEffect(() => {
        setSelectedWard('')
        setWards([])
        if (selectedDistrict) {
            getListWards(selectedDistrict);
        }
    }, [selectedDistrict]);


    // const formatDate = (isoString) => {
    //     const date = new Date(isoString)
    //     return date.toLocaleDateString('vi-VN')
    // }

    const indexOfLastReceptionist = currentPage * receptionistsPerPage
    const indexOfFirstReceptionist = indexOfLastReceptionist - receptionistsPerPage
    const currentReceptionists = listReceptionists && listReceptionists.length > 0 ? listReceptionists.slice(indexOfFirstReceptionist, indexOfLastReceptionist): []
    const totalReceptionists = listReceptionists ? listReceptionists.length : 0

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalReceptionists / receptionistsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Mở popup sửa
    const openEditModal = (receptionist) => {
        setSelectedReceptionist(receptionist);
        setEditReceptionist({ phone: receptionist.phone });
        setIsEditModalOpen(true);
    };

    // Đóng popup sửa
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedReceptionist(null);
        setEditReceptionist({ phone: '' });
    }

    const openConfirmDelete = (receptionist) => {
        setSelectedReceptionistToDelete(receptionist);
        setIsConfirmDeleteOpen(true);
    }
    
    const closeConfirmDelete = () => {
        setSelectedReceptionistToDelete(null);
        setIsConfirmDeleteOpen(false);
    }

    const handleEditReceptionist = async (e) => {
        e.preventDefault();
        try {
            const response = await receptionistApi.editReceptionist(selectedReceptionist.id, { phone: editReceptionist.phone });
            if (response.errCode === 0) {
                toasts.successTopRight(response.message);
                getAllReceptionists();
                closeEditModal();
            } else {
                toasts.errorTopRight(response.message);
                getAllReceptionists();
                closeEditModal();
            }
           
        } catch (error) {
            console.error('Error updating receptionist:', error);
            toasts.errorTopRight('Cập nhật tiếp tân thất bại');
        }
    }

    const handleDelete = async () => {
        try {
            let response = await receptionistApi.deleteReceptionist(selectedReceptionistToDelete.id);
            toasts.successTopRight(response.message)
            getAllReceptionists()
            closeConfirmDelete()
        } catch (error) {
            console.error('Error deleting receptionist:', error);
            closeConfirmDelete()
        }
    }
    
    return (
        render &&
        <main className='w-screen flex 2xl:mx-auto 2xl:border-x-2 2xl:border-indigo-50 '>
            <AdminSideBar />
            <section className='bg-indigo-50/60 w-full py-10 px-3 sm:px-10'>
                <nav className='text-lg flex items-center justify-between content-center '>
                    <div className=' font-semibold text-xl text-gray-800 flex space-x-4 items-center'>
                        <span className='px-3'>Quản lý tiếp tân</span>
                    </div>

                    <div className='flex space-x-5 md:space-x-10 text-gray-500 items-center content-center text-base '>
                        <Link
                            className='px-4 py-2 bg-indigo-100 rounded-md flex items-center space-x-2 text-indigo-500 hover:bg-indigo-200'
                            href='/admin/receptionist/create'
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
                            <span>Thêm mới</span>
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
                                        onChange={(e) => setSelectedGender(e.target.value)}
                                    >
                                        <option value='all'>Tất cả</option>
                                        <option value='male'>Nam</option>
                                        <option value='female'>Nữ</option>
                                        <option value='others'>Khác</option>
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
                                        onChange={(e) => handleProvinceChange(e)}
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
                                        onChange={(e) => handleDistrictChange(e)}
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
                                        onChange={(e) => handleWardChange(e)}
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
                        <div className='text-center'>Tiếp tân</div>
                        <div className='text-center'>Email</div>
                        {/* <div className='text-center'>Ngày sinh</div> */}
                        <div className='text-center '>Số điện thoại</div>
                        <div className='text-center'>Địa chỉ</div>
                        <div className='text-center'>Giới tính</div>
                        <div className='text-center'>Hành động</div>
                    </div>

                    <div className='bg-white mt-5 rounded-xl text-sm  text-gray-500 divide-y divide-indigo-50 overflow-x-auto text-center shadow'>
                        {currentReceptionists?.map((receptionist, index) => (
                            <Link 
                                // href={`/admin/receptionist/${receptionist?.id}`}
                                href={'#'}
                                key={index}
                                className='invoice-table-row flex items-center gap-x-3 px-2 py-4'
                            >
                                <div className='text-center '>{receptionist?.fullName}</div>
                                <div className='text-center'>{receptionist?.email}</div>
                                {/* <div className='text-center'>
                                    {formatDate(receptionist?.birthday)}
                                </div> */}
                                <div className='text-center'>{receptionist?.phone}</div>
                                <div className='text-center'>{receptionist?.address}</div>
                                <div key={index} className='text-center'>{receptionist?.gender === 'Male' ? 'Nam' : 'Nữ' }</div>
                                <div className='text-center'>
                                    <button onClick={() => openEditModal(receptionist)} className='cursor-pointer'>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button onClick={() => openConfirmDelete(receptionist)} className='ml-4 cursor-pointer'>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <ul className="flex items-center mx-auto justify-center absolute -bottom-52 left-40 right-0">
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
                            {currentPage < Math.ceil(totalReceptionists / receptionistsPerPage) && (
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

            {/* Modal sửa */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Chỉnh sửa tiếp tân</h2>
                        {selectedReceptionist && (
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Tên</label>
                                    <input type="text" defaultValue={selectedReceptionist.fullName} className="w-full px-3 py-2 border border-gray-300 rounded-md" disabled/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                    <input type="text" defaultValue={selectedReceptionist.email} className="w-full px-3 py-2 border border-gray-300 rounded-md" disabled/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Số điện thoại</label>
                                    <input type="text" defaultValue={selectedReceptionist.phone} className="w-full px-3 py-2 border border-gray-300 rounded-md" onChange={(e) => setEditReceptionist({ phone: e.target.value })}/>
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={closeEditModal}>Hủy</button>
                                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={(e) => handleEditReceptionist(e)}>Lưu</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {isConfirmDeleteOpen && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div className='bg-black opacity-50 absolute inset-0'></div>
                    <div className='bg-white rounded-lg p-8 relative z-10'>
                        <h2 className='text-lg font-semibold mb-4'>Xác nhận xóa</h2>
                        <p className='mb-6'>Bạn có chắc chắn muốn xóa tiếp tân này không?</p>
                        <div className='flex justify-end'>
                            <button
                                className='bg-gray-500 text-white px-4 py-2 rounded-md mr-2'
                                onClick={closeConfirmDelete}
                            >
                                Hủy
                            </button>
                            <button
                                className='bg-red-500 text-white px-4 py-2 rounded-md'
                                onClick={handleDelete}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </main>
    )
}

export default AdminReceptionistPage
