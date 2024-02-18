import { toast } from 'react-toastify'

const toasts = {
    successTopCenter: (message) => {
        toast.success(message, {
            toastId: 'success-center',
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        })
    },
    successTopRight: (message) => {
        toast.success(message, {
            toastId: 'success-right',
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        })
    },
    errorTopCenter: (message) => {
        toast.error(message, {
            toastId: 'error-center',
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        })
    },
    errorTopRight: (message) => {
        toast.error(message, {
            toastId: 'error-right',
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        })
    }
}

export default toasts
