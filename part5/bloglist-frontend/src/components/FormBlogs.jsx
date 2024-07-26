import { useState } from "react"

import blogService from "../services/blogs"
import PropTypes from "prop-types"

const FormBlog = ({ handleMessage, updateBlogs }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSumbit = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create({
        title,
        author,
        url,
      })
      const message = {
        content: `a new blog ${title} by ${author}`,
        severity: "success",
      }
      handleMessage(message)
      updateBlogs(response)
    } catch (error) {
      console.error(error)
      const message = {
        content: "error creating blog",
        severity: "error",
      }
      handleMessage(message)
    }
  }

  return (
    <section>
      <h3> Create NEW</h3>
      <form onSubmit={handleSumbit}>
        <div>
          <label>
            Title:
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
              type="text"
            />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              type="text"
            />
          </label>
        </div>
        <button type="sumbit">create</button>
      </form>
    </section>
  )
}

FormBlog.propTypes = {
  handleMessage: PropTypes.func.isRequired,
  updateBlogs: PropTypes.func.isRequired,
}

export default FormBlog
