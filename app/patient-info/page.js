'use client'
import { useState, useEffect } from 'react'
import patientApi from '../api/patient/PatientApi'
import toasts from '@/app/components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import doctorApi from '../api/doctor/DoctorApi'

const PatientInfoPage = () => {
    const router = useRouter()
    const [input, setInput] = useState({
        email: '',
        fullName: '',
        phoneNumber: '',
        reasonExamination: '',
        address: ''
    })

    const [errorMessage, setErrorMessage] = useState('')
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [specialties, setSpecialties] = useState([])
    const [doctorSpecialties, setDoctorSpecialties] = useState([])
    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log('check input: ', input)
    }

    useEffect(() => {
        doctorApi.getAllSpecialties(1, 200).then((res) => {
            setSpecialties([...res.data])
        })
    }, [])

    useEffect(() => {
        console.log('check patient input: ', input)
    }, [input])

    useEffect(() => {
        chooseProvince()
        chooseDistrict()
        chooseWard()
    }, [])

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            sendPatientInfo()
        }
    }

    const sendPatientInfo = async () => {
        setErrorMessage('')
        const isValid = Object.values(input).every((value) => value !== '')

        if (!isValid) {
            toasts.errorTopRight('Vui lòng điền đầy đủ thông tin.')
        } else {
            try {
                let response = await patientApi.createNewPatient(input)
                console.log('check data register patient', response)

                // Fail to create new patient
                if (response.data && response.message !== 'OK') {
                    setErrorMessage(data.message)
                    toasts.errorTopRight('Đăng ký thông tin thất bại.')
                }

                // Success to create new patient
                if (response.data && response.message === 'OK') {
                    localStorage.setItem('patientId', response.data.id)
                    toasts.successTopRight('Đăng ký thông tin thành công.')
                    setTimeout(function () {
                        router.push('/book-appointment')
                    }, 1500)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const chooseProvince = async () => {
        try {
            let response = await patientApi.getAllProvinces()

            setProvinces(response.data)
            console.log(provinces)
        } catch (error) {
            console.log(error)
        }
    }

    const chooseDistrict = async () => {
        try {
            if (selectedProvince !== '') {
                let response = await patientApi.getAllDistricts(selectedProvince)
                setDistricts(response.data)
                console.log(districts)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const chooseWard = async () => {
        try {
            if (selectedDistrict !== '') {
                let response = await patientApi.getAllWards(selectedDistrict)

                setWards(response.data)
                console.log(wards)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const chooseSpecialty = async (specialty) => {
        console.log(specialties)
        console.log('check :', specialty)

        try {
            let response = await doctorApi.getListDoctorsBySpecialty(specialty)
            console.log('check ressssponssse: ', response)

            setDoctorSpecialties(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const showDetailDoctorInfo = (doctorId) => {
        console.log('check doctor: ', doctorId)
        localStorage.setItem('doctorId', doctorId)
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

                        <div className='mt-8'>
                            <a href='' className='text-2xl font-bold text-blue-600'>
                                0969 871 766
                            </a>

                            <address className='mt-2 not-italic'>Số 1 Giải Phóng</address>
                        </div>
                    </div>

                    <div className='rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-10'>
                        <form className='flex flex-col gap-5'>
                            <h1 className='text-blue-600 text-2xl'>Thông tin bệnh nhân</h1>
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
                                    onChange={handleInput}
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
                                        value={input.fullName}
                                        onChange={handleInput}
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
                                        value={input.phoneNumber}
                                        onChange={handleInput}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3'>
                                <select
                                    className='w-full rounded-lg border-gray-200 p-3 text-sm border-1 text-gray-400 '
                                    onClick={chooseProvince}
                                    onChange={(e) => {
                                        setSelectedProvince(e.target.value)
                                    }}
                                >
                                    <option value='province' selected disabled hidden>
                                        Tỉnh / Thành phố
                                    </option>
                                    {provinces?.map((province) => (
                                        <option key={province.code} value={province.code}>
                                            {province.fullName}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className='w-full rounded-lg border-gray-200 p-3 text-sm border-1 text-gray-400'
                                    onClick={chooseDistrict}
                                    onChange={(e) => {
                                        setSelectedDistrict(e.target.value)
                                    }}
                                >
                                    <option defaultValue='' selected disabled hidden>
                                        Quận / Huyện
                                    </option>
                                    {districts?.map((district) => (
                                        <option key={district.code} value={district.code}>
                                            {district.fullName}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className='w-full rounded-lg border-gray-200 p-3 text-sm border-1 text-gray-400'
                                    onClick={chooseWard}
                                >
                                    <option defaultValue='' selected disabled hidden>
                                        Xã / Phường
                                    </option>
                                    {wards?.map((ward) => (
                                        <option key={ward.code} value={ward.code}>
                                            {ward.fullName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-1'>
                                <div>
                                    <label className='sr-only' htmlFor='address'>
                                        Chi tiết địa chỉ
                                    </label>
                                    <input
                                        className='w-full rounded-lg border-gray-200 p-3 text-sm border-1'
                                        placeholder='Chi tiết địa chỉ'
                                        type='text'
                                        id='address'
                                        name='address'
                                        value={input.address}
                                        onChange={handleInput}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3'>
                                <select
                                    className='w-full rounded-lg border-gray-200 p-3 text-sm border-1 text-gray-400'
                                    onChange={(e) => chooseSpecialty(e.target.value)}
                                >
                                    <option value='specialty' selected disabled hidden>
                                        Chọn chuyên khoa
                                    </option>
                                    {specialties?.map((specialty) => (
                                        <option key={specialty} value={specialty}>
                                            {specialty}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className='w-full rounded-lg border-gray-200 p-3 text-sm border-1 text-gray-400'
                                    onChange={(e) => showDetailDoctorInfo(e.target.value)}
                                >
                                    <option value='doctor' selected disabled hidden>
                                        Chọn bác sĩ
                                    </option>
                                    {doctorSpecialties?.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.fullName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className='sr-only' htmlFor='reason'>
                                    Lý do khám bệnh
                                </label>

                                <textarea
                                    className='w-full rounded-lg border-gray-200 p-3 text-sm border-1'
                                    placeholder='Mô tả tình trạng sức khỏe của bạn'
                                    rows='8'
                                    id='reason'
                                    name='reasonExamination'
                                    value={input.reasonExamination}
                                    onChange={handleInput}
                                    onKeyDown={handleKeyDown}
                                ></textarea>
                            </div>

                            <div className='mt-4'>
                                <button
                                    type='button'
                                    className='inline-block w-full rounded-lg bg-blue-500 px-5 py-3 font-medium text-white sm:w-auto'
                                    onClick={sendPatientInfo}
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

export default PatientInfoPage
