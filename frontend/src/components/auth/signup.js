import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './auth.css';
import { Link } from 'react-router-dom';


export default function SignUp() {
  const [cred, setCred] = useState({name:'', email:'', password:''});
  const [exist, setExist] = useState();
  const [err, setErr] = useState({name:'', email:'', password:''});

  const history = useHistory();

  const changeHandler = e => setCred({...cred, [e.target.name]:e.target.value});

  function submitHandler(e) {
    e.preventDefault();

    axios.post('http://localhost:5000/signup', cred)
    .then(({data}) => {
      if (data === 'User Created') {
        history.push('/login')
      } else if (data === 'User Already Exist') {
          setExist(data);
      } else {
        setErr({
          ...err,
          name: data.name,
          email: data.email,
          password: data.password
        })
      }
    })
    .catch(err => console.log(err));
  }

  return(
   <>
    <form onSubmit={submitHandler} autoComplete="off" className="container mt-5 formContainer shadow" >
     <h1 className="text-capitalize text-center" >SignUp</h1>

     <h3 className="text-center alert-danger" >{exist}</h3>
     
     <div className="form-group">
      <label htmlFor="name">Full Name</label>
      <input type="name" name="name" onChange={e => changeHandler(e)} id="name" className="form-control" placeholder="Enter name" />
      <p className="alert-danger mt-1" >{err.name}</p>
     </div>

     <div className="form-group">
      <label htmlFor="email">Email address</label>
      <input type="email" name="email" onChange={e => changeHandler(e)} id="email" className="form-control" placeholder="Enter email" />
      <p className="alert-danger mt-1" >{err.email}</p>
     </div>
  
     <div className="form-group">
      <label htmlFor="password">Password</label>
      <input type="password" name="password" onChange={e => changeHandler(e)} id="password" className="form-control" placeholder="Password" />
      <p className="alert-danger mt-1" >{err.password}</p>
     </div>
  
     <div className="d-flex justify-content-between" >
      <button type="submit" className="btn btn-primary">Submit</button>
      <Link to="/login" className="btn btn-info" >Login</Link>
     </div>
    </form>

   </>
  )
}