import './card.css';
import { Link } from 'react-router-dom';

export default function Card({blog, index}) {
	return(
     <>
      <div className="card mb-4" align="center" >

        {
          (index&2) ? 
          <img src={`${blog.picture}`} height="500" alt="" /> : 
          <img src={`${blog.picture}`} alt="" />
        }
        
        <p>{blog.category}</p>
        <Link to={`/blog/${blog._id}`} className="h4" >{blog.title}</Link>
        <p className="px-4" >{blog.content.slice(0, 150)}</p>
        <div style={{borderTop:'1px solid #CACFD2'}} className="d-flex col-md-10 justify-content-between px-3" >
          <p>{blog.date}</p>
          <p>{blog.authorName}</p>
        </div>
      </div>
     </>
	)
}