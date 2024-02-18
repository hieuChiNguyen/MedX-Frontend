import Link from 'next/link'

const Navbar = () => {
    const tabs = [
        {
            link: '/',
            name: 'Trang chủ'
        },
        {
            link: '/home/about',
            name: 'Về chúng tôi'
        },
        {
            link: '/home/services',
            name: 'Dịch vụ'
        },
        {
            link: '/home/doctors',
            name: 'Bác sĩ'
        },
        {
            link: '/home/specialties',
            name: 'Chuyên khoa'
        },
        {
            link: '/home/news',
            name: 'Bản tin'
        }
    ]

    return (
        <nav className='flex flex-row justify-around bg-blue-800 py-5 text-white text-center'>
            <div className='flex flex-row justify-between gap-10'>
                {tabs.map((tab, index) => (
                    <Link href={tab.link} key={index} className='cursor-pointer text-lg hover:text-orange-500'>
                        {tab.name}
                    </Link>
                ))}
            </div>

            <div className='flex flex-row gap-10 '>
                <i className='fa-regular fa-magnifying-glass' style={{ fontSize: '20px' }}></i>
                <Link href='/patient-info'>
                    <button type='button' className='bg-blue-400 px-8 rounded-2xl py-1 hover:bg-red-400'>
                        Đặt khám
                    </button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
