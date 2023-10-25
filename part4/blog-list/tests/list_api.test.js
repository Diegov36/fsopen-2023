const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        id: '153438f406792b9a40f9c359',
        title: "test blog",
        author:"Diego",
        url: "test.com",
        likes: 200
    },
    {
        title: "test2",
        author: "Diegoo",
        url: "test2.com",
        likes: 100
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

describe('GET test', () => {
    test('Blogs returned as JSON', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })
      
      test('Obtaining the two blogs in MongoDB', async() => {
          const response = await api.get('/api/blogs')    
          expect(response.body).toHaveLength(2)
      })
      
      test('Verifying id name property', async() => {
          const response = await api.get('/api/blogs')    
          expect(response.body[0].id).toBeDefined()
      })
      
      test('Obtaining a specific blog', async() => {      
        const blogId = '153438f406792b9a40f9c359'  
        await api.get(`/api/blogs/${blogId}`).expect(200).expect('Content-Type', /application\/json/)        
      })
})

describe('POST test', () => {
    test('Adding a new blog', async() => {
        const newBlog = {
            title: "Added by POST",
            author: "Diego",
            url: "url.com",
            likes: 1000
        }
    
        await api.post('/api/blogs').send(newBlog).expect(200).expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')    
        const titles = response.body.map(b => b.title)
    
        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(titles).toContain("Added by POST")
    })
    
    test('Adding a blog without likes property', async () =>{
        const newBlog = {
            title: "Blog without likes",
            author: "Diego",
            url: "url2.com"
        }
    
        await api.post('/api/blogs').send(newBlog).expect(200).expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        const lastEntry = response.body[initialBlogs.length]
        expect(lastEntry.likes).toBe(0)
    
    })
    
    test('Adding a blog without title/url', async () => {
        const newBlog = {
            author: "Diego",
            likes : 100
        }
        await api.post('/api/blogs').send(newBlog).expect(400)
    })

    test('Adding a POST without token' , async () => {
        const newBlog = {
            title: "Added by POST",
            author: "Diego",
            url: "url.com",
            likes: 1000
        }
    })
})

describe('DELETE tests', () => {
    test('Deleting a blog' , async () => {
        const blogId = '153438f406792b9a40f9c359'  

        await api.delete(`/api/blogs/${blogId}`).expect(204)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length - 1)
        const titles = response.body.map(t => t.title)
        expect(titles).not.toContain('test blog')        

    })
})

describe('PUT tests', () => {
    test('Updating a blog', async () => {
        const blogId = '153438f406792b9a40f9c359'  
        const newBlog = {
            id: '153438f406792b9a40f9c359',
            title: "test blog",
            author:"Diego",
            url: "test.com",
            likes: 1
        }
        await api.put(`/api/blogs/${blogId}`).send(newBlog).expect(200).expect('Content-Type', /application\/json/)
        const response = await api.get(`/api/blogs/${blogId}`)
        expect(response.body.likes).toBe(1)
    })
})


afterAll(() => {
  mongoose.connection.close()
})