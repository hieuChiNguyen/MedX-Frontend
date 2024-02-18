'use client'
import Footer from '@/app/components/common/Footer'
import Header from '@/app/components/common/Header'
import Navbar from '@/app/components/common/Navbar'
import Image from 'next/image'
import assets from '@/assets'
import { useEffect, useState } from 'react'
import doctorApi from '@/app/api/doctor/DoctorApi'
import Pagination from '@/app/components/common/Pagination'

const ListSpecialtiesPage = () => {
    const [listSpecialties, setListSpecialties] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const getAllSpecialties = async () => {
        try {
            let response = await doctorApi.getAllSpecialties(currentPage, itemsPerPage)
            setListSpecialties(response.data)
            setTotalItems(response?.length)
            console.log('doctors response: ', response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllSpecialties(currentPage, itemsPerPage)
    }, [])

    // Logic for calculating pagination
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    // const currentItems = listSpecialties?.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    // Change page
    const onPageChange = async (pageNumber) => {
        console.log('number', pageNumber)
        setCurrentPage(pageNumber)

        // Gọi API để lấy dữ liệu cho trang mới
        try {
            let response = await doctorApi.getAllSpecialties(pageNumber, itemsPerPage)
            console.log('-----', response)
            setListSpecialties(response.data)
            setTotalItems(response.length)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main>
            <Header />
            <Navbar />
            <section className='w-[80%] mx-auto p-5'>
                <h2 className='text-2xl font-semibold'>Danh sách các chuyên khoa tại MEDX (Tổng số: {totalItems})</h2>
                {listSpecialties?.map((currentSpecialty) => (
                    <div
                        key={currentSpecialty}
                        className='flex flex-row gap-5 border-b-1 p-5 items-center cursor-pointer'
                    >
                        <Image src={assets.images.CoXuongKhop} alt='Co Xuong Khop' className='h-28 w-28 rounded-lg' />
                        <p className='flex-1 text-xl font-medium text-blue-600'>{currentSpecialty}</p>
                    </div>
                ))}
            </section>

            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />

            <Footer />
        </main>
    )
}

export default ListSpecialtiesPage
