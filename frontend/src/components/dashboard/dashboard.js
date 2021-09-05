import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import './dashboard.css';

export default function Dashboard() {
    const [list, setList] = useState([]);

    const { name, id } = jwt_decode(localStorage.getItem('token'));

    const history = useHistory();

    useEffect(() => {
      axios.get('http://localhost:5000/blog')
      .then(({data}) => setList(data))
      .catch(err => console.log(err));
    }, [])

	return(
     <>
      <div className="container mt-5 col-md-10" >
       <div className="d-flex bg-light justify-content-between border-bottom shadow" >
        <h4>{name}</h4>
        <button onClick={() => history.push('/dashboard/create')} 
         className="btn btn-primary" >
         + New Blog
        </button>
       </div>

       <table className="shadow mt-3" >
        <tr>
         <th>Picture</th>
         <th>Title</th>
         <th>Category</th>
         <th>Published On</th>
         <th>Operation</th>
        </tr>

        {
          list.filter(e => e.userId === id)
          .map(e => (
            <tr key={e.id} >
             <th><img src={`${e.picture}`} width="100" height="100" alt="" /></th>
             <th>{e.title}</th>
             <th>{e.category}</th>
             <th>{e.date}</th>
             <th>
              <button
                onClick={() => history.push(`/dashboard/update/${e._id}`)} 
                className="btn btn-primary mx-3" 
              >
                Update
              </button>
              <button className="btn btn-danger" >Delete</button>
             </th>
            </tr>
          ))
        }

       </table>

      </div>


     </>
	)
}
