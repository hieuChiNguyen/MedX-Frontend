'use client'
import doctorApi from '@/app/api/doctor/DoctorApi'
import { useState, useEffect } from 'react'
import toasts from '@/app/components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

const DoctorCooperateForm = () => {
    const router = useRouter()
    const [input, setInput] = useState({
        email: '',
        fullName: '',
        phoneNumber: '',
        citizenNumber: '',
        specialtyVi: ''
    })

    const [errorMessage, setErrorMessage] = useState('')
    const [specialties, setSpecialties] = useState([])

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log('check input: ', input)
    }

    useEffect(() => {
        console.log('check doctor input: ', input)
    }, [input])

    useEffect(() => {
        doctorApi.getAllSpecialties(1, 200).then((res) => {
            setSpecialties([...res.data])
        })
    }, [])

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await handleContactCooperate()
        }
    }

    const handleContactCooperate = async () => {
        setErrorMessage('')

        const isValid = Object.values(input).every((value) => value !== '')

        if (!isValid) {
            toasts.errorTopRight('Vui lòng điền đầy đủ thông tin.')
        }
        try {
            let response = await doctorApi.createNewDoctor(input)
            console.log('check data register doctor', response)

            // Fail to create new doctor
            if (response.data && response.message !== 'OK') {
                setErrorMessage(data.message)
                toasts.errorTopCenter('Đăng ký thất bại. Vui lòng thử lại!')
            }

            // Success to create new doctor
            if (response.data && response.message === 'OK') {
                toasts.successTopCenter('Đăng ký hợp tác thành công!')
                setTimeout(function () {
                    router.push('/doctor')
                }, 1500)
            }
            // const registerDoctor = {
            //     loggedIn: true,
            //     id: data.user.id,
            //     email: data.user.email,
            //     username: data.user.username,
            //     role: data.user.role
            // }

            // if (signInUser.role === 'Admin') {
            //     sessionStorage.setItem('isAdmin', true)
            //     setTimeout(function () {
            //         router.push('/admin')
            //     }, 1500)
            // } else {
            //     setTimeout(function () {
            //         router.push('/')
            //     }, 1500)
            // }
            // }
        } catch (error) {
            console.log(error)
            // if (error.response) {
            //     if (error.response.data) {
            //         setErrorMessage(error.response.data.message)
            //     }
            // }
        }
    }

    return (
        <>
            <form className='max-w-sm mx-auto'>
                <div className='mb-5'>
                    <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={input.email}
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                        placeholder='name@email.com'
                        required
                        onChange={handleInput}
                    />
                </div>
                <div className='mb-5'>
                    <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        Họ và tên
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='fullName'
                        value={input.fullName}
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                        placeholder='Nguyễn Văn A'
                        required
                        onChange={handleInput}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                </div>
                <div className='mb-5'>
                    <label htmlFor='phone' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        Số điện thoại
                    </label>
                    <input
                        type='text'
                        id='phone'
                        name='phoneNumber'
                        value={input.phone}
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                        placeholder='0969 871 ***'
                        required
                        onChange={handleInput}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                </div>
                <div className='mb-5'>
                    <label htmlFor='citizen' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        Căn cước công dân / Chứng minh thư
                    </label>
                    <input
                        type='text'
                        id='citizen'
                        name='citizenNumber'
                        value={input.citizenNumber}
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                        placeholder=''
                        required
                        onChange={handleInput}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='specialtyVi'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Chuyên khoa
                    </label>
                    <select
                        id='specialtyVi'
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                        onChange={(e) => handleInput(e)}
                        onKeyDown={(e) => handleKeyDown(e)}
                        required
                        name='specialtyVi'
                    >
                        <option selected disabled hidden></option>
                        {specialties?.map((specialty) => (
                            <option key={specialty} value={specialty}>
                                {specialty}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='nameClinic'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Nơi làm việc
                    </label>
                    <input
                        type='text'
                        id='nameClinic'
                        name='nameClinic'
                        // value={input.nameClinic}
                        className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                        placeholder='Bệnh viện Đa khoa Chợ Rẫy'
                        // required
                        // onChange={handleInput}
                        // onKeyDown={(e) => handleKeyDown(e)}
                    />
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
                <button
                    type='button'
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    onClick={handleContactCooperate}
                >
                    Đăng ký hợp tác
                </button>
            </form>
            <ToastContainer />
        </>
    )
}

export default DoctorCooperateForm
