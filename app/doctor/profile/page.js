'use client'
import React, { useState, useEffect } from 'react'
import assets from '../../../assets'
import doctorApi from '../../api/doctor/DoctorApi'
import Image from 'next/image'
import toasts from '../../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../../components/common/Header'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../../firebase/firebase'
import patientApi from '../../api/patient/PatientApi'
// import markdownItTaskLists from 'markdown-it-task-lists';

const DoctorInformationPage = () => {
    const router = useRouter()
    const auth = useSelector(state => state.auth);
    const [doctor, setDoctor] = useState(null);
    const [showAvatar, setShowAvatar] = useState(null)
    const [imageUrl, setImageUrl]= useState({
        id: auth.id,
        avatar: ''
    })

    const [doctorContent, setDoctorContent] = useState({
        contentHTML: '',
        contentMarkdown: '',
        specialtyId: '',
        doctorId: '',
    })

    // Register plugins if required
    // MdEditor.use(YOUR_PLUGINS_HERE);

    // Initialize a markdown parser
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    // Initialize markdown-it with task list plugin
    // const mdParser = new MarkdownIt().use(markdownItTaskLists);

    // Finish!
    function handleEditorChange({ html, text }) {
        // console.log('html::', html)
        // console.log('text::', text)
        setDoctorContent({
            contentHTML: html,
            contentMarkdown: text,
            doctorId: auth.doctorId,
            specialtyId: doctor.doctorSpecialty.id,
        })
        // console.log('check doctor content::', doctorContent);
    }

    useEffect(() => {
        const fetchDoctorDetail = async () => {
            try {
                const response = await doctorApi.getDoctorByAdmin(auth?.doctorId);
                setDoctor(response.data);
            } catch (error) {
                console.error('Error fetching doctor detail:', error);
            }
        };

        if (auth?.doctorId) {
            fetchDoctorDetail();  
        }    
    }, [auth?.doctorId]);

    const saveDoctorContentMarkdown = async() => {
        try {
            let response = await doctorApi.createDoctorDetailContent(doctorContent)

            // Fail to create new markdown
            if (response.errCode !== 0) {
                toasts.errorTopRight(response.message)
            }

            // Success to create new markdown
            if (response.data && response.errCode === 0) {
                toasts.successTopRight('Thêm thông tin bác sĩ thành công.')
                setTimeout(function () {
                    router.push('/doctor')
                }, 1500)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleShowUpdateAvatar = async (e) => {
        if (typeof window !== 'undefined') { // Check if running in client
            let avatarImage = e.target.files[0]
            if (avatarImage) {
                let objectUrl = URL.createObjectURL(avatarImage)
                setShowAvatar(objectUrl)
                const storageRef = ref(storage, `doctors/${auth.id}_${avatarImage.name}`)
                await uploadBytes(storageRef, avatarImage)
                const avatarURL = await getDownloadURL(storageRef)
                setImageUrl({...imageUrl, avatar : avatarURL})
            }
        }
    }

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

    return (
        <main>
            <Header />
            <section className='bg-indigo-50/60 w-[80%] py-5 px-3 mx-auto'>
                <nav className='text-lg flex items-center justify-between content-center '>
                    <div className=' font-semibold text-xl text-gray-800 flex space-x-4 items-center my-5'>
                        <p>Thông tin bác sĩ</p>
                        {
                            auth?.doctorStatus === 'Active' ? (
                                <p className='text-green-500 font-light text-14'>
                                    <FontAwesomeIcon icon={faCheckCircle} className='text-green-500 mx-1' />
                                    Đã kích hoạt
                                </p>
                            ) : (
                                <p className='text-red-500 font-light text-14'>
                                    <FontAwesomeIcon icon={faCancel} className='text-red-500 mx-1' />
                                    Chưa kích hoạt
                                </p>
                                // <i class="fa-solid fa-circle-xmark"></i>
                            )
                        }
                        
                    </div>
                </nav>

                <div className="grid grid-cols-5 gap-8">
                    <div className="col-span-5 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default">
                            <div className="p-7">
                                <form action="#">
                                    <div className="mb-6 flex flex-col gap-6 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-16 font-medium text-blue-600"
                                            htmlFor="fullName"
                                        >
                                            Họ và tên bác sĩ
                                        </label>
                                        <div className="relative flex flex-row gap-10">
                                            <input
                                                className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                                                type="text"
                                                name="fullName"
                                                id="fullName"
                                                placeholder="Nguyễn Văn A"
                                                value={doctor?.doctorInformation?.fullName}
                                                disabled
                                            />
                                        </div>
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-16 font-medium text-blue-600"
                                            htmlFor="phone"
                                        >
                                            Số điện thoại
                                        </label>
                                        <input
                                            className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            placeholder="+84 *** *** ***"
                                            defaultValue={doctor?.doctorInformation?.phone}
                                            disabled
                                        />
                                        </div>
                                    </div>

                                    <div className="mb-6 flex flex-col gap-6 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-16 font-medium text-blue-600"
                                                htmlFor="fullName"
                                            >
                                                Căn cước công dân
                                            </label>
                                            <div className="relative flex flex-row gap-10">
                                                <input
                                                className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                                                name="fullName"
                                                id="fullName"
                                                placeholder="001202002***"
                                                defaultValue={doctor?.citizenCard}
                                                disabled
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-16 font-medium text-blue-600"
                                                htmlFor="specialty"
                                            >
                                                Chuyên khoa
                                            </label>
                                            <input
                                                className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                                                type="text"
                                                name="specialty"
                                                id="specialty"
                                                placeholder="Chọn chuyên khoa"
                                                defaultValue={doctor?.doctorSpecialty?.nameVi}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label
                                            className="mb-3 block text-16 font-medium text-blue-600"
                                            htmlFor="email"
                                        >
                                            Email liên hệ
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="name@company.com"
                                                defaultValue={doctor?.doctorInformation?.email}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label
                                        className="my-3 block text-16 font-medium text-blue-600"
                                        htmlFor="address"
                                        >
                                        Địa chỉ
                                        </label>
                                        <input
                                        className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="Xã/Phường, Quận/Huyện, Tỉnh/Thành phố"
                                        defaultValue={doctor?.doctorInformation?.address}
                                        disabled
                                        />
                                    </div>

                                    {/* <div className="mb-6">
                                        <label
                                        className="mb-3 block text-16 font-medium text-blue-600"
                                        htmlFor="description"
                                        >
                                        Chi tiết bác sĩ
                                        </label>
                                        <div className="relative">
                                        <textarea
                                            className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                                            name="description"
                                            id="description"
                                            rows={6}
                                            placeholder="Sơ lược về bác sĩ"
                                            defaultValue={doctor?.description}
                                        ></textarea>
                                        </div>
                                    </div> */}

                                    {/* <div className="flex justify-end gap-5">
                                        <button
                                            className="flex justify-center rounded bg-blue-400 py-2 px-6 font-medium text-gray hover:bg-opacity-80"
                                            type="submit"
                                        >
                                            Sửa
                                        </button>
                                    </div> */}
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-5 xl:col-span-2">
                        <div className="rounded-sm border border-stroke bg-white shadow-default">
                            <div className="border-b border-stroke py-4 px-7">
                                <h3 className="font-medium text-black">
                                Ảnh đại diện
                                </h3>
                            </div>

                            <div className="p-7">
                                <form action="#">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="h-14 w-14">
                                            {doctor?.doctorInformation?.avatar ? (
                                                <div className='rounded-full mx-auto'>
                                                    <img
                                                        width={300}
                                                        height={300}
                                                        alt='Avatar Doctor'
                                                        src={showAvatar? showAvatar : doctor?.doctorInformation?.avatar}
                                                        className='shadow-lg rounded-full h-16 w-16 border-none flex max-w-150-px bg-contain bg-no-repeat p-2 mx-auto'
                                                    />
                                                </div>
                                            ) : (
                                                <div className='rounded-full mx-auto'>
                                                    <Image
                                                        width={300}
                                                        height={300}
                                                        alt='Avatar Doctor'
                                                        src={showAvatar? showAvatar : assets.images.avatar}
                                                        className='shadow-lg rounded-full h-16 w-16 border-none flex max-w-150-px bg-contain bg-no-repeat p-2 mx-auto'
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <span className="mb-1.5 text-black">
                                                {doctor?.position} {doctor?.doctorInformation?.fullName}
                                            </span>
                                            <span className="flex flex-row gap-3">
                                                {/* <button className="text-sm hover:text-blue-600 hover:font-semibold font-light text-gray-500">
                                                Xóa ảnh
                                                </button> */}
                                                {/* <button className="text-sm hover:text-blue-600 hover:font-semibold font-light text-gray-500">
                                                Cập nhật
                                                </button> */}
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 sm:py-7"
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleShowUpdateAvatar(e)}
                                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                        />
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full border bg-white">
                                            <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                                fill="#3C50E0"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                                fill="#3C50E0"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                                fill="#3C50E0"
                                            />
                                            </svg>
                                        </span>
                                        <p>
                                            <span className="text-blue-600">Chọn ảnh</span> để tải lên
                                        </p>
                                        <p className="mt-1">PNG, JPG or JPEG</p>
                                        {/* <p>(kích thước tối đa, 800 X 800px)</p> */}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4 my-5">
                                        <button
                                            className="flex justify-center rounded bg-blue-400 py-2 px-6 font-medium text-gray hover:bg-opacity-80"
                                            // type="submit"
                                            onClick={handleUpdateAvatar}
                                        >
                                            Lưu ảnh
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>     
                    </div>   
                </div>

                <div className='w-full mx-auto my-10 flex flex-col'>
                    <p className='p-1 my-3 text-lg font-semibold text-gray-700'>Bác sĩ tạo và chỉnh sửa chi tiết thông tin cá nhân</p>
                    <MdEditor 
                        style={{ height: '500px'}}
                        renderHTML={text => mdParser.render(text)} 
                        onChange={handleEditorChange} 
                    />
                    <button 
                        className='my-5 p-3 w-fit rounded-lg bg-blue-400 hover:bg-blue-300'
                        onClick={saveDoctorContentMarkdown}
                    >                                                     
                        Lưu thông tin
                    </button>
                </div>
            </section>
            <ToastContainer />
        </main>
    );
};

export default DoctorInformationPage;
