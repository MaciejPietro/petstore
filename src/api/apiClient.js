import axios from 'axios'

axios.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response.status === 419) {
            window.location.reload()
        } else if (error.response.status >= 500) {
            console.error('An internal server error occurred.')
        } else if (error.response.status >= 400) {
            console.error('Invalid request. Please check your input.')
        }

        return Promise.reject(error)
    }
)

const axiosClient = axios.create({
    baseURL: 'https://petstore.swagger.io/v2',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

export default axiosClient
