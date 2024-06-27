'use client'
import React from 'react'
import Image from 'next/image'
import assets from '../../../assets'
import Link from 'next/link'

const DoctorsList = ({ listDoctors }) => {
    return (
        <div className='flex flex-row flex-wrap justify-center w-full gap-20'>
            {listDoctors?.map((doctor, index) => (
                <div key={index} className='flex flex-col w-fit rounded-lg overflow-hidden text-center my-5'>
                    {
                        doctor?.doctorInformation?.avatar !== null ? (
                            <img width={20} height={20} src={doctor?.doctorInformation?.avatar} alt='Doctor Card' className='w-80 h-72 mx-auto'/>
                        ) : (
                            <Image width={300} height={300} src={assets.images.doctorCard} alt='Doctor Card' className='w-80 h-72 mx-auto'/>
                        )    
                    }
                    {/* <Image src={assets.images.doctorCard} alt='Doctor Card' /> */}

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
    )
}

export default DoctorsList
