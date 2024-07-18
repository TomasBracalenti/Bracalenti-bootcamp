import { useState } from "react";
const Blog = ({ blog, handleUpdateBlog,handleDeleteBlog }) => {
  const [expand, setExpand] = useState(false)

  const handleExpand = () =>{
    setExpand((prev) => !prev)
  }

const i = 1;

return(
  <article style={{border:"black solid", margin:"5px", paddingTop:'10px'}}>
    <div>
      {blog.title} {blog.author}
      <button onClick={handleExpand}>{expand? "hide" : "view"}</button>
    </div>
    { expand &&
    <>
      <div>
      <a 
      target="blank"
      href={blog.url}>{blog.url}</a>
    </div>
    <div>
      <p>Likes {blog.likes}</p>
      <button onClick={()=> handleUpdateBlog(blog)}>like</button>
    </div>
    <div>
      {blog.user.name}
    </div>
    <div>
      <button
      onClick={()=> handleDeleteBlog(blog.id)}
      style={{background:"#9A9AF7" , borderRadius:'5px' , border:"tranparent"}}
      >delete</button>
    </div>
    </>
    }

  </article>
)
};

export default Blog;
