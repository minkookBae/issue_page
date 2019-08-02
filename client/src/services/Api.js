import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: process.env.API_URL || 'http://211.252.86.170:8081/'
  })
}
