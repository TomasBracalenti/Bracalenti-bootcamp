const { test , describe} = require ('node:test')
const assert = require('assert')
const list_helper = require('../utils/list_helper')

  
// Test cases
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  },
]
const secondList =  listWithOneBlog.concat ([{
    _id: '5a422aa71b54a676234ee7f8',
    title: 'Second title',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    __v: 0
  }])



describe('dummy test', () =>{
test("dummy returns one", () => {
    const blogs = []
    const result = list_helper.dummy(blogs)
    assert.strictEqual(result, 1)
});
})


describe('total likes', () => {
    test('Empty list', () => {
        const result = list_helper.totalLikes([])
        assert.strictEqual(result,0)
    });
    test('when list has only one blog, equals the likes of that', () => {
      const result = list_helper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })
    test('When one blog does not have likes', () =>{
        const result = list_helper.totalLikes(secondList)
        assert.strictEqual(result,5)
    }
    )
  })  
  
  describe("favorite blog", () =>{
    test("Empty list",()=>{
      const result = list_helper.favoriteBlog([])
        assert.deepStrictEqual(result,{})
    })
    test("with one blog", ()=>{
      const result = list_helper.favoriteBlog(listWithOneBlog)
      assert.deepStrictEqual(result,{
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      })
    })
    test("List of blogs", ()=>{
      const result = list_helper.favoriteBlog(blogs)
      assert.deepStrictEqual(result,{
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      })
    })
  })

  describe("author with most blogs", ()=>{
    test("empty list", ()=>{
      const result = list_helper.mostBlogs([])
      assert.deepStrictEqual(result,{})
    })
    test("with one blog", ()=>{
      const result = list_helper.mostBlogs(listWithOneBlog)
      assert.deepStrictEqual(result,{
        author: 'Edsger W. Dijkstra',
        blogs: 1
      })
    })
    test("list of blogs",()=>{
      const result = list_helper.mostBlogs(blogs)
      assert.deepStrictEqual(result,{
        author: "Robert C. Martin",
        blogs: 3
      })

    })
  })


  describe("author with most likes", ()=>{
    test("empty list", ()=>{
      const result = list_helper.mostLikes([])
      assert.deepStrictEqual(result,{})
    })
    test("with one blog", ()=>{
      const result = list_helper.mostLikes(listWithOneBlog)
      assert.deepStrictEqual(result,{
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
    })
    test("list of blogs",()=>{
      const result = list_helper.mostLikes(blogs)
      assert.deepStrictEqual(result,{
        author: "Edsger W. Dijkstra",
        likes: 17
      })
  })
})



