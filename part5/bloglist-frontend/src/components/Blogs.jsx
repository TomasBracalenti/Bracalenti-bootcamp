import Blog from "./Blog";
import FormBlog from "./FormBlogs";
import Togglable from "./Togglable";
const Blogs = ({ blogs, username, handleLogout, handleMessage, updateBlogs,handleUpdateBlog,handleDeleteBlog }) => {

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonName = "new Blog" >
      <FormBlog
      handleMessage ={handleMessage}
      updateBlogs={updateBlogs}
      />
      </Togglable>

      <div>
        <p>
          {username} logged in
          <button style={{ margin: 10 }} onClick={handleLogout}>
            logout
          </button>
        </p>
      </div>
      {blogs.map((blog) => (
        <Blog 
        handleDeleteBlog = {handleDeleteBlog}
        handleUpdateBlog ={handleUpdateBlog}
        key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
