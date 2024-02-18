'use client'
import assets from '@/assets'
import Image from 'next/image'

const DoctorCard = (doctor) => {
    return (
        <div className='flex flex-col'>
            <Image src={assets.images.doctorCard} alt='Doctor Card' />
            <div className='flex flex-col gap-2 bg-blue-email py-2'>
                <p className='text-blue-950'>{doctor.fullName}</p>
                <p className='text-blue-950'>{doctor.specialty}</p>
                <p className='text-blue-950'>{doctor.email}</p>
            </div>
            <div className='text-white bg-blue-900 font-semibold cursor-pointer py-1 shadow-sm'>Xem chi tiết</div>
        </div>
    )
}

export default DoctorCard
