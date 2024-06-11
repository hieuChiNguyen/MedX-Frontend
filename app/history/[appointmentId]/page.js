'use client'
import { useEffect, useState } from 'react'
import Header from '../../components/common/Header'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import appointmentApi from '../../api/appointment/AppointmentApi'
import patientApi from '../../api/patient/PatientApi'
import { format } from 'date-fns'
import Link from 'next/link'
import toasts from '../../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ShareEmailModal from '../../components/common/ShareEmailModal'

const AppointmentDetailPage = ({params}) => {
    const appointmentId = params.appointmentId
    const [appointment, setAppointment] = useState(null)
    const [result, setResult] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        appointmentApi.getAppointmentById(appointmentId)
        .then((response) => {
            setAppointment(response.data)
        })
        .catch((error) => console.log(error))
    }, [appointmentId])

    useEffect(() => {
        patientApi.getExamResult(appointmentId)
        .then((response) => {
            console.log('check response::', response);
            setResult(response.data)
        })
        .catch((error) => console.log(error))
    }, [appointmentId])

    const generateShareCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let code = ''
        for (let i = 0; i < 3; i++) {
            code += characters.charAt(Math.floor(Math.random() * 52)) // letters only
        }
        for (let i = 0; i < 3; i++) {
            code += characters.charAt(Math.floor(Math.random() * 10) + 52) // numbers only
        }

        const shuffle = (string) => {
            let array = string.split('')
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[array[i], array[j]] = [array[j], array[i]]
            }
            return array.join('')
        }
    
        // Shuffle the code to mix letters and numbers
        const shuffledCode = shuffle(code)
        return shuffledCode
    }

    const shareUrl = async (emails) => {
        try {
            const newCode = generateShareCode()
            console.log('check check new code::', newCode);
            const shareData = {
                emails: emails,
                appointmentId: appointmentId,
                code: newCode,
                url: result?.history?.files
            }
            console.log('check share data::', shareData);
            let response = await patientApi.shareAppointmentResult(shareData)

            // Success to create new user
            if (response.errCode === 0) {
                setIsModalOpen(false)
                toasts.successTopRight('Chia sẻ thành công.')
            }

            if (response?.errCode === 1) {
                toasts.successTopRight(response.message)
                setIsModalOpen(false)
            }
        } catch (error) {
            console.log(error)
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

    if (!appointment) return <div className='text-blue-400 p-3 text-lg'>Loading...</div>

    return (
        <main>
            <Header />
            <Navbar />
            <section className="w-[80%] mx-auto p-5">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Chi tiết lịch hẹn</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className='flex flex-col gap-4'>
                            <h3 className="text-xl font-semibold text-blue-500">Thông tin lịch hẹn</h3>
                            <p><strong>Chuyên khoa:</strong> {appointment?.specialtyAppointment?.nameVi}</p>
                            <p><strong>Ngày hẹn:</strong> {format(appointment?.appointmentDate, 'dd/MM/yyyy')}</p>
                            <p><strong>Khung giờ đặt:</strong> {appointment?.expectedTime}</p>
                            <p><strong>Lý do khám:</strong> {appointment?.examReason}</p>
                            <p><strong>Trạng thái:</strong> {renderStatus(appointment?.status)}</p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h3 className="text-xl font-semibold text-blue-500">Thông tin bác sĩ</h3>
                            <p><strong>Tên bác sĩ:</strong> {appointment.doctorName}</p>
                            <p><strong>Chuyên khoa:</strong> {appointment.notes}</p>
                        </div>
                    </div>
                    <div className='my-10 flex flex-col gap-5'>
                        <div>
                            <p className='text-xl font-semibold text-blue-500'>Kết quả chẩn đoán của bác sĩ</p>
                            <div className='border w-full h-fit focus:outline-blue-500 p-5 my-1'>{result?.history?.description}</div>
                        </div>
                        <div>
                            <p className='font-semibold text-blue-500'>Đường dẫn file kết quả</p>
                            <a href={result?.history?.files} className=' w-fit h-fit hover:text-blue-500 p-5 my-1 cursor-pointer'>Tải file kết quả khám</a>
                            <button 
                                className='p-2 bg-blue-300 rounded-lg w-40'
                                onClick={() => setIsModalOpen(true)}
                            >
                                Chia sẻ
                            </button>
                        </div>
                    </div>
                    <Link href={'/history'} className="mt-4 inline-block text-blue-500 hover:underline">Quay lại danh sách</Link>
                </div>
            </section>
            <Footer />
            <ToastContainer />
            <ShareEmailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onShare={shareUrl}
            />
        </main>
    )
}

export default AppointmentDetailPage
