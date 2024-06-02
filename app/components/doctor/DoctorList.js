'use client'
import React from 'react'
import Image from 'next/image'
import assets from '../../../assets'

const DoctorsList = ({ listDoctors }) => {
    return (
        <div className='flex flex-row flex-wrap justify-center w-full gap-10'>
            {listDoctors?.map((doctor, index) => (
                <div key={index} className='flex flex-col w-fit rounded-lg overflow-hidden text-center my-5'>
                    <Image src={assets.images.doctorCard} alt='Doctor Card' />
                    <div className='flex flex-col gap-2 bg-blue-email py-2'>
                        <p className='text-blue-950 font-semibold'>{doctor.position}: {doctor.doctorInformation.fullName}</p>
                        <p className='text-blue-950 font-semibold'>Chuyên khoa: {doctor.doctorSpecialty.nameVi}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DoctorsList
