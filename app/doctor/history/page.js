'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../components/common/Header'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { format } from 'date-fns'
import doctorApi from '../../api/doctor/DoctorApi'

const DoctorHistoryPage = () => {
    const auth = useSelector(state => state.auth)
    const [appointmentDoctors, setAppointmentDoctors] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const appointmentsPerPage = 3

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                let response = await doctorApi.getDoctorAppointment(auth.doctorId)
                setAppointmentDoctors(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        if (appointmentDoctors.length === 0) {
            fetchAppointments()
        }
    }, [currentPage])

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

    const indexOfLastAppointment = currentPage * appointmentsPerPage
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage
    const currentAppointments = appointmentDoctors && appointmentDoctors.length > 0 ? appointmentDoctors.slice(indexOfFirstAppointment, indexOfLastAppointment): []
    const totalAppointments = appointmentDoctors ? appointmentDoctors.length : 0

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalAppointments / appointmentsPerPage); i++) {
        pageNumbers.push(i)
    }
    
    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <main>
            <Header />
            <section className="w-[80%] mx-auto p-5">
                <h2 className="text-2xl font-semibold mb-5">Lịch khám của bác sĩ</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {currentAppointments?.length > 0 && currentAppointments.map((appointment, index) => (
                        <div key={index} className="flex flex-col rounded-lg overflow-hidden shadow-lg my-5">
                            <div className="bg-blue-100 p-3">
                                <h3 className="text-lg font-semibold">{appointment?.specialtyAppointment?.nameVi}</h3>
                                <p className='text-sm'><strong>Ngày hẹn:</strong> {format(appointment?.date, 'dd/MM/yyyy')}</p>
                                <p className='text-sm'><strong>Khung giờ bệnh nhân đặt:</strong> {appointment?.doctorAppointment_appointment?.expectedTime}</p>
                                <p className='text-sm'><strong>Khung giờ được xếp:</strong> {appointment?.timeSlot}</p>
                                <p className='text-sm'><strong>Bệnh nhân:</strong> {appointment?.doctorAppointment_appointment?.patientAppointment?.fullName}</p>
                                <p className='text-sm'><strong>Giới tính:</strong> {appointment?.doctorAppointment_appointment?.patientAppointment?.gender === 'Male' ? 'Nam':'Nữ'}</p>
                                <p className='text-sm'><strong>Ngày sinh:</strong> {format(appointment?.doctorAppointment_appointment?.patientAppointment?.birthday, 'dd/MM/yyyy')}</p>
                                <p className='text-sm'><strong>Địa chỉ:</strong> {appointment?.doctorAppointment_appointment?.patientAppointment?.address}</p>
                                <p className='text-sm'><strong>Lý do khám:</strong> {appointment?.doctorAppointment_appointment?.examReason}</p>
                                <p className='text-sm'><strong>Trạng thái:</strong> {renderStatus(appointment?.doctorAppointment_appointment?.status)}</p>
                            </div>
                            <div className="flex-grow bg-white py-2">
                                <p className='p-2'><strong>Mức độ ưu tiên:</strong> {appointment?.priority}</p>
                                <Link href={`/doctor/appointment/${appointment?.appointmentId}`} className='p-2 font-semibold text-blue-400 hover:text-blue-500 hover:underline'> Cập nhật kết quả khám </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-5">
                    <ul className="flex items-center">
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
                        {pageNumbers.map(number => (
                            <li key={number} className="mx-1">
                                <button
                                    className={`py-2 px-4 rounded-md ${currentPage === number ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-indigo-500 hover:text-white transition duration-300'}`}
                                    onClick={() => paginate(number)}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                        <li>
                            {currentPage < pageNumbers.length && (
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

                <Link href={'/doctor'} className="mt-6 inline-block text-blue-500 hover:underline">Quay lại trang chủ</Link>
            </section>
            {/* <ul className="flex items-center mx-auto justify-center absolute left-40 right-0">
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
                    {currentPage < Math.ceil(totalAppointments / appointmentsPerPage) && (
                        <button 
                            className="py-2 px-4 bg-gray-200 text-gray-600 rounded-md hover:bg-indigo-500 hover:text-white transition duration-300"
                            onClick={() => paginate(currentPage + 1)}
                        >
                                {'>'}
                        </button>
                    )}
                </li>
            </ul>
            <Link href={'/doctor'} className="mx-auto mt-6 inline-block text-blue-500 hover:underline w-[80%]">Quay lại trang chủ</Link> */}
        </main>
    )
}

export default DoctorHistoryPage
