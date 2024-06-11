'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../components/common/Header'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { format } from 'date-fns'
import doctorApi from '../../api/doctor/DoctorApi'

const DoctorAppointmentPage = () => {
    const auth = useSelector(state => state.auth)
    const [appointmentDoctors, setAppointmentDoctors] = useState([])

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                let response = await doctorApi.getDoctorAppointment(auth.doctorId)
                setAppointmentDoctors(response.data)
                console.log('check appointment::', appointmentDoctors);
            } catch (error) {
                console.log(error)
            }
        }

        if (appointmentDoctors.length === 0) {
            fetchAppointments()
        }
    }, [])

    // const renderStatus = (status) => {
    //     switch (status) {
    //         case 'Đã hủy':
    //             return <span className="text-gray-500 font-semibold"> Đã hủy </span>
    //         case 'Đã xác nhận':
    //             return <span className="text-green-500 font-semibold"> Đã xác nhận </span>
    //         case 'Đã khám xong':
    //             return <span className="text-red-500 font-semibold"> Đã khám xong </span>
    //         default:
    //             return <span className="text-blue-500 font-semibold"> Lịch hẹn mới </span>
    //     }
    // }

    return (
        <main>
            <Header />
            <section className="w-[80%] mx-auto p-5">
                <h2 className="text-2xl font-semibold mb-5">Lịch khám của bác sĩ</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {appointmentDoctors.length > 0 && appointmentDoctors.map((appointment, index) => (
                        <div key={index} className="flex flex-col rounded-lg overflow-hidden shadow-lg my-5">
                            <div className="bg-blue-100 p-3">
                                <h3 className="text-lg font-semibold">{appointment?.specialtyAppointment?.nameVi}</h3>
                                <p className='text-sm'>Ngày hẹn: {format(appointment?.date, 'dd/MM/yyyy')}</p>
                                <p className='text-sm'>Khung giờ đặt: {appointment?.timeSlot}</p>
                                <p className='text-sm'>Lý do khám: {appointment?.doctorAppointment_appointment?.examReason}</p>
                                {/* <p className='text-sm'>Trạng thái: {renderStatus(appointment?.status)}</p> */}
                            </div>
                            <div className="flex-grow bg-white py-2">
                                <p className='p-2'><strong>Mức độ ưu tiên:</strong> {appointment?.priority}</p>
                                <Link href={`/doctor/appointment/${appointment?.appointmentId}`} className='p-2 font-semibold text-blue-400 hover:text-blue-500 hover:underline'> Cập nhật kết quả khám </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <Link href={'/doctor'} className="mt-4 inline-block text-blue-500 hover:underline">Quay lại trang chủ</Link>
            </section>
        </main>
    )
}

export default DoctorAppointmentPage
