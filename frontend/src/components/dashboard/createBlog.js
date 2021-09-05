import { useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

function CreateBlog(props) {
    const [blog, setBlog] = useState({title:'', category:'', content:'', picture:'', date:'', userId: ''});
    const [img, setImg] = useState('');
    const [err, setErr] = useState({category:'', content:'', title:'', picture:''});

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
            const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, imgData)
            .catch(err => console.log(err));

            blog['picture'] = data.url;
        }

        let token = localStorage.getItem('token');

        let decode = jwt_decode(token);

        blog['userId'] = decode.id;
        blog['authorName'] = decode.name;

    	axios.post('http://localhost:5000/blog/create', blog)
        .then(({data}) => {
            if (data === 'Blog Created') {
                history.push('/dashboard')
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
      <input type="text" onChange={e => changeHandler(e)} name="title" className="form-control shadow-none" id="title" placeholder="Title..." />
      <p className="alert-danger mt-1">{err.title}</p>
     </div>
  
     <div className="row justify-content-between" >
       
      <div className="form-group">
       <label htmlFor="category">Category</label>
       <select onChange={e => changeHandler(e)} name="category" className="form-control" id="category">
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
      <textarea onChange={e => changeHandler(e)} name="content" className="form-control  shadow-none" id="content" rows="7"></textarea>
      <p className="alert-danger mt-1">{err.content}</p>
     </div>

     <button type="submit" className="btn btn-primary">Submit</button>

    </form>
	)
}

export default CreateBlog;