'use client'
import { useState, useEffect } from 'react'
import toasts from '../../../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import doctorApi from '../../../api/doctor/DoctorApi'
import appointmentApi from '../../../api/appointment/AppointmentApi'
import patientApi from '../../../api/patient/PatientApi'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ExpectedTimeSlotEnum } from '../../../../utils/enum/expected_time_slot.enum'
import AdminSideBar from '../../../components/common/admin/AdminSideBar'
import { format, addDays, getDay  } from 'date-fns'

const PatientInfoPage = ({params}) => {
    const router = useRouter()
    const auth = useSelector(state => state.auth); 
    const patientId = params.patientId
    const [input, setInput] = useState({
        examReason: '',
        expectedTime: '',
        appointmentDate: '',
        specialty: '',
        patientId: patientId,
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

    const bookAppointment = async () => {
        setErrorMessage('')
        const isValid = Object.values(input).every((value) => value !== '')

        if (!isValid) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin.')
        } else {
            try {
                let response = await appointmentApi.createNewAppointment(input)

                // Fail to create new patient
                if (response.data && response.message !== 'OK') {
                    setErrorMessage(response.message)
                    toasts.errorTopRight('Đặt lịch khám thất bại.')
                }

                // Success to create new patient
                if (response.data && response.message === 'OK') {
                    toasts.successTopRight('Đặt lịch khám thành công.')
                    setTimeout(function () {
                        router.push('/admin/appointment')
                    }, 1500)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const today = new Date()
    const dayOfWeek = getDay(today)
    let minDate, maxDate;

    if (dayOfWeek === 6) {
        minDate = addDays(today, 2); // Next Monday
        maxDate = addDays(today, 6); // Next Friday
    } else if (dayOfWeek === 0) {
        minDate = addDays(today, 1); // Next Monday
        maxDate = addDays(today, 5); // Next Friday
    } else {
        const daysUntilFriday = 5 - dayOfWeek; // Calculate days until next Friday
        minDate = today;
        maxDate = addDays(today, daysUntilFriday); // Calculate the date for the upcoming Friday
    }

    return (
        <main className='w-screen flex 2xl:mx-auto 2xl:border-x-2 2xl:border-indigo-50'>
            <AdminSideBar />
  
            <section className='bg-indigo-50/60 w-full py-10 px-3 sm:px-10'>
                <nav className='text-lg flex items-center justify-between content-center '>
                    <div className=' font-semibold text-xl text-gray-800 flex space-x-4 items-center my-5'>
                        <span>Tạo lịch khám</span>
                    </div>
                </nav>
                   

                <div className='rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-10'>
                    <form className='flex flex-col gap-5'>
                        <h1 className='text-blue-600 text-2xl'>Thông tin bệnh nhân đặt khám</h1>
                        
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
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3'>
                            <select
                                className={`w-full rounded-lg border-gray-200 p-3 text-sm border-1 ${selectedSpecialty ? 'text-black' : 'text-gray-400'}`}
                                onChange={(e) => {
                                    handleInput('specialty', e.target.value)
                                    setSelectedSpecialty(e.target.value)
                                }}
                            >
                                <option value='specialty' selected disabled hidden>
                                    Chọn chuyên khoa
                                </option>
                                {specialties?.map((specialty) => (
                                    <option key={specialty.id} value={specialty.nameVi}>
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
                                    dateFormat="dd-MM-yyyy"
                                    showPopperArrow={true}
                                    className='w-full rounded-lg border-gray-200 p-3 text-sm border-2'
                                    minDate={minDate}
                                    maxDate={maxDate}
                                />
                            </div>

                            <select
                                className={`w-full rounded-lg border-gray-200 p-3 text-sm border-1 ${input.healthInsurance ? 'text-black' : 'text-gray-400'}`}
                                onChange={(e) => {
                                    handleInput('healthInsurance', e.target.value)
                                }}
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
                                Tạo lịch
                            </button>
                        </div>
                    </form>
                </div>

                <ToastContainer />
            </section>
        </main>
    )
}

export default PatientInfoPage
