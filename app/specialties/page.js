'use client'
import Footer from '../components/common/Footer'
import Header from '../components/common/Header'
import Navbar from '../components/common/Navbar'
import assets from '../../assets'
import { useEffect, useState } from 'react'
import doctorApi from '../api/doctor/DoctorApi'
import Link from 'next/link'
import Pagination from '../components/common/Pagination'

const ListSpecialtiesPage = () => {
    const [listSpecialties, setListSpecialties] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const itemsPerPage = 6

    const paginateAllSpecialties = async () => {
        try {
            let response = await doctorApi.paginateAllSpecialties(currentPage, itemsPerPage)
            setListSpecialties(response?.data.specialties)
            setTotalItems(response?.data.length)
            setTotalPages(response?.data.totalPages)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        paginateAllSpecialties()
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
                <h2 className='text-2xl font-semibold'>Danh sách các chuyên khoa tại MEDX (Tổng số: {totalItems} chuyên khoa)</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {listSpecialties?.map((specialty, index) => (
                        <div key={index} className='flex flex-col rounded-lg overflow-hidden text-center my-5 w-[90%]'>
                            <img width={20} height={20} src={specialty?.image ?? assets.images.CoXuongKhop} alt={specialty.nameEn} className='w-40 h-40 mx-auto rounded-2xl p-1'/>
                            <div className='flex flex-col gap-2 bg-blue-email py-2 px-1'>
                                <p className='text-blue-950 font-semibold'>Chuyên khoa: {specialty.nameVi}</p>
                            </div>

                            <Link href={`/specialties/${specialty.id}`}>
                                <div 
                                    className='text-white bg-blue-900 font-semibold cursor-pointer py-1 shadow-sm rounded-b-lg'
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

export default ListSpecialtiesPage
