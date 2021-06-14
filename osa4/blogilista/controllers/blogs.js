const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
  

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog
    .find({}).populate('user', { username: 1,name: 1})
    response.json(blogs.map(blogs => blogs.toJSON()))
  })

  blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken) {

      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog( {
       title: body.title,
       author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id


    })
    

    if(!blog.title || !blog.url){
        response.status(400).json({
            'error': 'Bad Request'
        })
    } else{
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
   
    }
  })

  blogsRouter.delete('/:id', async(request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      const blog = await Blog.findById(request.params.id)
      const user = await User.findById(decodedToken.id)

      if(blog.user.toString() === user.id.toString()){

        await Blog.findByIdAndRemove(request.params.id)
          response.status(204).end()
        
      } else {
        return response.status(400).json({error: 'Bad request'})
      }
      

   

  }
  
  
  )

  blogsRouter.put('/:id', async(request,response) => {
const body = request.body

const blog = { 
    title: body.title,
    author: body.author,
url: body.url,
likes: body.likes }

 const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
response.json(updateBlog)


  })



  

module.exports = blogsRouter
