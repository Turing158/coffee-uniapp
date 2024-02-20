import axios from 'axios'
const baseurl =  'http://localhost:8080'
export const request = axios.create({
	baseURL:baseurl,
	timeout:5000,
	})
export default request
export { baseurl }