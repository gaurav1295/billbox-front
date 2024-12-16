import axios from 'axios'

const { API_BASE_URL } = process.env

/* Axios client instance for API interactions, this set up ensures the
base url for our api gateway will be used and also that the session cookie
will be sent on these requests */
const axiosApiClient = axios.create({
  baseURL: `${API_BASE_URL}`,
  withCredentials: true,
})

/* The client instance is returned so interceptors,
mocks or other custom configs can be made over it */
export default axiosApiClient
