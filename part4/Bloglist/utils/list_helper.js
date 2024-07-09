
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) =>{
    return 1
}

const totalLikes = (blogs) => {
    const answer = blogs.reduce((acum, blog) =>  acum + (blog.likes || 0) ,0)
    return blogs.length === 0 ? 0 : answer
}

const favoriteBlog = (blogs) => {
    const answer = blogs.reduce((ans,blog) => {
        const likes = blog.likes || 0
        const ansLikes = ans.likes || 0
        return likes>ansLikes? blog : ans
    } ,{ likes:-1})
    return blogs.length === 0 ? {} : answer
}


const mostBlogs = (blogs) =>{
    const blogsPerAuthor = blogs.reduce((list,blog) => {
        const blogPerAuthor = list.find((b) => b.author === blog.author)
        if(blogPerAuthor) blogPerAuthor.blogs+=1;
        else list.push({
            author:blog.author,
            blogs:1
        })
        return list
    },[])
    
    const answer = blogsPerAuthor.reduce((ans,author) => author.blogs>ans.blogs? author: ans, { blogs: 0})
    return blogs.length === 0? {} : answer
}

const mostLikes = (blogs) =>{
    const blogsPerAuthor = blogs.reduce((list,blog) => {
        const blogPerAuthor = list.find((b) => b.author === blog.author)
        if(blogPerAuthor) blogPerAuthor.likes+= (blog.likes || 0);
        else list.push({
            author:blog.author,
            likes: (blog.likes || 0)
        })
        return list
    },[])
    const answer = blogsPerAuthor.reduce((ans,author) => author.likes>ans.likes? author: ans, { likes: -1})
    return blogs.length === 0? {} : answer
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}