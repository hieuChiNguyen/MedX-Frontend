/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/tw-elements/dist/js/**/*.js'
    ],
    theme: {
        extend: {
            fontSize: {
                8: '8px',
                9: '9px',
                10: '10px',
                11: '11px',
                12: '12px',
                13: '13px',
                14: '14px',
                15: '15px',
                16: '16px',
                17: '17px',
                18: '18px',
                19: '19px',
                20: '20px',
                21: '21px',
                22: '22px'
            },
            width: {
                300: '300px',
                350: '350px',
                400: '400px',
                450: '450px',
                500: '500px',
                550: '550px',
                600: '600px',
                650: '650px',
                700: '700px',
                750: '750px',
                800: '800px',
                850: '850px',
                900: '900px'
            },
            height: {
                200: '200px',
                250: '250px',
                300: '300px',
                350: '350px',
                400: '400px',
                450: '450px',
                500: '500px',
                550: '550px',
                600: '600px',
                650: '650px',
                700: '700px',
                750: '750px',
                800: '800px',
                850: '850px',
                900: '900px'
            },
            gap: {},
            scale: {
                110: '1.1',
                120: '1.2',
                130: '1.3',
                140: '1.4'
            },
            borderWidth: {
                1: '1px',
                3: '3px',
                5: '5px'
            },
            backgroundColor: {
                'blue-email': '#BFD2F8'
            },
            keyframes: {
                appearLeft: {
                    '0%': { transform: 'translateX(-50%)' },
                    '50%': { transform: 'translateX(0%)' }
                }
            },
            animation: {
                appearLeft: 'appearLeft 0.5s linear'
            }
        }
    },
    plugins: []
}
