import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NURSING_DIAGNOSTIC_API_URL,
})

export default api
