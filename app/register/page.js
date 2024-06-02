'use client'
import { useState, useEffect } from 'react'
import toasts from '../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import authApi from '../api/auth/AuthApi'
import patientApi from '../api/patient/PatientApi'
import { RoleEnum } from '../../utils/enum/role.enum'

const RegisterPage = () => {
    const router = useRouter()
    const [birthday, setBirthday] = useState(null)
    const [input, setInput] = useState({
        email: '',
        fullName: '',
        username: '',
        password: '',
        gender: '',
        birthday:'',
        role:'',
        phone: '',
        address: ''
    })

    const genders = [
        { valueEn: 'Male', valueVi: 'Nam' },
        { valueEn: 'Female', valueVi: 'Nữ' },
        { valueEn: 'Others', valueVi: 'Khác' }
    ];

    const roles = [
        { valueEn: 'Doctor', valueVi: 'Bác sĩ'},
        { valueEn: 'Patient', valueVi: 'Bệnh nhân'}
    ]

    const [errorMessage, setErrorMessage] = useState('')
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedGender, setSelectedGender] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    const [selectedWard, setSelectedWard] = useState('')

    const handleInput = (fieldName, value) => {
        setInput({
            ...input,
            [fieldName]: value
        });
    };

    const handleCombineAddress = () => {
        const province = provinces.find(item => item.id === selectedProvince);
        const district = districts.find(item => item.id === selectedDistrict);
        const ward = wards.find(item => item.id === selectedWard);

        const address = `${ward.fullName}, ${district.fullName}, ${province.fullName}`;

        handleInput('address', address);
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
        getListProvinces();
    }, []);

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

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            handleRegister()
        }
    }

    useEffect(() => {
        if(selectedProvince && selectedDistrict && selectedWard) {
            handleCombineAddress(); 
        }
    }, [selectedProvince, selectedDistrict, selectedWard])

    const handleRegister = async () => {
        setErrorMessage('')
        const isValid = Object.values(input).every((value) => value !== '')

        if (!isValid) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin.')
        } else {
            try {
                let response = await authApi.register(input)

                // Success to create new user
                if (response.data && response.errCode === 0) {
                    toasts.successTopRight('Đăng ký thông tin thành công.')
                    const user_role = response.data.role
                    if(user_role === RoleEnum.PATIENT) {
                        setTimeout(function () {
                            router.push('/login')
                        }, 1500)
                    } else if(user_role === RoleEnum.DOCTOR) {
                        setTimeout(function () {
                            router.push('/doctor')
                        }, 1500)
                    }
                }

                if (response?.errCode !== 0) {
                    setErrorMessage(response.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <section className='bg-gray-100'>
            <div className='mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5'>
                    <div className='lg:col-span-2 lg:py-12'>
                        <Link href='/' className='flex flex-row cursor-pointer w-fit'>
                            <p className='uppercase font-semibold text-4xl'>Med</p>
                            <p className='uppercase font-semibold text-4xl text-blue-500'>X</p>
                        </Link>
                        <p className='max-w-xl text-16 mt-3'>
                            Đến với MedX bạn sẽ nhận được sự tư vấn và chăm sóc tận tình của các bác sĩ hàng đầu với
                            trình độ và chuyên môn cao
                        </p>

                        <div className='mt-10'>
                            <p className='text-16'>
                                Liên hệ qua số điện thoại <span className='text-lg font-bold text-blue-600'>0969 871 766</span> <br/>
                                để nhận tư vấn hỗ trợ từ chúng tôi
                            </p>

                            <address className='mt-10 not-italic'>Địa chỉ Số 1 Giải Phóng</address>
                        </div>
                    </div>

                    <div className='rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-10'>
                        <form className='flex flex-col gap-5'>
                            <h1 className='text-blue-600 text-2xl font-semibold'>Đăng ký tài khoản</h1>
                            <div>
                                <label className='sr-only' htmlFor='email'>
                                    Email
                                </label>
                                <input
                                    className='w-full rounded-lg border-gray-200 p-3 text-sm border-1'
                                    placeholder='Email'
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={input.email}
                                    onChange={(e) => handleInput('email', e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>

                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <label className='sr-only' htmlFor='fullName'>
                                        Họ và tên
                                    </label>
                                    <input
                                        className='w-full rounded-lg border-gray-200 p-3 text-sm border-1'
                                        placeholder='Họ và tên'
                                        type='text'
                                        id='fullName'
                                        name='fullName'
                                        value={input.fullName}
                                        onChange={(e) => handleInput('fullName', e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>

                                <div>
                                    <label className='sr-only' htmlFor='phone'>
                                        Số điện thoại
                                    </label>
                                    <input
                                        className='w-full rounded-lg border-gray-200 p-3 text-sm border-1'
                                        placeholder='Số điện thoại'
                                        type='tel'
                                        id='phone'
                                        name='phone'
                                        value={input.phone}
                                        onChange={(e) => handleInput('phone', e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <label className='sr-only' htmlFor='username'>
                                        Tên đăng nhập
                                    </label>
                                    <input
                                        className='w-full rounded-lg border-gray-200 p-3 text-sm border-1'
                                        placeholder='Tên đăng nhập'
                                        type='text'
                                        id='username'
                                        name='username'
                                        value={input.username}
                                        onChange={(e) => handleInput('username', e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>

                                <div>
                                    <label className='sr-only' htmlFor='password'>
                                        Mật khẩu
                                    </label>
                                    <input
                                        className='w-full rounded-lg border-gray-200 p-3 text-sm border-1'
                                        placeholder='Mật khẩu'
                                        type='password'
                                        id='password'
                                        name='password'
                                        value={input.password}
                                        onChange={(e) => handleInput('password', e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                                <div>
                                    <label className='sr-only' htmlFor='gender'>
                                        Giới tính
                                    </label>
                                    <select
                                        className={`w-full rounded-lg border-gray-200 p-3 text-sm border-1 ${selectedGender ? 'text-black' : 'text-gray-400'}`}
                                        onChange={(e) => {
                                            handleInput('gender', e.target.value)
                                            setSelectedGender(e.target.value)
                                        }}
                                    >
                                        <option value='gender' selected disabled hidden>
                                            Giới tính
                                        </option>
                                        {genders?.map((gender) => (
                                            <option key={gender.valueEn} value={gender.valueEn} id='gender'>
                                                {gender.valueVi}
                                            </option>
                                        ))}
                                    </select>                                   
                                </div>

                                <div>
                                    <label className='sr-only' htmlFor='birthday'>
                                        Ngày sinh
                                    </label>
                                    <DatePicker
                                        placeholderText='Ngày sinh (dd-MM-yyyy)'
                                        selected={birthday}
                                        onChange={(date) => {
                                            setBirthday(date)
                                            handleInput('birthday', format(date, 'yyyy-MM-dd'))
                                        }}
                                        dateFormat="dd-MM-yyyy"
                                        showPopperArrow={true}
                                        className='w-full rounded-lg border-gray-200 p-3 text-sm border-2'
                                    />
                                </div>

                                <div>
                                    <label className='sr-only' htmlFor='role'>
                                        Vai trò
                                    </label>
                                    <select
                                        className={`w-full rounded-lg border-gray-200 p-3 text-sm border-1 ${selectedRole ? 'text-black' : 'text-gray-400'}`}
                                        onChange={(e) => {
                                            handleInput('role', e.target.value)
                                            setSelectedRole(e.target.value)
                                        }}
                                    >
                                        <option value='role' selected disabled hidden>
                                            Bác sĩ hay bệnh nhân?
                                        </option>
                                        {roles?.map((role) => (
                                            <option key={role.valueEn} value={role.valueEn} id='role'>
                                                {role.valueVi}
                                            </option>
                                        ))}
                                    </select>     
                                </div>
                            </div>

                            <div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3'>
                                <select
                                    className={`w-full rounded-lg border-gray-200 p-3 text-sm border-1 ${selectedProvince ? 'text-black' : 'text-gray-400'}`}
                                    onChange={(e) => {
                                        setSelectedProvince(e.target.value)
                                    }}
                                >
                                    <option value='province' selected disabled hidden>
                                        Tỉnh / Thành phố
                                    </option>
                                    {provinces?.map((province) => (
                                        <option key={province.id} value={province.id}>
                                            {province.fullName}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className={`w-full rounded-lg border-gray-200 p-3 text-sm border-1 ${selectedDistrict ? 'text-black' : 'text-gray-400'}`}
                                    onChange={(e) => {
                                        setSelectedDistrict(e.target.value)
                                    }}
                                >
                                    <option defaultValue='' selected disabled hidden>
                                        Quận / Huyện
                                    </option>
                                    {districts?.map((district) => (
                                        <option key={district.id} value={district.id}>
                                            {district.fullName}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className={`w-full rounded-lg border-gray-200 p-3 text-sm border-1 ${selectedWard ? 'text-black' : 'text-gray-400'}`}
                                    onChange={(e) => {
                                        setSelectedWard(e.target.value)
                                    }}
                                >
                                    <option defaultValue='' selected disabled hidden>
                                        Xã / Phường
                                    </option>
                                    {wards?.map((ward) => (
                                        <option key={ward.id} value={ward.id}>
                                            {ward.fullName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='grid-cols-1 gap-4 sm:grid-cols-1 hidden'>
                                <div>
                                    <label className='sr-only' htmlFor='address'>
                                        Địa chỉ
                                    </label>
                                    <input
                                        className='w-full rounded-lg border-gray-200 p-3 text-sm border-1'
                                        placeholder='Chỉ dẫn địa chỉ'
                                        type='text'
                                        id='address'
                                        name='address'
                                        value={input.address}
                                        onChange={(e) => handleInput('address', e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <p className='text-sm font-light text-gray-500 dark:text-gray-400 mt-4 p-1'>
                                Bạn đã có tài khoản?{' '}
                                <a
                                    href='/login'
                                    className='font-semibold text-primary-600 hover:underline dark:text-primary-600'
                                >
                                    Đăng nhập
                                </a>
                            </p>

                            {/* Error Notification */}
                            <div className='w-full text-red-600 text-center text-sm'>{errorMessage}</div>

                            <div>
                                <button
                                    type='button'
                                    className='inline-block w-full rounded-lg bg-blue-500 px-5 py-3 font-medium text-white sm:w-auto'
                                    onClick={handleRegister}
                                >
                                    Gửi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default RegisterPage
