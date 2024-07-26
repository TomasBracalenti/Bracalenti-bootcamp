import Blog from "./Blog"
import PropTypes from 'prop-types'
const Blogs = ({
  blogs,
  username,
  handleLogout,
  handleUpdateBlog,
  handleDeleteBlog,
}) => {

  return (
    <div>
      <section>
        <p>
          {username} logged in
          <button style={{ margin: 10 }} onClick={handleLogout}>
            logout
          </button>
        </p>
      </section>
      {blogs.map((blog) => (
        <Blog
          handleDeleteBlog={handleDeleteBlog}
          handleUpdateBlog={handleUpdateBlog}
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
}


export default Blogs
