'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import authApi from '../api/auth/AuthApi'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/reducers/authSlice'
import toasts from '../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RoleEnum } from '../../utils/enum/role.enum'

const LogInPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
   
    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            requireLogin()
        }
    }

    const requireLogin = async () => {
        setErrorMessage('')

        try {
            let loginResponse = await authApi.login(input.email, input.password)

            // Fail to  login
            if (loginResponse?.errCode !== 0) {
                setErrorMessage(loginResponse.message)
            }

            // Success to login
            if (loginResponse && loginResponse.errCode === 0) {
                // Save access token into local storage
                localStorage.setItem('accessToken', loginResponse.data.accessToken)

                toasts.successTopCenter('Đăng nhập thành công !')

                const user = {
                    loggedIn: true,
                    id: loginResponse.data.id,
                    email: loginResponse.data.email,
                    username: loginResponse.data.username,
                    role: loginResponse.data.role,
                    doctorId: loginResponse.data?.doctorId ?? '',
                    doctorStatus: loginResponse.data?.doctorStatus ?? '',
                    doctorPosition: loginResponse.data?.doctorPosition ?? ''
                }

                dispatch(login(user))

                if (user.role === RoleEnum.ADMIN) {
                    setTimeout(function () {
                        router.push('/admin/dashboard')
                    }, 2000)
                } else if(user.role === RoleEnum.DOCTOR) {
                    setTimeout(function () {
                        router.push('/doctor')
                    }, 2000)
                } else if(user.role === RoleEnum.RECEPTIONIST) {
                    setTimeout(function () {
                        router.push('/admin/dashboard')
                    }, 2000)
                } else {
                    setTimeout(function() {
                        router.push('/')
                    }, 2000)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <main>
            <section className='bg-gray-50 dark:bg-gray-900'>
                <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                    <a href='/' className='text-3xl text-gray-900 flex items-center mb-6 font-semibold dark:text-white'>
                        Med<span className='text-blue-500'>X</span>
                    </a>
                    <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                                Đăng nhập tài khoản
                            </h1>
                            <form className='space-y-4 md:space-y-6' action='#'>
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        name='email'
                                        id='email'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                        placeholder='name@company.com'
                                        required=''
                                        onChange={(e) => handleChange(e)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor='password'
                                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Mật khẩu
                                    </label>
                                    <input
                                        type='password'
                                        name='password'
                                        id='password'
                                        placeholder='••••••••'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                        required=''
                                        onChange={(e) => handleChange(e)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-start'>
                                        <div className='flex items-center h-5'>
                                            <input
                                                id='remember'
                                                aria-describedby='remember'
                                                type='checkbox'
                                                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                                                required=''
                                            />
                                        </div>
                                        <div className='ml-3 text-sm'>
                                            <label htmlFor='remember' className='text-gray-500 dark:text-gray-300'>
                                                Ghi nhớ mật khẩu
                                            </label>
                                        </div>
                                    </div>
                                    <a
                                        href='#'
                                        className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                                    >
                                        Quên mật khẩu?
                                    </a>
                                </div>

                                {/* Error Notification */}
                                <div className='w-full text-red-600 text-center text-sm'>{errorMessage}</div>

                                <button
                                    type='button'
                                    className='w-full text-16 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                                    onClick={requireLogin}
                                >
                                    Đăng nhập
                                </button>
                                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                                    Bạn chưa có tài khoản?{' '}
                                    <a
                                        href='/register'
                                        className='font-semibold text-primary-600 hover:underline dark:text-primary-500'
                                    >
                                        Đăng ký tài khoản
                                    </a>
                                </p>
                                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                                    <a
                                        href='/'
                                        className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                                    >
                                        Về trang chủ
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </main>  
    )
}

export default LogInPage
