'use client'
import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import appointmentApi from '../api/appointment/AppointmentApi'
import toasts from '@/app/components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

const BookAppointmentPage = () => {
    const router = useRouter()
    const [startDate, setStartDate] = useState(new Date())
    const [daysOfWeek, setDaysOfWeek] = useState([])

    // Lấy doctorId từ localStorage
    const doctorId = localStorage.getItem('doctorId')
    const patientId = localStorage.getItem('patientId')

    const [input, setInput] = useState({
        timeExamination: format(startDate, 'yyyy-MM-dd'),
        doctorId: doctorId,
        patientId: patientId
    })

    useEffect(() => {
        // Format the selected date before using it
        const formattedDate = format(startDate, 'yyyy-MM-dd')

        // Update input with the formatted date
        // setInput({
        //     ...input,
        //     timeExamination: formattedDate
        // })

        console.log('check input time examination: ', input)
    }, [startDate]) // Chỉ chạy khi startDate thay đổi

    const handleTimeExamination = (date) => {
        setStartDate(date)

        // Cập nhật input trước khi format ngày
        setInput({
            ...input,
            timeExamination: format(date, 'yyyy-MM-dd')
        })

        console.log('check input time examination: ', input)
    }
    // const handleTimeExamination = (date) => {
    //     setStartDate(date)

    //     // Format the selected date before using it
    //     const formattedDate = format(date, 'yyyy-MM-dd')
    //     setInput({
    //         ...input,
    //         timeExamination: formattedDate
    //     })
    //     console.log('check input time examination: ', input)
    // }

    useEffect(() => {
        chooseDayOfWeek()
    }, [])

    const chooseDayOfWeek = async () => {
        try {
            let response = await appointmentApi.getDaysOfWeek()

            setDaysOfWeek(response.data)
            console.log(daysOfWeek)
        } catch (error) {
            console.log(error)
        }
    }

    const handleBookAppointment = async () => {
        console.log('check input time examination: ', input)
        try {
            let response = await appointmentApi.createNewAppointment(input)
            console.log('check data register doctor', response)

            // Fail to create new appointment
            if (response.data && response.message !== 'OK') {
                setErrorMessage(data.message)
                toasts.errorTopCenter('Book appointment failed. Please try again!')
            }

            // Success to create new appointment
            if (response.data && response.message === 'OK') {
                toasts.successTopCenter('Đặt lịch thành công. Kiểm tra email.')
                setTimeout(function () {
                    router.push('/')
                }, 2500)
            }

            // Xóa doctorId, patientId từ localStorage sau khi lấy xong
            localStorage.removeItem('doctorId')
            localStorage.removeItem('patientId')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='bg-gray-100'>
            <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5'>
                    <div className='lg:col-span-2 lg:py-12'>
                        <div className='flex flex-row cursor-pointer' onClick={() => router.push('/')}>
                            <p className='uppercase font-semibold text-4xl'>Med</p>
                            <p className='uppercase font-semibold text-4xl text-blue-500 '>X</p>
                        </div>
                        <p className='max-w-xl text-16'>
                            Đến với MedX bạn sẽ nhận được sự tư vấn và chăm sóc tận tình của các bác sĩ hàng đầu với
                            trình độ và chuyên môn cao
                        </p>

                        <div className='mt-8'>
                            <a href='' className='text-2xl font-bold text-blue-600'>
                                0969 871 766
                            </a>

                            <address className='mt-2 not-italic'>Số 1 Giải Phóng</address>
                        </div>
                    </div>

                    <div className='rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12'>
                        <form className='flex flex-col gap-5'>
                            <div className='grid grid-cols-2 gap-4'>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => handleTimeExamination(date)}
                                    className='w-full rounded-lg border-gray-200 p-3 text-sm border-2'
                                />

                                <select
                                    className='w-full rounded-lg border-gray-200 p-3 text-sm border-2 text-gray-400'
                                    onClick={chooseDayOfWeek}
                                >
                                    <option defaultValue='' selected disabled hidden>
                                        Thứ
                                    </option>

                                    {daysOfWeek.map((dayOfWeek) => (
                                        <option key={dayOfWeek} value={dayOfWeek}>
                                            {dayOfWeek}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <p className='text-blue-600'>Hình thức thanh toán</p>
                                <div className='grid grid-cols-2'>
                                    <label className='flex items-center'>
                                        <input type='radio' value='offline' name='paymentOption' />
                                        <span className='text-sm'> Thanh toán sau tại cơ sở y tế</span>
                                    </label>

                                    <label className='flex items-center ml-4'>
                                        <input type='radio' value='online' name='paymentOption' />
                                        <span className='text-sm'> Thanh toán trực tuyến</span>
                                    </label>
                                </div>
                            </div>
                            <button
                                type='button'
                                className='py-2 px-3 bg-blue-email rounded-lg font-semibold'
                                onClick={handleBookAppointment}
                            >
                                Đặt lịch
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default BookAppointmentPage
