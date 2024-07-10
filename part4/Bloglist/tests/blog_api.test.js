const {test, after, describe, beforeEach} = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObject = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)
})


describe("GET", ()=>{
    test("blogs are returned as json",async () =>{
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test("all blogs are returned",async ()=>{
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test("unique identifier of blog is named id", async () =>{
        const response = await api.get('/api/blogs')
        assert(response.body[0].id)
    })

    test("non existent id returns 404", async ()=>{
        const id = "50f7e7d3c5e4e7e5c8b2c5b1"
        await api
        .get(`/api/blogs/${id}`)
        .expect(404)
    }
    )
})

describe("POST", ()=>{
    test(" a valid blog can be added", async ()=>{
        const newBlog = {
            title: "Test Blog",
            author: "Test Author",
            url: "www.test.com",
            likes: 0
        }
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
        //verificar los campos del nuevo blog
        
        // eslint-disable-next-line no-unused-vars
        const {id, ...newBlogInDB } = blogsAtEnd.find(blog => blog.title === newBlog.title && blog.author === newBlog.author && blog.url === newBlog.url)
        assert.deepStrictEqual(newBlogInDB, newBlog)
            })

        test("if likes is missing, it will default to 0", async ()=>{
            const newBlog = {
                title: "Test Blog",
                author: "Test Author",
                url: "www.test.com"
            }
            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            const {likes} = blogsAtEnd.find(blog => blog.title === newBlog.title && blog.author === newBlog.author && blog.url === newBlog.url)

            assert.strictEqual(0, likes)
        })

        test("if title is missing, return 400", async ()=>{
            const newBlog = {
                author: "Test Author",
                url: "www.test.com",
                likes: 0
            }
            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        })

        test("if url is missing, return 400", async ()=>{
            const newBlog = {
                title: "Test Blog",
                author: "Test Author",
                likes: 0
            }
            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        })
})

describe("DELETE", ()=>{
    test("Delete a blog by id", async ()=>{
        const blogToDelete = helper.initialBlogs[0]
        const id = blogToDelete._id
        await api
        .delete(`/api/blogs/${id}`)
        .expect(204)
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
        assert(!blogsAtEnd.find(blog => blog._id === id))
    })

})

describe("PUT", ()=>{
    test("Update a blog by id", async ()=>{
        const blogToUpdate = helper.initialBlogs[0]
        const id = blogToUpdate._id
        const updatedBlog = {
            title: "Updated Title",
        }
        await api
        .put(`/api/blogs/${id}`)
        .send(updatedBlog)
        .expect(200)

        const newBlog = ({...blogToUpdate, ...updatedBlog})
        newBlog.id = newBlog._id
        delete newBlog._id
        delete newBlog.__v
        const blogsAtEnd = await helper.blogsInDb()
        assert.deepStrictEqual(blogsAtEnd.find(blog => blog.id === id), newBlog)
    })

    test("Update a blog that does not exist", async ()=>{
        const id = "50f7e7d3c5e4e7e5c8b2c5b1"
        const updatedBlog = {
            title: "Updated Title",
        }
        await api
        .put(`/api/blogs/${id}`)
        .send(updatedBlog)
        .expect(404)
    })
})


after(async ()=> {
    await mongoose.connection.close()
})