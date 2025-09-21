import { App } from "../api/api"
import { router } from "../router";
import { getUserData, showError } from "./utils";

function getHeaders() {
    const headers: any = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    const userData = getUserData()
    if (!userData || typeof headers?.authorization !== 'undefined') {
        return headers
    } else {
        headers['Authorization'] = `Bearer ${userData.token}`;
        return headers
    }

}

export function postData(endpoint: any, input: any) {
    const headers = getHeaders();
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(App.apibaseUrl + endpoint, {
                headers: headers,
                method: 'post',
                body: JSON.stringify(input)
            })
            const data = await res.json();
            handleHttpError(data, reject, resolve)
        } catch (error: any) {
            reject(error?.errors)
        }
    })
}

export function PutData(endpoint: any, input:any) {
    const headers = getHeaders();
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(App.apibaseUrl + endpoint, {
                headers: headers,
                method: 'put',
                body: JSON.stringify(input)
            })
            const data = await res.json();
            handleHttpError(data, reject, resolve)
        } catch (error: any) {
            reject(error?.errors)
        }
    })
}
export function DeleteData(endpoint: any, input: any) {
    const headers = getHeaders();
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(App.apibaseUrl + endpoint, {
                headers: headers,
                method: 'delete',
                body: JSON.stringify(input)
            })
            const data = await res.json();
            handleHttpError(data, reject, resolve)
        } catch (error: any) {
            reject(error?.errors)
        }
    })
}
export default function getData(endpoint: any) {
    const headers = getHeaders();
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(App.apibaseUrl + endpoint, {
                headers: headers,
                method: 'get'
            })
            const data = await res.json();
            handleHttpError(data, reject, resolve)
        } catch (error: any) {
            reject(error?.errors)
        }
    })
}
function handleHttpError(data: any, reject: any, resolve: any) {
    if (typeof data?.errors !== 'undefined') {
        const errors = Array.isArray(data?.errors)
            ? data?.errors
            : Object.values(data?.errors)
        reject(errors)

    }
    else if (data?.message == "Unauthenticated.") {
        router.push('/login')
        showError(data?.message)
    } else {
        resolve(data);

    }
}