import axios from "axios";
import { useEffect, useState } from "react";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_API
})

export default function useFetch(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        api.get(url)
            .then(res => setData(res.data))
            .catch(res => setError(true))
            .finally(() => setIsLoading(false))
    }, [url])
    return { data, isLoading, error, setError}
}

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
                status: err.response.status,
                message: err.message
            }
        })
}