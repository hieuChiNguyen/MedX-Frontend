// 'use client'
// import React, { useState, useEffect } from 'react'
// import Header from "../../components/common/Header"
// import Navbar from "../../components/common/Navbar"
// import doctorApi from '../../api/doctor/DoctorApi'
// import Image from 'next/image'

// const SpecialtyDetailPage = ({ params }) => {
//   const specialtyId = params.specialtyId
//   console.log('check specialtyId', specialtyId)
//   const [doctors, setDoctors] = useState([])
//   const [specialty, setSpecialty] = useState('')

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await doctorApi.getListDoctorsBySpecialty(specialtyId)
//         setDoctors(response.data)
//       } catch (error) {
//         console.error('Failed to fetch doctors:', error)
//       }
//     };
//     fetchDoctors();
//   }, [specialtyId]);

//   return (
//     <main>
//       <Header />
//       <Navbar />
//       <section className="container mx-auto mt-10">
//         <h1 className="text-3xl font-semibold text-center mb-10">{specialtyName}</h1>
//         <div className="grid grid-cols-1 gap-6">
//           {doctors && doctors.map((doctor) => (
//             <div key={doctor.id} className="flex bg-white shadow-md rounded-lg p-6">
//               <div className="flex-shrink-0">
//                 <Image className="h-24 w-24 rounded-full" src={doctor.avatarUrl} alt={doctor.name} />
//               </div>
//               <div className="ml-6">
//                 <h2 className="text-xl font-semibold">{doctor.name}</h2>
//                 <p className="text-gray-600">{doctor.specialty}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default SpecialtyDetailPage;
