'use client'
import { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { useSelector } from 'react-redux'
import appointmentApi from '../api/appointment/AppointmentApi'
import Link from 'next/link'
import { format } from 'date-fns'
import toasts from '../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AppointmentsHistoryPatientPage = () => {
    const auth = useSelector(state => state.auth)
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                let response = await appointmentApi.getAppointmentPatientHistory(auth.id)
                setAppointments(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchAppointments()
    }, [])

    const handleCancelAppointment = async (appointmentId) => {
        try {
            let response = await appointmentApi.cancelAppointment(appointmentId)
            if (response.errCode === 0) {
                toasts.successTopRight('Hủy lịch khám thành công.')
                setAppointments(appointments.map(appointment => 
                    appointment.id === appointmentId ? { ...appointment, status: 'Đã hủy' } : appointment
                ))
            } else {
                toasts.errorTopRight('Hủy lịch khám thất bại.')
            }
        } catch (error) {
            console.log(error)
            toasts.errorTopRight('Có lỗi xảy ra.')
        }
    }

    const renderStatus = (status) => {
        switch (status) {
            case 'Đã hủy':
                return <span className="text-red-500 font-semibold"> Đã hủy </span>
            case 'Đã xác nhận':
                return <span className="text-orange-500 font-semibold"> Đã xác nhận </span>
            case 'Đã khám xong':
                return <span className="text-green-500 font-semibold"> Đã khám xong </span>
            default:
                return <span className="text-blue-500 font-semibold"> Lịch hẹn mới </span>
        }
    }

    return (
        <main>
            <Header />
            <Navbar />
            <section className="w-[80%] mx-auto p-5">
                <h2 className="text-2xl font-semibold mb-5">Lịch khám của bạn</h2>
                {
                    appointments?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {appointments.map((appointment, index) => (
                                <div key={index} className="flex flex-col rounded-lg overflow-hidden shadow-lg my-5">
                                    <div className="bg-blue-100 p-3">
                                        <h3 className="text-lg font-semibold">{appointment?.specialtyAppointment?.nameVi}</h3>
                                        <p className='text-sm'>Ngày hẹn: {format(appointment?.appointmentDate, 'dd/MM/yyyy')}</p>
                                        <p className='text-sm'>Khung giờ đặt: {appointment?.expectedTime}</p>
                                        <p className='text-sm'>Trạng thái: {renderStatus(appointment?.status)}</p>
                                        {(appointment?.status === 'Lịch hẹn mới' )  && (
                                            <button 
                                                className="mt-2 py-1 px-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 text-sm"
                                                onClick={() => handleCancelAppointment(appointment.id)}
                                            >
                                                Hủy lịch khám
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex-grow bg-white py-2">
                                        <Link href={`/history/${appointment.id}`} className='p-2 font-semibold hover:text-blue-500 hover:underline'> Xem chi tiết </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='w-full text-center h-200'>
                            <p className='text-gray-400 text-xl py-20'>Chưa có lịch khám nào</p>
                        </div>
                    )
                }
            </section>
            <ToastContainer />
            <Footer />
        </main>
    )
}

export default AppointmentsHistoryPatientPage
