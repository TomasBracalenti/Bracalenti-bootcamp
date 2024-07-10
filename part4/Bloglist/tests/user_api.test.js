const {test, after, describe, beforeEach} = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')


const api = supertest(app)

describe("initially one user in DB", ()=>{
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ 
          _id: '668efc3dc0b7ca05c8695eb8',
          username: 'root', 
          passwordHash })
    
        await user.save()
      })

    test('Creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainenA1',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })

      test("Create new user", async ()=>{
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'newUser',
            name: 'newName',
            password: 'newPassword1'
        }
        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
        assert(usersAtEnd.find(user => user.username === newUser.username))
    })

    test('Creation failed, password is short', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
          username: 'newUser',
          name: 'newName',
          password: 'as'
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('Password must be at least 3 characters long'))
    
    
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })

      test('Creation failed, username is short', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
          username: 'ne',
          name: 'newName',
          password: 'password'
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('Username must be at least 3 characters long'))
    
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })
})


after(async ()=> {
    await mongoose.connection.close()
})


