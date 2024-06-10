'use client'
import '../dashboard.css'
import { useEffect, useState } from 'react'
import AdminSideBar from '../../components/common/admin/AdminSideBar'
import doctorApi from '../../api/doctor/DoctorApi'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RoleEnum } from '../../../utils/enum/role.enum'

const AdminSpecialtyPage = () => {
    const router = useRouter();
    const auth = useSelector(state => state.auth);
    const [listSpecialties, setListSpecialties] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [newSpecialty, setNewSpecialty] = useState({
        nameVi: '',
        nameEn: '',
        image: '',
        description: ''
    });
    const specialtiesPerPage = 10;

    if (auth.role !== RoleEnum.ADMIN && auth.role !== RoleEnum.RECEPTIONIST) {
        router.push('/login');
        return null;
    }

    const getListSpecialties = async () => {
        try {
          const response = await doctorApi.getAllSpecialties();
          setListSpecialties(response.data); 
        } catch (error) {
          console.error('Error fetching specialties:', error);
        }
    };

    useEffect(() => {
        getListSpecialties()
    }, [])

    const indexOfLastSpecialty = currentPage * specialtiesPerPage;
    const indexOfFirstSpecialty = indexOfLastSpecialty - specialtiesPerPage;
    const currentSpecialties = listSpecialties.slice(indexOfFirstSpecialty, indexOfLastSpecialty);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listSpecialties.length / specialtiesPerPage); i++) {
        pageNumbers.push(i);
    }
    
    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const closeModal = () => {
        setShowModal(false);
        setNewSpecialty({
            nameVi: '',
            nameEn: '',
            image: '',
            description: ''
        });
    };

    const handleAddSpecialty = async () => {
        try {
            // Thực hiện logic thêm chuyên khoa mới ở đây
            console.log('New Specialty:', newSpecialty);
            closeModal();
        } catch (error) {
            console.error('Error adding specialty:', error);
        }
    };

    return (
        <main className='w-screen flex 2xl:mx-auto 2xl:border-x-2 2xl:border-indigo-50 '>
            <AdminSideBar />
            <section className='bg-indigo-50/60 w-full py-10 px-3 sm:px-10'>
                <nav className='text-lg flex items-center justify-between content-center '>
                    <div className=' font-semibold text-xl text-gray-800 flex space-x-4 items-center'>
                        <span className='px-3'>Quản lý chuyên khoa</span>
                    </div>

                    <div className='flex space-x-5 md:space-x-10 text-gray-500 items-center content-center text-base '>
                        <div
                            className='px-4 py-2 cursor-pointer bg-indigo-100 rounded-md flex items-center space-x-2 text-indigo-500 hover:bg-indigo-200'
                            onClick={() => setShowModal(true)}
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
                        </div>
                    </div>
                </nav>

                <div>
                    <div className='invoice-table-row invoice-table-header bg-white mt-10 rounded-xl px-10 py-4 flex items-center gap-x-3 text-sm font-semibold text-gray-600'>
                        <div className='text-center'>STT</div>
                        <div className='text-center'>Chuyên khoa</div>
                        <div className='text-center'>Tên Tiếng Anh</div>
                        <div className='text-center '>Ảnh chuyên khoa</div>
                        <div className='text-center '>Mô tả</div>
                    </div>
                    
                    <div className='bg-white mt-5 rounded-xl text-sm  text-gray-500 divide-y divide-indigo-50 overflow-x-auto text-center shadow cursor-pointer'>
                        {currentSpecialties?.map((specialty, index) => (
                            <div 
                                key={index}
                                className='invoice-table-row flex items-center gap-x-3 px-2 py-4'
                            >
                                <div className='text-center '>{index + 1}</div>
                                <div className='text-center'>{specialty?.nameVi}</div>     
                                <div className='text-center'>{specialty?.nameEn}</div>
                                <div className='text-center'>{specialty?.image}</div>
                                <div className='text-center'>{specialty?.description}</div>
                            </div>
                        ))}
                    </div>

                    <ul className="flex items-center mx-auto justify-center absolute -bottom-20 left-40 right-0">
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
                            {currentPage < Math.ceil(listSpecialties.length / specialtiesPerPage) && (
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
                {/* Modal */}
                {showModal && (
                <div className='fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75'>
                    <div className='bg-white p-6 rounded-lg'>
                        <h2 className='text-xl font-semibold mb-4'>Thêm mới chuyên khoa</h2>
                        <div className="grid grid-cols-2 gap-4 w-96">
                            <input 
                                type="text" 
                                placeholder="Tên chuyên khoa (Tiếng Việt)" 
                                value={newSpecialty.nameVi} 
                                onChange={(e) => setNewSpecialty({ ...newSpecialty, nameVi: e.target.value })} 
                                className="border p-2 rounded-md col-span-2" 
                            />
                            <input 
                                type="text" 
                                placeholder="Tên chuyên khoa (Tiếng Anh)" 
                                value={newSpecialty.nameEn} 
                                onChange={(e) => setNewSpecialty({ ...newSpecialty, nameEn: e.target.value })} 
                                className="border p-2 rounded-md col-span-2" 
                            />
                            <input 
                                type="text" 
                                placeholder="Đường dẫn ảnh" 
                                value={newSpecialty.image} 
                                onChange={(e) => setNewSpecialty({ ...newSpecialty, image: e.target.value })} 
                                className="border p-2 rounded-md col-span-2" 
                            />
                            <textarea 
                                placeholder="Mô tả" 
                                value={newSpecialty.description} 
                                onChange={(e) => setNewSpecialty({ ...newSpecialty, description: e.target.value })} 
                                className="border p-2 rounded-md col-span-2 h-20 resize-none" 
                            />
                        </div>
                        <div className='flex justify-end mt-4'>
                            <button 
                                onClick={handleAddSpecialty}
                                className='bg-indigo-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-indigo-600 transition duration-300'
                            >
                                Thêm
                            </button>
                            <button 
                                onClick={closeModal}
                                className='bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300'
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default AdminSpecialtyPage
