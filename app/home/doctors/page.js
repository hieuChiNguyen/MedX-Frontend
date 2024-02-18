'use client'
import { useState, useEffect } from 'react'
import Footer from '@/app/components/common/Footer'
import Header from '@/app/components/common/Header'
import Navbar from '@/app/components/common/Navbar'
import Image from 'next/image'
import assets from '@/assets'
import doctorApi from '@/app/api/doctor/DoctorApi'
import { useRouter } from 'next/navigation'

const ListDoctorsPage = () => {
    const router = useRouter()
    const [listDoctors, setListDoctors] = useState([])

    const getAllDoctors = async () => {
        try {
            let response = await doctorApi.getAllDoctors()
            setListDoctors(response.data)
            console.log('doctors response: ', response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllDoctors()
    }, [])

    const displayDetailDoctor = (doctorId) => {
        localStorage.setItem('doctorId', doctorId)

        router.push(`/doctor-detail`)
    }

    return (
        <main>
            <Header />
            <Navbar />

            <section className='w-[80%] mx-auto p-5'>
                <h2 className='text-2xl font-semibold'>Danh sách các bác sĩ tại MEDX</h2>
                {listDoctors?.map((doctor, index) => (
                    <div key={index} className='flex flex-row gap-5 border-b-1 p-5 items-center'>
                        <Image
                            src={assets.images.doctorSample}
                            alt='Doctor Sample'
                            className='h-28 w-28 rounded-lg cursor-pointer'
                            onClick={() => displayDetailDoctor(doctor.id)}
                        />
                        <div key={index} className='flex-1 text-lg font-thin'>
                            <p className='cursor-pointer' onClick={() => displayDetailDoctor(doctor.id)}>
                                Phó Giáo sư, Tiến sĩ, Bác sĩ {doctor.fullName}
                            </p>
                            <p>Da liễu</p>
                            {/* <button type='button' className='bg-blue-400'>
                            Đặt lịch khám
                        </button> */}
                        </div>
                    </div>
                ))}
            </section>

            <Footer />
        </main>
    )
}

export default ListDoctorsPage
