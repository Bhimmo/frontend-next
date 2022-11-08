import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_API,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`
    }
})

export async function requisicaoApi(url, method, props) {
    return api({url: url, method: method, data: props})
        .then((res) => {
            return {
                status: res.status,
                data: res.data
            }
        })
        .catch((err) => {
            return {
                status: err.status,
                data: err.data
            }
        })
}