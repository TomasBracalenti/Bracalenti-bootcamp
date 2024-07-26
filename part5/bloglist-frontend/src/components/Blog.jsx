import { useState } from "react"
import PropTypes from 'prop-types'

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog }) => {
  const [expand, setExpand] = useState(false)

  const handleExpand = () => {
    setExpand((prev) => !prev)
  }
  return (
    <article
      style={{ border: "black solid", margin: "5px", paddingTop: "10px" }}
    >
      <div className="titleClass">
        {blog.title} {blog.author}
        <button onClick={handleExpand}>{expand ? "hide" : "view"}</button>
      </div>
      {expand && (
        <>
          <div className="urlClass">
            <a target="blank" href={blog.url}>
              {blog.url}
            </a>
          </div>
          <div className="likesClass">
            <p>Likes {blog.likes}</p>
            <button onClick={() => handleUpdateBlog(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <div>
            <button
              onClick={() => handleDeleteBlog(blog.id)}
              style={{
                background: "#9A9AF7",
                borderRadius: "5px",
                border: "tranparent",
              }}
            >
              delete
            </button>
          </div>
        </>
      )}
    </article>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired
}




export default Blog
