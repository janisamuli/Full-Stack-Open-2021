import React, { useState } from 'react'

const BlogForm = ({ newBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const handleNewBlog = (event)  => {
    event.preventDefault()
    newBlog({
      title, author, url, likes

    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')

  }
  return(
    <div>
      <form onSubmit={handleNewBlog}>
title: <input
          id='title'
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)} /><br></br>
author: <input
          id='author'
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)} /><br></br>
url: <input
          id='url'
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)} />
        <button id="create-new-blog-button"type="submit">Create</button>
      </form>



    </div>
  )


}

export default BlogForm