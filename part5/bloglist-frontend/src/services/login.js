import axios from 'axios'

const baseUrl = '/api/login'

const login = async (credetnials) =>{
    const response = await axios.post(baseUrl, credetnials)
    return response.data
}

export default {login}
