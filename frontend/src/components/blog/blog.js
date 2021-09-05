import { useState, useEffect } from 'react';
import './blog.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from './comment';
import Footer from '../footer/footer';

export default function Blog() {
  const [blog, setBlog] = useState();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/blog/${id}`)
    .then(({data}) => setBlog(data))
    .catch(err => console.log(err));
  }, []);

  return(
   <div className="blogContainer">
    <div className="row col-md-10 offset-md-1 pt-5" >

      {
        <div className="left" >
          <img src={`${blog?.picture}`} alt="" />
          <h3 className="mt-3" >{blog?.title}</h3>
          <p className="border-bottom" >
            {blog?.date}  {blog?.category} {blog?.authorName}
          </p>
            
          <p className="content" >{blog?.content}</p>
          <Comment blogId={id} />
        </div>   
     }



    </div>

    <Footer />
   </div>
  )
}