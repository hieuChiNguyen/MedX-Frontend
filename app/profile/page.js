'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import assets from '../../assets'
// import convertImage from '../../utils/ConvertImage'
import Header from '../components/common/Header'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import patientApi from '../api/patient/PatientApi'
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'
import { storage } from '../../firebase/firebase'
import toasts from '../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ProfilePage() {
    const auth = useSelector((state) => state.auth)
    const [profile, setProfile] = useState(null)
    const [showAvatar, setShowAvatar] = useState(null)
    const [avatar, setAvatar] = useState('')
    const [render, setRender] = useState(false)
    const [imageUrl, setImageUrl]= useState({
        id: auth.id,
        avatar: ''
    })

    // useEffect(() => {
    //     setRender(true)
    // }, [auth.id])

    useEffect(() => {
        const getProfile = async () => {
            await patientApi.getPatientInformation(auth.id).then((res) => {
                if (res && res.errCode === 0) {
                    setProfile(res.data)
                    // let base64Image = Buffer.from(res.data.avatar, 'base64').toString()
                    // setAvatar(base64Image)
                    setAvatar(res.data.avatar)
                }
            })
        }

        getProfile()
    }, [showAvatar])

    // const handleShowUpdateAvatar = async (e) => {
    //     let avatarImage = e.target.files[0]
    //     if (avatarImage) {
    //         let base64 = await convertImage(avatarImage)
    //         let objectUrl = URL.createObjectURL(avatarImage)
    //         setShowAvatar(objectUrl)
    //         setProfile({ ...profile, avatar: base64 })
    //         console.log('check base64: ', base64)
    //     }
    // }

    const handleShowUpdateAvatar = async (e) => {
        if (typeof window !== 'undefined') { // Check if running in client
            let avatarImage = e.target.files[0]
            if (avatarImage) {
                let objectUrl = URL.createObjectURL(avatarImage)
                setShowAvatar(objectUrl)

                const storageRef = ref(storage, `avatars/${auth.id}_${avatarImage.name}`)
                await uploadBytes(storageRef, avatarImage)
                const avatarURL = await getDownloadURL(storageRef)
                console.log('check avatarURL::', avatarURL)
                setProfile({ ...profile, avatar: avatarURL })
                setImageUrl({ ...imageUrl, avatar: avatarURL })
            }
        }
    }

    // useEffect(() => {
    //     if (avatar) {
    //         handleShowUpdateAvatar()
    //     }
    // }, [avatar])

    const handleUpdateAvatar = async () => {
        let updateResponse = await patientApi.uploadAvatar(imageUrl)

        if (updateResponse.errCode === 0) {
            toasts.successTopRight('Cập nhật ảnh đại diện thành công')
        }

        patientApi.getPatientInformation(auth.id).then((res) => {
            if (res && res.errCode === 0) {
                setAvatar(res.data.avatar)
            }
        })
    }

    // const handleGetAvatar = async () => {
    //     let updateResponse = await patientApi.uploadAvatar(profile)

    //     let response = await patientApi.getPatientInformation(auth.id).then((res) => {
    //         if (res && res.errCode === 0) {
    //             let base64Image = Buffer.from(res.data.avatar, 'base64').toString()
    //             setAvatar(base64Image)
    //         }
    //     })
    // }

    return (
        // render &&
        <main>
            <section>
                <Header />
                <Navbar />
                <div className='flex py-16 bg-gray-300 mt-60 w-[80%] mx-auto mb:w-[90%] mb:mt-72 mb:mb-10 mb:py-2'>
                    <div className='container mx-auto px-3'>
                        <div className='flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64'>
                            <div className='rounded-full mx-auto'>
                                <input id='avatar' type='file' hidden onChange={(e) => handleShowUpdateAvatar(e)} />

                                <label htmlFor='avatar' className='cursor-pointer'>
                                    {profile?.avatar ? (
                                        <div className='rounded-full mx-auto'>
                                            <img
                                                width={300}
                                                height={300}
                                                alt='Avatar'
                                                src={showAvatar ? showAvatar : avatar}
                                                className='shadow-xl rounded-full h-40 w-40 border-none flex -m-10 max-w-150-px cursor-pointer bg-contain bg-no-repeat p-2 mx-auto'
                                            />
                                        </div>
                                    ) : (
                                        <div className='rounded-full mx-auto'>
                                            <Image
                                                width={300}
                                                height={300}
                                                alt='Avatar'
                                                src={showAvatar ? showAvatar : assets.images.avatar}
                                                className='shadow-xl rounded-full h-40 w-40 border-none flex -m-10 max-w-150-px cursor-pointer bg-contain bg-no-repeat p-2 mx-auto'
                                            />
                                        </div>
                                    )}
                                </label>
                            </div>

                            <button
                                className='w-fit  bg-gray-400 mx-auto mt-16 mb-4 text-lg p-1 rounded-lg shadow-md hover:bg-blue-500 text-white'
                                onClick={handleUpdateAvatar}
                            >
                                Lưu ảnh
                            </button>
                            <div className='mt-1 py-10 border-t border-gray-400 text-center'>
                                <div className='flex flex-wrap justify-center'>
                                    <div className='flex flex-col text-center'>
                                        <div className='uppercase font-semibold text-xl'>Thông tin cá nhân</div>

                                        {profile && (
                                            <div className='text-center mt-3'>
                                                <h5 className='text-4xl font-semibold leading-normal mb-2 text-blueGray-700'>
                                                    {profile?.fullName ? profile.fullName : ''}
                                                </h5>
                                                <div className='text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold uppercase text-gray-400'>
                                                    <i className='fas fa-map-marker-alt mr-2 text-lg'></i>
                                                    {profile?.address ? profile.address : ''}
                                                </div>
                                                <div className='mb-1 text-blueGray-600 text-gray-400'>
                                                    <i className='fas fa-envelope mr-2 text-lg'></i>
                                                    Email: {profile?.email ? profile.email : ''}
                                                </div>
                                                <div className='mb-1 text-blueGray-600 mt-5 text-gray-400'>
                                                    <i className='fa-solid fa-user-tie mr-2 text-lg'></i>
                                                    Số điện thoại: {profile?.phone ? profile.phone : ''}
                                                </div>
                                            </div>
                                        )}

                                        <div className='w-full lg:w-4/12 px-4 lg:order-1 mx-auto'>
                                            <div className='flex flex-row gap-4 justify-center py-2 lg:pt-4 pt-4'>
                                                <div className='p-3 text-center'>
                                                    <div className='text-xl font-bold block uppercase tracking-wide text-gray-600'>
                                                        0
                                                    </div>
                                                    <div className='text-sm text-gray-400 w-20'>Lịch khám</div>
                                                </div>
                                                <div className='p-3 text-center'>
                                                    <div className='text-xl font-bold block uppercase tracking-wide text-gray-600'>
                                                        xx
                                                    </div>
                                                    <div className='text-sm text-gray-400 w-20'>Đánh giá</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
            <ToastContainer />
        </main>
    )
}

export default ProfilePage