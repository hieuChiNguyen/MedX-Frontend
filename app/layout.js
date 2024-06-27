'use client'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import './globals.css'
// import '../assets/font_awesome_6_pro/css/all.min.css'

// export const metadata = {
//     title: 'MedX',
//     description: 'Generated by create next app'
// }

export default function RootLayout({ children }) {
    return (
        <Provider store={store}>
                <html lang='en'>
                    <title>MedX</title>
                    <body suppressHydrationWarning={true}>
                        <main>{children}</main>
                    </body>
                </html> 
        </Provider>
    )
}
