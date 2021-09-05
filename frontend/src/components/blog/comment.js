import { useState, useEffect } from 'react';
import axios from 'axios'; 
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

export default function Comment({blogId}) {
  const [comment, setComment] = useState('');
  const [err, setErr] = useState('');
  const [list, setList] = useState([]);
  const [tokenId, setTokenId] = useState();

  useEffect(() => {
    axios.get('http://localhost:5000/comment')
    .then(({data}) => setList(data))
    .catch(err => console.log(err));
 
    let token = localStorage.getItem('token');

    if (token !== null) {
      let { id } = jwt_decode(token);
      setTokenId(id);
    }

  }, [list]);

  const history = useHistory();

  function deleteHandler(id) {
    axios.delete(`http://localhost:5000/comment/delete/${id}`)
    .catch(err => console.log(err));
  }

  function submitHandler(e) {
    e.preventDefault();

    let token = localStorage.getItem('token');

    if (token === null) {
      history.push('/login');
    } else {
       const { id, name } = jwt_decode(token);

       let values = {
        comment,
        name: name,
        blogId,
        authorId: id
       }

      axios.post('http://localhost:5000/comment/create', values)
      .then(({data}) => {
        if (data !== 'Comment Created') {
         setErr(data.comment)
        }
      })
      .catch(err => console.log(err));
    }

    e.target.reset();
  }

	return(
     <>
      <div className="container mt-5 col-md-9" >

        
      
        
        <form autoComplete="off" onSubmit={submitHandler} className="bg-light p-2" >
          <textarea style={{height: '200px', fontSize:'20px'}} className="col-md-12 form-control shadow-none" 
           onChange={e => setComment(e.target.value)}
          ></textarea>
          <h5 className="text-center alert-danger" >{err}</h5>
          <button className="btn btn-dark my-4" >Post Comment</button>
        </form>
          
        

        <div className="col-md-12" >
        
        {
          list.filter(e => e.blogId === blogId)
          .map(e => (
              <div key={e._id} className="p-3 my-3 bg-light" >
                <div className="d-flex justify-content-between" >
                 {e.name}
                 {
                  ( e.authorId === tokenId ) ?
                  (
                   <button onClick={() => deleteHandler(e._id)} 
                    className="btn btn-danger shadow-none" >
                     X
                   </button>
                  ) : null
                 }
                
                </div>
                <p>{e.comment}</p>
               </div>
          ))
        }
        
      </div>
      </div>

     </>
	)
}