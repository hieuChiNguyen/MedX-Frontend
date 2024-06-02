'use client'
import { useState, useEffect } from 'react'
import toasts from '../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import doctorApi from '../api/doctor/DoctorApi'
import appointmentApi from '../api/appointment/AppointmentApi'
import patientApi from '../api/patient/PatientApi'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { ExpectedTimeSlotEnum } from '../../utils/enum/expected_time_slot.enum'

const PatientInfoPage = () => {
    const router = useRouter()
    const auth = useSelector(state => state.auth); 
    const patientId = auth.id
    const [input, setInput] = useState({
        examReason: '',
        expectedTime: '',
        appointmentDate: '',
        specialtyId: '',
        patientId: auth.id,
        healthInsurance: '',
        expectedPosition: ''
    })

    const [errorMessage, setErrorMessage] = useState('')
    const [specialties, setSpecialties] = useState([])
    const [selectedSpecialty, setSelectedSpecialty] = useState('')
    const [patient, setPatient] = useState()
    const [appointmentDate, setAppointmentDate] = useState(null)
    const [selectedPosition, setSelectedPosition] = useState('')
    const [positions, setPositions] = useState([])
    const timeSlots = Object.values(ExpectedTimeSlotEnum);

    const handleInput = (fieldName, value) => {
        setInput({
            ...input,
            [fieldName]: value
        });
    };

    const checkLogin = () => {
        if (!auth.id) {
            setErrorMessage('Vui lòng đăng nhập trước khi đặt lịch khám.')
        }
    }

    const getPatientInformation = async () => {
        try {
          const response = await patientApi.getPatientInformation(patientId);
          setPatient(response.data);
        } catch (error) {
          console.error('Error fetching patient:', error);
        }
    };

    const getListSpecialties = async () => {
        try {
            let response = await doctorApi.getAllSpecialties()
            setSpecialties(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getListPositions = async () => {
        try {
          const response = await doctorApi.getAllPositions();
          setPositions(response.data); 
        } catch (error) {
          console.error('Error fetching positions:', error);
        }
    };


    useEffect(() => {
        if(auth.loggedIn) {
            getPatientInformation()
        }
    }, [])

    useEffect(() => {
        getListPositions()
        getListSpecialties()
    }, [])

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await bookAppointment()
        }
    }

    console.log('check input::', input);

    const bookAppointment = async () => {
        setErrorMessage('')
        const isValid = Object.values(input).every((value) => value !== '')

        if (!isValid) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin.')
        } else {
            try {
                let response = await appointmentApi.createNewAppointment(input)

                // Fail to create new patient
                if (response.data && response.errCode !== 0) {
                    setErrorMessage(response.message)
                    toasts.errorTopRight('Đặt lịch khám thất bại.')
                }

                // Success to create new patient
                if (response.data && response.errCode === 0) {
                    toasts.successTopRight('Đặt lịch khám thành công.')
                    setTimeout(function () {
                        router.push('/')
                    }, 1500)
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
                        <Link href='/' className='flex flex-row cursor-pointer'>
                            <p className='uppercase font-semibold text-4xl'>Med</p>
                            <p className='uppercase font-semibold text-4xl text-blue-500'>X</p>
                        </Link>
                        <p className='max-w-xl text-16'>
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
                            <h1 className='text-blue-600 text-2xl'>Thông tin bệnh nhân đặt khám</h1>
                            {
                                !auth?.id &&
                                (
                                    <h3 className='font-light italic text-red-500'>
                                        * Lưu ý: Đăng nhập trước khi đặt khám &nbsp; 
                                        <Link href={'/login'} className='text-blue-600 underline font-bold cursor-pointer'>
                                            Đăng nhập
                                        </Link>
                                    </h3>
                                )
                            }
                            
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
                                    value={patient?.email ?? ''}
                                    onClick={checkLogin}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>

                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <label className='sr-only' htmlFor='name'>
                                        Họ và tên
                                    </label>
                                    <input
                                        className='w-full rounded-lg border-gray-200 p-3 text-sm border-1'
                                        placeholder='Họ và tên'
                                        type='text'
                                        id='name'
                                        name='fullName'
                                        value={patient?.fullName ?? ''}
                                        onClick={checkLogin}
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
                                        name='phoneNumber'
                                        value={patient?.phone ?? ''}
                                        onClick={checkLogin}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-1'>
                                <div>
                                    <label className='sr-only' htmlFor='address'>
                                        Chi tiết địa chỉ
                                    </label>
                                    <input
                                        className='w-full rounded-lg border-gray-200 p-3 text-sm border-1'
                                        placeholder='Địa chỉ'
                                        type='text'
                                        id='address'
                                        name='address'
                                        value={patient?.address ?? ''}
                                        onClick={checkLogin}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3'>
                                <select
                                    className={`w-full rounded-lg border-gray-200 p-3 text-sm border-1 ${selectedSpecialty ? 'text-black' : 'text-gray-400'}`}
                                    onChange={(e) => {
                                        handleInput('specialtyId', e.target.value)
                                        setSelectedSpecialty(e.target.value)
                                    }}
                                    onClick={checkLogin}
                                >
                                    <option value='specialtyId' selected disabled hidden>
                                        Chọn chuyên khoa
                                    </option>
                                    {specialties?.map((specialty) => (
                                        <option key={specialty.id} value={specialty.id}>
                                            {specialty.nameVi}
                                        </option>
                                    ))}
                                </select>

                                <div>
                                    <label className='sr-only' htmlFor='date'>
                                        Ngày khám
                                    </label>
                                    <DatePicker
                                        placeholderText='Ngày khám (dd-MM-yyyy)'
                                        selected={appointmentDate}
                                        onChange={(date) => {
                                            setAppointmentDate(date)
                                            handleInput('appointmentDate', format(date, 'yyyy-MM-dd'))
                                        }}
                                        onClick={checkLogin}
                                        dateFormat="dd-MM-yyyy"
                                        showPopperArrow={true}
                                        className='w-full rounded-lg border-gray-200 p-3 text-sm border-2'
                                    />
                                </div>
  
                                <select
                                    className={`w-full rounded-lg border-gray-200 p-3 text-sm border-1 ${input.healthInsurance ? 'text-black' : 'text-gray-400'}`}
                                    onChange={(e) => {
                                        handleInput('healthInsurance', e.target.value)
                                    }}
                                    onClick={checkLogin}
                                >
                                    <option value='expectedTime' selected disabled hidden>
                                        Sử dụng bảo hiểm y tế ?
                                    </option>
                                    <option key={true} value={true}>
                                        Có sử dụng
                                    </option>
                                    <option key={false} value={false}>
                                        Không sử dụng
                                    </option>
                                </select>         
                            </div>

                            <div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-2'>
                                <select
                                    className={`w-full rounded-lg border-gray-200 p-3 text-sm border-1 ${selectedPosition ? 'text-black' : 'text-gray-400'}`}
                                    onChange={(e) => {
                                        handleInput('expectedPosition', e.target.value)
                                        setSelectedPosition(e.target.value)
                                    }}
                                    onClick={checkLogin}
                                >
                                    <option defaultValue='' selected disabled hidden>
                                        Bạn muốn khám với ?
                                    </option>
                                    {positions?.map((position) => (
                                        <option key={position.id} value={position.position}>
                                            {position.position}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className={`w-full rounded-lg border-gray-200 p-3 text-sm border-1 ${input.expectedTime ? 'text-black' : 'text-gray-400'}`}
                                    onChange={(e) => {
                                        handleInput('expectedTime', e.target.value)
                                    }}
                                    onClick={checkLogin}
                                >
                                    <option value='expectedTime' selected disabled hidden>
                                        Chọn khung giờ
                                    </option>
                                    {timeSlots?.map((timeSlot) => (
                                        <option key={timeSlot.EN} value={timeSlot.EN}>
                                            {timeSlot.VI}
                                        </option>
                                    ))}
                                </select>  
                            </div>

                            <div>
                                <label className='sr-only' htmlFor='examReason'>
                                    Lý do khám bệnh
                                </label>

                                <textarea
                                    className='w-full rounded-lg border-gray-200 p-3 text-sm border-1'
                                    placeholder='Mô tả chi tiết tình trạng sức khỏe của bạn (Bệnh nhân vui lòng ghi đầy đủ nhất có thể)'
                                    rows='8'
                                    id='examReason'
                                    name='examReason'
                                    value={input.examReason}
                                    onChange={(e) => {
                                        handleInput('examReason', e.target.value)
                                    }}
                                    onClick={checkLogin}
                                    onKeyDown={handleKeyDown}
                                ></textarea>
                            </div>

                            {/* Error Notification */}
                            <div className='w-full text-red-600 text-center text-sm'>{errorMessage}</div>

                            <div className='mt-4'>
                                <button
                                    type='button'
                                    className='inline-block w-full rounded-lg bg-blue-500 px-5 py-3 font-medium text-white sm:w-auto'
                                    onClick={bookAppointment}
                                >
                                    Đặt lịch
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

export default PatientInfoPage
