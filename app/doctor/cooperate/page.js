'use client'
import Footer from '@/app/components/common/Footer'
import Header from '@/app/components/common/Header'
import Navbar from '@/app/components/common/Navbar'
import DoctorCooperateForm from '@/app/components/doctor/DoctorCooperateForm'

const DoctorRegister = () => {
    return (
        <main>
            <Header />
            <Navbar />

            <section className='my-5'>
                <DoctorCooperateForm />
            </section>

            <Footer />
        </main>
    )
}

export default DoctorRegister
