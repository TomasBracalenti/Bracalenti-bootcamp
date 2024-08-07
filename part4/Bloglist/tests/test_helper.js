const blog = require('../models/blog')
const user = require('../models/user')


const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "Patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user:  '668efc3dc0b7ca05c8695eb8',
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        user:  '668efc3dc0b7ca05c8695eb8',
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        user:  '668efc3dc0b7ca05c8695eb8',
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        user:  '668efc3dc0b7ca05c8695eb8',
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        user:  '668efc3dc0b7ca05c8695eb8',
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        user:  '668efc3dc0b7ca05c8695eb8',
        __v: 0
    }
]


const blogsInDb = async () => {
    const blogs = await blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
    const users = await user.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}

