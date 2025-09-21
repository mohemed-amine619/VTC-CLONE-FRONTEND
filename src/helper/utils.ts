import { useToast } from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-sugar.css';
import Swal from 'sweetalert2/dist/sweetalert2.js'
const toast = useToast();

export function showError(message: any) {
    toast.error(message, {
        position: 'bottom-right',
        duration: 4000,
        dismissible: true
    })
}
export function successmesage(message: any) {
    toast.success(message, {
        position: 'bottom-right',
        duration: 4000,
        dismissible: true
    })
}

export function getUserData() {
    try {
        const userData: any = localStorage.getItem('userData');
        if (typeof userData != 'object') {
            const parseUserData = JSON.parse(userData);
            return parseUserData;
        }
    } catch (error: any) {
        showError(error?.message)
    }
}
export function setUserData(data: any) {
    localStorage.setItem('userData', JSON.stringify({
        User: data?.user,
        token: data?.token
    }))
}
export function _debounce(fn: any, delay: any) {

    let timer: any
    return function (...args: any) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(args), delay)
    }
}
export function promptUser(message : any) {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: 'Are you sure?',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    resolve(result.isConfirmed)
                }
                reject()
            })
    })
}