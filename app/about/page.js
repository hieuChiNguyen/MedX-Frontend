'use client'

import Footer from "../components/common/Footer"
import Header from "../components/common/Header"
import Navbar from "../components/common/Navbar"
import assets from "../../assets"
import Image from "next/image"

const AboutPage = () => {
    return (
        <main>
            <Header />
            <Navbar />
            <section className="py-16 bg-blue-100">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold text-blue-800 mb-4">Về MedX chúng tôi</h1>
                    <p className="text-lg text-blue-700">
                        MedX là nền tảng đặt lịch trực tuyến hàng đầu, mang lại sự tiện lợi và hiệu quả trong việc chăm sóc sức khỏe của bạn.
                    </p>
                </div>
            </section>
            <section className="py-16">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                        <Image 
                            src={assets.images.posterHome}
                            alt="About"
                            className="rounded-lg shadow-lg w-full"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-blue-800 mb-4">Sứ mệnh của chúng tôi</h2>
                        <p className="text-lg text-gray-700 mb-4">
                            Với sứ mệnh mang lại dịch vụ chăm sóc sức khỏe tại nhà tốt nhất, MedX không ngừng nỗ lực để cải thiện trải nghiệm của người dùng. Chúng tôi luôn đặt khách hàng lên hàng đầu và cam kết mang đến dịch vụ uy tín, chất lượng.
                        </p>
                        <p className="text-lg text-gray-700 mb-4">
                            Đội ngũ bác sĩ của chúng tôi được tuyển chọn kỹ lưỡng, có chuyên môn cao và tận tâm với nghề. Chúng tôi tin rằng sức khỏe của bạn là niềm vui của chúng tôi.
                        </p>
                        <p className="text-lg text-gray-700">
                            Hãy cùng MedX khám phá những tiện ích vượt trội và trải nghiệm dịch vụ chăm sóc sức khỏe tốt nhất.
                        </p>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-blue-50">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-blue-800 mb-4">Lợi ích khi sử dụng MedX</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <i className="fa-solid fa-user-doctor text-blue-500 text-4xl mb-4"></i>
                            <h3 className="text-xl font-semibold text-blue-800 mb-2">Đội ngũ bác sĩ chuyên nghiệp</h3>
                            <p className="text-gray-700">
                                Đội ngũ bác sĩ có chuyên môn cao, giàu kinh nghiệm và tận tâm với nghề.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <i className="fa-solid fa-calendar-check text-blue-500 text-4xl mb-4"></i>
                            <h3 className="text-xl font-semibold text-blue-800 mb-2">Đặt lịch nhanh chóng</h3>
                            <p className="text-gray-700">
                                Dễ dàng đặt lịch khám trực tuyến mọi lúc, mọi nơi chỉ với vài bước đơn giản.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <i className="fa-solid fa-shield-virus text-blue-500 text-4xl mb-4"></i>
                            <h3 className="text-xl font-semibold text-blue-800 mb-2">Bảo mật thông tin</h3>
                            <p className="text-gray-700">
                                Thông tin của bạn được bảo mật tuyệt đối, giúp bạn yên tâm sử dụng dịch vụ.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}

export default AboutPage