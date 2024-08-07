import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (tok) => {
  token = `Bearer ${tok}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (newBlog, id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  return response.data
}

const deleteBlog = async (id) => {
  console.log("id", id)
  console.log(`${baseUrl}/${id}`)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, setToken, deleteBlog }