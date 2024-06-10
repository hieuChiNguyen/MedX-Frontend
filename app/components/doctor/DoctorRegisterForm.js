'use client'
import doctorApi from '../../api/doctor/DoctorApi'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import toasts from '../../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const DoctorRegisterForm = () => {
    const router = useRouter()
    const auth = useSelector(state => state.auth);
    const [input, setInput] = useState({
        citizenCard: '',
        position: '',
        specialtyId: '',
    })

    const [errorMessage, setErrorMessage] = useState('')
    const [specialties, setSpecialties] = useState([])
    const [positions, setPositions] = useState([])
    const [selectedSpecialty, setSelectedSpecialty] = useState('')
    const [selectedPosition, setSelectedPosition] = useState('')

    const handleInput = (fieldName, value) => {
        setInput({
            ...input,
            [fieldName]: value
        });
    };

    const getListSpecialties = async () => {
        try {
          const response = await doctorApi.getAllSpecialties();
          setSpecialties(response.data); 
        } catch (error) {
          console.error('Error fetching specialties:', error);
        }
    };

    const getListPositions = async () => {
        try {
          const response = await doctorApi.getAllPositions();
          setPositions(response.data); 
        } catch (error) {
          console.error('Error fetching positions:', error);
        }
    };

    useEffect(() => {
        getListSpecialties();
        getListPositions();
    }, []);

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await handleRegisterDoctor()
        }
    }

    const handleRegisterDoctor = async () => {
        setErrorMessage('')

        const isValid = Object.values(input).every((value) => value !== '')

        if (!isValid) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin.')
        }
        try {
            let response = await doctorApi.createNewDoctor(auth.id, input)

            // Fail to create new doctor
            if (response.data && response.message !== 'OK') {
                setErrorMessage(data.message)
            }

            // Success to create new doctor
            if (response.data && response.message === 'OK') {
                toasts.successTopCenter('Đăng ký thành công.')
                setTimeout(function () {
                    router.push('/doctor')
                }, 1500)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='bg-gray-100'>
            <div className='mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5'>
                    <div className='lg:col-span-2 lg:py-12'>
                        <Link href='/doctor' className='flex flex-row cursor-pointer w-fit'>
                            <p className='uppercase font-semibold text-4xl'>Med</p>
                            <p className='uppercase font-semibold text-4xl text-blue-500'>X</p>
                        </Link>
                        <p className='max-w-xl text-16 mt-3'>
                            Bạn đã đăng ký tài khoản trên MedX với vai trò là bác sĩ.<br/> 
                            Hãy điền đầy đủ thông tin theo yêu cầu.
                        </p>

                        <div className='mt-10'>
                            <p className='text-16'>
                                Liên hệ qua số điện thoại <span className='text-lg font-bold text-blue-600'>0969 871 766</span> <br/>
                                để nhận tư vấn hỗ trợ từ chúng tôi
                            </p>

                            <address className='mt-10 not-italic'>Địa chỉ Số 1 Giải Phóng</address>
                        </div>    
                        <Link href={'/doctor'} className="mt-4 inline-block text-blue-500 hover:underline">Quay lại trang chủ</Link>
                    </div>
        
                    <div className='rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-10'>
                        <form className='max-w-sm mx-auto'>
                            <div className='mb-5'>
                                <label htmlFor='citizenCard' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Căn cước công dân
                                </label>
                                <input
                                    type='text'
                                    id='citizenCard'
                                    name='citizenCard'
                                    value={input.citizenCard}
                                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                                    required
                                    onChange={(e) => {
                                        handleInput('citizenCard', e.target.value)
                                    }}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className='mb-5'>
                                <label htmlFor='position' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Chọn chức danh
                                </label>
                                <select
                                    className={`w-full rounded-lg border-gray-200 p-3 text-sm border-1 ${selectedPosition ? 'text-black' : 'text-gray-500'}`}
                                    onChange={(e) => {
                                        handleInput('position', e.target.value)
                                        setSelectedPosition(e.target.value)
                                    }}
                                >
                                    <option defaultValue='' selected disabled hidden>
                                        Chọn chức danh
                                    </option>
                                    {positions?.map((position) => (
                                        <option key={position.id} value={position.position}>
                                            {position.position}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='mb-5'>
                                <label htmlFor='phone' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Chuyên khoa 
                                </label>
                                <select
                                    className={`w-full rounded-lg border-gray-200 p-3 text-sm border-1 ${selectedSpecialty ? 'text-black' : 'text-gray-500'}`}
                                    onChange={(e) => {
                                        handleInput('specialtyId', e.target.value)
                                        setSelectedSpecialty(e.target.value)
                                    }}
                                >
                                    <option defaultValue='' selected disabled hidden>
                                        Chọn chuyên khoa
                                    </option>
                                    {specialties?.map((specialty) => (
                                        <option key={specialty.id} value={specialty.id}>
                                            {specialty.nameVi}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex items-start mb-5'>
                                <div className='flex items-center h-5'>
                                    <input
                                        id='terms'
                                        type='checkbox'
                                        checked
                                        onChange={() => {}}
                                        className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 cursor-pointer'
                                    />
                                </div>
                                <label htmlFor='terms' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                                    I agree with the{' '}
                                    <a href='' className='text-blue-600 hover:underline dark:text-blue-500'>
                                        terms and conditions
                                    </a>
                                </label>
                            </div>

                            {/* Error Notification */}
                            <div className='w-full text-red-600 text-center text-sm'>{errorMessage}</div>

                            <button
                                type='button'
                                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mt-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                                onClick={handleRegisterDoctor}
                            >
                                Gửi
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default DoctorRegisterForm
