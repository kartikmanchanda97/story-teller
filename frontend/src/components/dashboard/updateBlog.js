import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function UpdateBlog() {
    const [blog, setBlog] = useState({title:'', category:'', content:'', picture:''});
    const [img, setImg] = useState('');
    const [err, setErr] = useState({category:'', content:'', title:''});

    const { id }  = useParams();

    useEffect(() => {
      axios.get(`http://localhost:5000/blog/${id}`)
      .then(({data}) => {
         setBlog({
            title: data.title,
            content: data.content,
            picture: data.picture,
            category: data.category
         })
      })
      .catch(err => console.log(err)); 
    }, [])

    function changeHandler(e) {
    	setBlog({...blog, [e.target.name]:e.target.value});
    }

    const history = useHistory();

    async function submitHandler(e) {
    	e.preventDefault();


    	const imgData = new FormData();
    	imgData.append('file', img);
    	imgData.append('upload_preset', 'social-blog');
    	imgData.append('cloud_name', 'dotsnppdq');
    	
        if (img !== '') {
            const { data } = await axios.post('https://api.cloudinary.com/v1_1/dotsnppdq/image/upload', imgData)
            .catch(err => console.log(err));

            blog['picture'] = data.url;
        }

    	axios.put(`http://localhost:5000/blog/update/${id}`, blog)
        .then(({data}) => {
            if (data === 'Blog Updated') {
                history.push('/dashboard');
            } else {
                setErr({
                    title: data.title,
                    category: data.category,
                    content: data.content,
                    picture: data.picture,
                })
            }
        })
        .catch(err => console.log(err));
    }


	return(

      <form autoComplete="off" onSubmit={submitHandler} className="container col-md-6 mt-5 shadow p-3" >
     
     <div className="form-group">
      <label htmlFor="title">Title</label>
      <input type="text" value={blog?.title} onChange={e => changeHandler(e)} name="title" className="form-control shadow-none" id="title" placeholder="Title..." />
      <p className="alert-danger mt-1">{err.title}</p>
     </div>
  
     <div className="row justify-content-between" >
       
      <div className="form-group">
       <label htmlFor="category">Category</label>
       <select onChange={e => changeHandler(e)} value={blog?.category} name="category" className="form-control" id="category">
        <option>Unknown</option>
        <option>Nature</option>
        <option>Travel</option>
        <option>Education</option>
        <option>Food</option>
        <option>Fassion</option>
       </select>
      </div>
  
      <div className="form-group">
       <label htmlFor="media">Featured Image</label>
       <input type="file" onChange={e => setImg(e.target.files[0])} name="file" className="form-control-file" id="media" />
      </div>
      <p className="alert-danger mt-1">{err.category}</p>
      <p className="alert-danger mt-1">{err.picture}</p>

     </div>

     <div className="form-group">
      <label htmlFor="content">Content</label>
      <textarea onChange={e => changeHandler(e)} defaultValue={blog?.content} name="content" className="form-control  shadow-none" id="content" rows="7"></textarea>
      <p className="alert-danger mt-1">{err.content}</p>
     </div>

     <button type="submit" className="btn btn-primary">Submit</button>

    </form>
	)
}
