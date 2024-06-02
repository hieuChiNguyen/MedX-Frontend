'use client'
import React, { useState, useEffect } from 'react'
import assets from '../../../../assets'
import AdminSideBar from '../../../components/common/admin/AdminSideBar';
import doctorApi from '../../../api/doctor/DoctorApi'
import Image from 'next/image';
import toasts from '../../../components/common/Toast';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import DoctorStatusEnum from '../../../../utils/enum/doctor_status.enum'

const DoctorInformationPage = ({params}) => {
  const doctorId = params.doctorId;
  const router = useRouter()
  const [doctor, setDoctor] = useState(null);
  const [accountStatus, setAccountStatus] = useState('')

  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        const response = await doctorApi.getDoctorByAdmin(doctorId);
        setDoctor(response.data);
        setAccountStatus(response.data.status)
      } catch (error) {
        console.error('Error fetching doctor detail:', error);
      }
    };

    if (doctorId) {
      fetchDoctorDetail();
    }
  }, [doctorId]);

  const activateDoctor = async (doctorId) => {
    try {
      const response = await doctorApi.activateDoctorAccount(doctorId);
      if (response.data) {
        if (accountStatus === DoctorStatusEnum.INACTIVE) {
          toasts.successTopRight('Kích hoạt tài khoản bác sĩ thành công.')
        } else {
          toasts.successTopRight('Vô hiệu tài khoản bác sĩ thành công.')
        }
        setTimeout(function () {
          router.push('/admin/doctor')
        }, 2000)
      } else {
        toasts.errorTopRight('Kích hoạt bác sĩ thất bại.')
      }
      
    } catch (error) {
      console.error('Error activate doctor:', error);
    }
  }

  return (
    <main className='w-screen flex 2xl:mx-auto 2xl:border-x-2 2xl:border-indigo-50'>
      <AdminSideBar />

      <section className='bg-indigo-50/60 w-full py-10 px-3 sm:px-10'>
        <nav className='text-lg flex items-center justify-between content-center '>
            <div className=' font-semibold text-xl text-gray-800 flex space-x-4 items-center my-5'>
                <span>Thông tin bác sĩ</span>
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
                        Họ và tên
                      </label>
                      <div className="relative flex flex-row gap-10">
                        <input
                          className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                          type="text"
                          name="fullName"
                          id="fullName"
                          placeholder="Nguyễn Văn A"
                          value={doctor?.doctorInformation?.fullName}
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
                          placeholder=""
                          defaultValue={doctor?.citizenCard}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-16 font-medium text-blue-600"
                        htmlFor="phone"
                      >
                        Chuyên khoa
                      </label>
                      <input
                        className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="+84 *** *** ***"
                        defaultValue={doctor?.doctorSpecialty?.nameVi}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      className="mb-3 block text-16 font-medium text-blue-600"
                      htmlFor="emailAddress"
                    >
                      Email liên hệ
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        placeholder="name@company.com"
                        defaultValue={doctor?.doctorInformation?.email}
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
                      defaultValue={doctor?.doctorInformation?.fullName}
                    />
                  </div>

                  <div className="mb-6">
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
                  </div>

                  <div className="flex justify-end gap-5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:bg-gray-100"
                      type="submit"
                    >
                      Sửa
                    </button>
                    <button
                      className="flex justify-center rounded bg-blue-400 py-2 px-6 font-medium text-gray hover:bg-opacity-80"
                      type="submit"
                    >
                      Lưu
                    </button>
                  </div>
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
                      <Image src={assets.images.avatar} alt="Avatar" className='rounded-full'/>
                    </div>

                    <div>
                      <span className="mb-1.5 text-black">
                        {doctor?.position} {doctor?.doctorInformation?.fullName}
                      </span>
                      <span className="flex flex-row gap-3">
                        <button className="text-sm hover:text-blue-600 hover:font-semibold font-light text-gray-500">
                          Xóa ảnh
                        </button>
                        <button className="text-sm hover:text-blue-600 hover:font-semibold font-light text-gray-500">
                          Cập nhật
                        </button>
                      </span>
                    </div>
                  </div>

                  <div
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 sm:py-7"
                  >
                    <input
                      type="file"
                      accept="image/*"
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
                      <p>(kích thước tối đa, 800 X 800px)</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 my-5">
                    <button
                      className="flex justify-center rounded bg-blue-400 py-2 px-6 font-medium text-gray hover:bg-opacity-80"
                      type="submit"
                    >
                      Lưu ảnh
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {
              (doctor?.status === 'Inactive') ? (
                <div className='flex mx-auto my-10 items-center flex-col gap-2'>
                  <p className='text-red-500 font-light text-14'>* Xác nhận danh tính trước khi kích hoạt tài khoản</p>
                  <button
                    className="rounded-2xl bg-blue-400 py-3 px-6 font-medium hover:bg-opacity-80 w-fit"
                    onClick={() => activateDoctor(doctorId)}
                  >
                    Kích hoạt tài khoản bác sĩ
                  </button>
                </div>
              ) : (
                <div className='flex mx-auto my-10 items-center flex-col gap-2'>
                  <p className='text-green-500 font-light text-14'>
                    <FontAwesomeIcon icon={faCheckCircle} className='text-green-500 mx-1' />
                    Tài khoản đã được kích hoạt</p>
                  <button
                    className="rounded-2xl bg-blue-400 py-3 px-6 font-medium hover:bg-opacity-80 w-fit"
                    onClick={() => activateDoctor(doctorId)}
                  >
                    Vô hiệu tài khoản bác sĩ
                  </button>
                </div>
              )
            }
          </div>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
};

export default DoctorInformationPage;
