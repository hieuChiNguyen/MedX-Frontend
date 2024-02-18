'use client'
import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import assets from '@/assets'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './doctor.css'

const NextArrow = ({ onClick }) => {
    return (
        <div className='arrow next' onClick={onClick}>
            <i className='fa-sharp fa-solid fa-arrow-right'></i>
        </div>
    )
}

const PrevArrow = ({ onClick }) => {
    return (
        <div className='arrow prev' onClick={onClick}>
            <i className='fa-sharp fa-solid fa-arrow-left'></i>
        </div>
    )
}

// function NextArrow(props) {
//     const { className, style, onClick } = props
//     return (
//         <div className={className} onClick={onClick}>
//             <i className='fa-sharp fa-solid fa-arrow-right'></i>
//         </div>
//     )
// }

// function PrevArrow(props) {
//     const { className, style, onClick } = props
//     return (
//         <div className={className} onClick={onClick}>
//             <i className='fa-sharp fa-solid fa-arrow-left'></i>
//         </div>
//     )
// }

const DoctorsList = ({ listDoctors }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }

    return (
        <div className='doctors-slider-container'>
            <Slider {...settings} className='doctors-slider items-center'>
                {listDoctors?.map((doctor, index) => (
                    <div key={index} className=''>
                        <div className='flex flex-col items-center'>
                            <Image src={assets.images.doctorCard} alt='Doctor Card' width={300} height={300} />
                            <div className='flex flex-col gap-2 bg-blue-email py-2 w-300'>
                                <p className='text-blue-950'>{doctor.fullName}</p>
                                <p className='text-blue-950'>{doctor.specialty}</p>
                                <p className='text-blue-950'>{doctor.email}</p>
                            </div>
                            <div className='text-white bg-blue-900 font-semibold cursor-pointer py-1 shadow-sm w-300'>
                                Xem chi tiết
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default DoctorsList
