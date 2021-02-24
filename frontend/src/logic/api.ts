import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const signal = axios.CancelToken.source()

export default api
