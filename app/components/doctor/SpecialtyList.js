'use client'
import React from 'react'
import Image from 'next/image'
import assets from '../../../assets'
import Link from 'next/link'

const SpecialtyList = ({ listSpecialties }) => {
    return (
        <div className='flex flex-row flex-wrap justify-center w-full gap-10'>
            {listSpecialties?.map((specialty, index) => (
                <div key={index} className='flex flex-col w-[20%] rounded-lg overflow-hidden text-center my-5'>
                    <img width={20} height={20} src={specialty?.image ?? assets.images.CoXuongKhop} alt={specialty.nameEn} className='w-40 h-40 mx-auto rounded-2xl p-1'/>
                    <div className='flex flex-col gap-2 bg-blue-email py-2 px-1'>
                        <p className='text-blue-950 font-semibold'>{specialty.nameVi}</p>
                    </div>

                    <Link href={`/specialties/${specialty.id}`}>
                        <div 
                            className='text-white bg-blue-900 font-semibold cursor-pointer py-1 shadow-sm'
                        >
                            Xem chi tiết
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default SpecialtyList
