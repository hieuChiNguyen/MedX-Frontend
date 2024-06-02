'use client'
import React, { useState, useEffect } from 'react'
import AdminSideBar from '../../../components/common/admin/AdminSideBar';
import patientApi from '../../../api/patient/PatientApi'
import toasts from '../../../components/common/Toast';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { RoleEnum } from '../../../../utils/enum/role.enum';

const CreatePatientPage = () => {
  const router = useRouter()
  const [input, setInput] = useState({
    email: '',
    fullName: '',
    username: '',
    password: '',
    gender: '',
    birthday:'',
    phone: '',
    address: '',
    role: RoleEnum.PATIENT
  })

  const [birthday, setBirthday] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [selectedWard, setSelectedWard] = useState('')

const genders = [
    { valueEn: 'Male', valueVi: 'Nam' },
    { valueEn: 'Female', valueVi: 'Nữ' },
    { valueEn: 'Others', valueVi: 'Khác' }
];

  const handleInput = (fieldName, value) => {
    setInput({
        ...input,
        [fieldName]: value
    });
  };

  const handleCombineAddress = () => {
      const province = provinces.find(item => item.id === selectedProvince);
      const district = districts.find(item => item.id === selectedDistrict);
      const ward = wards.find(item => item.id === selectedWard);

      const address = `${ward.fullName}, ${district.fullName}, ${province.fullName}`;

      handleInput('address', address);
  }

  const getListProvinces = async () => {
      try {
        const response = await patientApi.getAllProvinces();
        setProvinces(response.data); 
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
  };

  const getListDistricts = async (selectedProvince) => {
      try {
        const response = await patientApi.getAllDistricts(selectedProvince);
        setDistricts(response.data); 
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
  };

  const getListWards = async (selectedDistrict) => {
      try {
        const response = await patientApi.getAllWards(selectedDistrict);
        setWards(response.data); 
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
  };

  useEffect(() => {
      getListProvinces();
  }, []);

  useEffect(() => {
      if (selectedProvince) {
          getListDistricts(selectedProvince);
      }
  }, [selectedProvince]);

  useEffect(() => {
      if (selectedDistrict) {
          getListWards(selectedDistrict);
      }   
  }, [selectedDistrict]);

  const handleKeyDown = async (e) => {
      if (e.key === 'Enter') {
        createNewPatient()
      }
  }

  const createNewPatient = async () => {
      setErrorMessage('')
      if (input.address === '') {
        setErrorMessage('Vui lòng điền đầy đủ thông tin.')
        toasts.errorTopRight('Vui lòng điền đầy đủ thông tin.')
      }

      handleCombineAddress();
      const isValid = Object.values(input).every((value) => value !== '')

      if (!isValid) {
          setErrorMessage('Vui lòng điền đầy đủ thông tin.')
          toasts.errorTopRight('Vui lòng điền đầy đủ thông tin.')
      } else {
          try {
              let response = await patientApi.createNewPatient(input)

              // Fail to create new patient
              if (response.data && response.message !== 'OK') {
                  setErrorMessage(response.data.message)
                  toasts.errorTopRight(response.data.message)
              }

              // Success to create new patient
              if (response.data && response.message === 'OK') {
                  toasts.successTopRight('Tạo mới bệnh nhân thành công.')
                  setTimeout(function () {
                      router.push('/admin/patient')
                  }, 1500)
              }
          } catch (error) {
              console.log(error)
          }
      }
  }

  return (
    <main className='w-screen flex 2xl:mx-auto 2xl:border-x-2 2xl:border-indigo-50'>
      <AdminSideBar />

      <section className='bg-indigo-50/60 w-full py-10 px-3 flex flex-col'>
        <nav className='text-lg flex items-center'>
            <div className=' font-semibold text-xl text-gray-800 flex space-x-4 my-5 mx-auto'>
                <span>Thêm bệnh nhân mới</span>
            </div>
        </nav>

        <div className="grid grid-cols-6 gap-8">
          <div className="col-span-6 xl:col-span-6 mx-40">
            <div className="rounded-sm border bg-white shadow-default mx-auto">
              <div className="p-7 items-center content-center">
                <form action="#">
                  <div className="mb-6 flex flex-col gap-6 sm:flex-row">
                    <div className="w-full">
                      <label
                        className="mb-3 block text-16 font-medium text-blue-600"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <div className="relative flex flex-row gap-10">
                        <input
                          type="email"
                          className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                          name="email"
                          id="email"
                          placeholder="company@gmail.com"
                          value={input.email}
                          onChange={(e) => handleInput('email', e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 flex flex-col gap-6 sm:flex-row">
                    <div className="w-full">
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
                          value={input.fullName}
                          onChange={(e) => handleInput('fullName', e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    </div>

                    <div className="w-full">
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
                        placeholder="0398******"
                        value={input.phone}
                        onChange={(e) => handleInput('phone', e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </div>

                  <div className="mb-6 flex flex-col gap-6 sm:flex-row">
                    <div className="w-full">
                      <label
                        className="mb-3 block text-16 font-medium text-blue-600"
                        htmlFor="username"
                      >
                        Tên đăng nhập
                      </label>
                      <input
                        className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="A Nguyễn"
                        defaultValue={input.username}
                        onChange={(e) => handleInput('username', e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        className="mb-3 block text-16 font-medium text-blue-600"
                        htmlFor="password"
                      >
                        Mật khẩu
                      </label>
                      <div className="relative flex flex-row gap-10">
                        <input
                          className="w-full rounded border bg-blue-50 py-3 px-2 text-black focus:border-blue-600 focus-visible:outline-none"
                          name="password"
                          id="password"
                          placeholder="Nhập mật khẩu"
                          value={input.password}
                          onChange={(e) => handleInput('password', e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 flex flex-col gap-6 sm:flex-row">
                    <div className="w-full">
                      <label
                        className="mb-3 block text-16 font-medium text-blue-600"
                        htmlFor="gender"
                      >
                        Giới tính
                      </label>
                      <select
                          className={`w-full rounded border border-gray-200 py-4 px-2 focus:border-blue-600 focus-visible:outline-none text-black bg-blue-50 ${selectedGender ? 'text-black' : 'text-gray-400'}`}
                          onChange={(e) => {
                              handleInput('gender', e.target.value)
                              setSelectedGender(e.target.value)
                          }}
                      >
                          <option value='gender' selected disabled hidden>
                              Giới tính
                          </option>
                          {genders?.map((gender) => (
                              <option key={gender.valueEn} value={gender.valueEn} id='gender'>
                                  {gender.valueVi}
                              </option>
                          ))}
                      </select>        
                    </div>

                    <div className="w-full">
                      <label
                        className="mb-3 block text-16 font-medium text-blue-600"
                        htmlFor="birthday"
                      >
                        Ngày sinh
                      </label>
                      <DatePicker
                          placeholderText='Ngày sinh (dd-MM-yyyy)'
                          selected={birthday}
                          onChange={(date) => {
                              setBirthday(date)
                              handleInput('birthday', format(date, 'yyyy-MM-dd'))
                          }}
                          onKeyDown={handleKeyDown}
                          dateFormat="dd-MM-yyyy"
                          showPopperArrow={true}
                          className='w-400 rounded border border-gray-200 py-3.5 px-2 focus:border-blue-600 focus-visible:outline-none text-black bg-blue-50'
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      className="mb-3 block text-16 font-medium text-blue-600"
                      htmlFor="address"
                    >
                      Địa chỉ
                    </label>
                    <select
                        className={`w-full rounded-lg border-gray-200 py-3 px-2 border-1 bg-blue-50 my-2 focus:border-blue-600 focus-visible:outline-none ${selectedProvince ? 'text-black' : 'text-gray-400'}`}
                        onChange={(e) => {
                            setSelectedProvince(e.target.value)
                        }}
                    >
                        <option value='province' selected disabled hidden>
                            Tỉnh / Thành phố
                        </option>
                        {provinces?.map((province) => (
                            <option key={province.id} value={province.id}>
                                {province.fullName}
                            </option>
                        ))}
                    </select>

                    <select
                        className={`w-full rounded-lg border-gray-200 py-3 px-2 border-1 bg-blue-50 my-2 focus:border-blue-600 focus-visible:outline-none ${selectedDistrict ? 'text-black' : 'text-gray-400'}`}
                        onChange={(e) => {
                            setSelectedDistrict(e.target.value)
                        }}
                        disabled={!selectedProvince}
                    >
                        <option defaultValue='' selected disabled hidden>
                            Quận / Huyện
                        </option>
                        {districts?.map((district) => (
                            <option key={district.id} value={district.id}>
                                {district.fullName}
                            </option>
                        ))}
                    </select>

                    <select
                        className={`w-full rounded-lg border-gray-200 py-3 px-2 border-1 bg-blue-50 my-2 focus:border-blue-600 focus-visible:outline-none ${selectedWard ? 'text-black' : 'text-gray-400'}`}
                        onChange={(e) => {
                            setSelectedWard(e.target.value)
                        }}
                        disabled={!selectedDistrict}
                    >
                        <option defaultValue='' selected disabled hidden>
                            Xã / Phường
                        </option>
                        {wards?.map((ward) => (
                            <option key={ward.id} value={ward.id}>
                                {ward.fullName}
                            </option>
                        ))}
                    </select>
                  </div>

                  {/* Error Notification */}
                  <div className='w-full text-red-600 text-center text-sm'>{errorMessage}</div>

                  <div className="flex justify-end gap-5">
                    <button
                      type='button'
                      className="flex justify-center rounded bg-blue-400 py-2 px-6 font-medium text-gray hover:bg-opacity-80"
                      onClick={createNewPatient}
                    >
                      Tạo mới
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
};

export default CreatePatientPage;
