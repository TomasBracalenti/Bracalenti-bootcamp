import { useState, useEffect } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Login from "./components/Login"
import Blogs from "./components/Blogs"
import Message from "./components/message"
import FormBlog from "./components/FormBlogs"
import Togglable from "./components/Togglable"
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState({
    content: "",
    severity: "",
  })

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
    const UserJSON = window.localStorage.getItem("loggedUser")
    const user = JSON.parse(UserJSON)
    setUser(user)
    blogService.setToken(user?.token)
  }, [])

  useEffect(() => {
    if (message.content !== "") {
      setTimeout(() => {
        setMessage({
          content: "",
          severity: "",
        })
      }, 3000)
    }
  }, [message])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      blogService.setToken(user.token)
      console.log("user token", user.token)
      setUser(user)
      setPassword("")
    } catch (error) {
      setMessage({
        content: "Wrong credentials",
        severity: "error",
      })
    }
  }
  console.log(user)

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleUpdateBlog = async (blog) => {
    const updateBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }

    try {
      const response = await blogService.update(updateBlog, blog.id)
      const listBlogs = blogs
        .map((oldBlog) => (oldBlog.id === response.id ? response : oldBlog))
        .sort((a, b) => b.likes - a.likes)
      setBlogs(listBlogs)
    } catch (error) {
      setMessage({
        content: "error updating blog",
        severity: "error",
      })
    }
  }

  const handleDeleteBlog = async (id) => {
    try {
      if (window.confirm("Are you sure to delete the blog?")) {
        await blogService.deleteBlog(id)
        const listBlog = blogs.filter((bl) => bl.id !== id)
        setBlogs(listBlog)
      }
    } catch (error) {
      console.error(error)
      setMessage({
        content: "error deleting blog",
        severity: "error",
      })
    }
  }

  return (
    <div>
      <Message content={message?.content} severity={message?.severity} />
      {user ? (<>
        <h2>blogs</h2>
        <Togglable buttonName="new Blog">
          <FormBlog
          handleMessage={(message) => setMessage(message)}
          updateBlogs={(newBlog) => setBlogs((prev) => [...prev, newBlog])}/>
        </Togglable>
        <Blogs
          handleDeleteBlog={handleDeleteBlog}
          handleUpdateBlog={handleUpdateBlog}
          blogs={blogs}
          username={user.username}
          handleLogout={handleLogout}
        />
      </>
      ) : (
        <>
          <Login
            handleChangeUsername={(e) => setUsername(e.target.value)}
            handleChangePassword={(e) => setPassword(e.target.value)}
            handleSumbitForm={handleLogin}
            username={username}
            password={password}
          />
        </>
      )}
    </div>
  )
}

export default App
