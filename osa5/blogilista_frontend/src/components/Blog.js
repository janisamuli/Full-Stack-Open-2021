import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user }) => {

  const [visible, setVisible] = useState(false)



  const toggleVisibility = () => {
    setVisible(!visible)
  }



  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const newLike =  async (event) => {
    event.preventDefault()
    await blogService.update(blog.id, {
      url: blog.url,
      title: blog.title,
      likes: blog.likes + 1,
      author: blog.author,
      user: blog.user.id })

    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  const deleteThisBlog = async (event) => {
    event.preventDefault
    if(window.confirm(`Do you wan't to delete blog ${blog.title} by ${blog.author}?`)===true)
      await blogService.deleteBlog(blog.id)

    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs.filter(a => a.id !== blog.id))
  }

  let deleteButton = null
  if(user === undefined || blog.user.username === user.username) {
    deleteButton =
    <button id="delete-blog-button"onClick= {deleteThisBlog}>delete</button>
  }


  if(visible === false) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button  id="show-blog-button" onClick = {toggleVisibility}>show</button>
        </div>
      </div>
    )
  } else {
    return(
      <div style= {blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick= {toggleVisibility}>close</button>
        </div>
        <p>{blog.url} </p>
        <div>
          <p id="likes">likes: {blog.likes} <button id="blog-like-button" onClick={newLike}>like</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
        {deleteButton}
      </div>

    )
  }
}

export default Blog