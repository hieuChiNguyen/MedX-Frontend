'use client'
import { useState, useEffect } from 'react'
import Footer from '../components/common/Footer'
import Header from '../components/common/Header'
import Navbar from '../components/common/Navbar'
import Image from 'next/image'
import assets from '../../assets'
import doctorApi from '../api/doctor/DoctorApi'
import Link from 'next/link'
import Pagination from '../components/common/Pagination'

const ListDoctorsPage = () => {
    const [listDoctors, setListDoctors] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const itemsPerPage = 6

    const getAllActiveDoctors = async () => {
        try {
            let response = await doctorApi.paginateAllDoctors(currentPage, itemsPerPage)
            setListDoctors(response?.data.doctors)
            setTotalItems(response?.data.length)
            setTotalPages(response?.data.totalPages)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllActiveDoctors()
    }, [currentPage])

    const onPageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    return (
        <main>
            <Header />
            <Navbar />

            <section className='w-[80%] mx-auto p-5'>
                <h2 className='text-2xl font-semibold'>Danh sách các bác sĩ tại MEDX (Tổng số: {totalItems} bác sĩ)</h2>
                
                <div className='flex flex-row flex-wrap justify-center w-full gap-10'>
                    {listDoctors?.map((doctor, index) => (
                        <div key={index} className='flex flex-col w-fit rounded-lg overflow-hidden text-center my-5'>
                            <Image src={doctor.doctorInformation.avatar ?? assets.images.doctorCard} alt='Doctor Card' />
                            <div className='flex flex-col gap-2 bg-blue-email py-2'>
                                <p className='text-blue-950 font-semibold'>{doctor.position}: {doctor.doctorInformation.fullName}</p>
                                <p className='text-blue-950 font-semibold'>Chuyên khoa: {doctor.doctorSpecialty.nameVi}</p>
                            </div>

                            <Link href={`/doctors/${doctor.id}`}>
                                <div 
                                    className='text-white bg-blue-900 font-semibold cursor-pointer py-1 shadow-sm'
                                >
                                    Xem chi tiết
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </section>

            <Footer />
        </main>
    )
}

export default ListDoctorsPage
