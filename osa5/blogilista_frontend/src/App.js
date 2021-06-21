import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import Togglable from './components/Togglable'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [errorNotification,setErrorNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorNotification('wrong username or password')
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorNotification(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const newBlog = async (addBlog) => {
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(await blogService.create(addBlog)))
    setNotification(`A new blog ${addBlog.title} by ${addBlog.author} added.`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const loginForm = () => {
    return (
      <div>

        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}/>
      </div>
    )
  }

  const logout = () => {
    window.localStorage.clear()
    window.location.reload()

  }




  return (
    <div>
      <ErrorNotification message={errorNotification} />
      <Notification message= {notification} />
      <h1>Log in to application</h1>

      {user === null ?
        loginForm() :
        <div id="main-div">
          <p>{user.name} logged in  </p>
          <button onClick={logout}>logout</button>

          <h2>blogs</h2>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm newBlog={newBlog} />
          </Togglable>
          <ul> {blogs
            .sort((larger,smaller) => smaller.likes - larger.likes)
            .map(blog =>
              <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user= {user} />
            )}
          </ul>
        </div>
      }
    </div>


  )
}

export default App