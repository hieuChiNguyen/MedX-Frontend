'use client'
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const [isSelected, setIsSelected] = useState(1)
    return (
        <div className='flex justify-center flex-row gap-4'>
            <button
                className=''
                onClick={() => {
                    onPageChange(currentPage - 1), setIsSelected(currentPage - 1)
                }}
                disabled={currentPage === 1}
            >
                <i className='fa-regular fa-angle-left font-bold text-3xl cursor-pointer'></i>
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <Link
                    key={index + 1}
                    href={`/home/specialties?page=${index + 1}`}
                    onClick={() => {
                        onPageChange(index + 1), setIsSelected(index + 1)
                    }}
                    className={`justify-center px-3  rounded-full flex items-center ${
                        currentPage === index + 1 ? 'font-bold' : ''
                    } ${isSelected === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                >
                    {index + 1}
                </Link>
            ))}
            <button
                onClick={() => {
                    onPageChange(currentPage + 1), setIsSelected(currentPage + 1)
                }}
                disabled={currentPage === totalPages}
            >
                <i className='fa-regular fa-angle-right font-bold text-3xl cursor-pointer'></i>
            </button>
        </div>
    )
}

export default Pagination
