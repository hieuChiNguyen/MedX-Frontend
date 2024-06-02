'use client'
import React from 'react'
import Image from 'next/image'
import assets from '../../../assets'

const SpecialtyList = ({ listSpecialties }) => {
    return (
        <div className='flex flex-row flex-wrap justify-center w-full gap-10'>
            {listSpecialties?.map((specialty, index) => (
                <div key={index} className='flex flex-col w-[20%] rounded-lg overflow-hidden text-center my-5'>
                    <Image src={assets.images.CoXuongKhop} alt='Specialty Image'/>
                    <div className='flex flex-col gap-2 bg-blue-email py-2'>
                        <p className='text-blue-950 font-semibold'>{specialty.nameVi}</p>
                    </div>
        
                    <div 
                        className='text-white bg-blue-900 font-semibold cursor-pointer py-1 shadow-sm'
                    >
                        Xem chi tiết
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SpecialtyList
