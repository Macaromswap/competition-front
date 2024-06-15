import axios from 'axios'
const baseURL = 'http://47.243.101.119:3101/'
    // const baseURL = process.env.REACT_APP_BASE_URL
const request = axios.create({
    baseURL,
    timeout: 20000,
})

request.interceptors.request.use(
    config => config,
    err => {
        return Promise.reject(err)
    }
)

request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        console.log('请求错误', error.message)
            // return Promise.reject(error)
    }
)

export default request