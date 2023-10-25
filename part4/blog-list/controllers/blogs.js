const blogRoutes = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')





blogRoutes.get('/', async(request, response) => {      
    const blogs = await Blog.find({}).populate('user', {username:1 , name:1})
    response.json(blogs)
      
  })
  
  blogRoutes.post('/', async (request, response) => {    
    const body = request.body               
    const user = request.user
    if(!request.token || !request.decodedToken.id){
      return response.status(401).json({error: 'token missing or invalid'})
    }  
    if(!body.title || !body.url){
      response.status(400)
    }
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: request.decodedToken.id
    })       

    const savedBlog = await blog.save()          
    user.blog = user.blog.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)  
  })
  

  blogRoutes.delete('/:id', async (request, response) => {        
    const user = request.user
    
    if(!request.token || !request.decodedToken.id){
      return response.status(401).json({error: 'token missing or invalid'})
    }
    if(user.equals(request.decodedToken.id)){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()      
    }else{
      return response.status(403).json({error: 'Only the owner can delete their blogs'})
    }
    
  })

  blogRoutes.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if(blog){
      response.json(blog)
    }
  })

  blogRoutes.put('/:id', async (request, response) => {
    const body = request.body    
    const blog = {
      author: body.author,
      title: body.title,
      likes: body.likes,
      url: body.url
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
    response.json(updatedBlog)
  })

module.exports = blogRoutes