import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {
    const [cred, setCred] = useState({email:'', password:''});
    const [err, setErr] = useState('');

    function changeHandler(e) {
    	setCred({...cred, [e.target.name]: e.target.value});
    }

    function submitHandler(e) {
    	e.preventDefault();

      axios.post('http://localhost:5000/login', cred)
      .then(({data}) => {
        if (data === 'User Does Not Exist') {
            setErr(data)
        } else if (data === 'Incorrect Password') {
          setErr(data);
        } else {
          localStorage.setItem('token', data);
          window.location.reload();
          window.location.replace('/');
        }
      })
      .catch(err => console.log(err));
    }

	return(
     <>
      <form onSubmit={submitHandler} autoComplete="off" className="container mt-5 formContainer shadow" >
       <h1 className="text-capitalize text-center" >Login</h1>

       <h4 className="text-center alert-danger" >
        {err}
       </h4>

       <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input type="email" name="email" onChange={e => changeHandler(e)} id="email" className="form-control" placeholder="Enter email" />
       </div>
  
       <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={e => changeHandler(e)} id="password" className="form-control" placeholder="Password" />
       </div>
  
       <div className="d-flex justify-content-between" >
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/signup" className="btn btn-info" >SignUp</Link>
       </div>
      </form>
     </>
	)
}