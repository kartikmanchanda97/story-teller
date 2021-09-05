import './nav.css'; 
import { Link } from 'react-router-dom';

export default function Nav({isLoggedIn}) {
    function logoutHandler() {
        localStorage.removeItem('token');
        window.location.reload();
    }

	return(
     <>
      <nav className="navbar navbar-expand-lg border-bottom navbar-light">
       <Link className="navbar-brand" to="/">Story Teller</Link>
  
       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
       </button>

       <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">

         <li className="nav-item active">
          <Link to="/" className="nav-link">Home</Link>
         </li>

         {
            isLoggedIn ? 
            (
             <>
              <li className="nav-item active">
               <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-item active">
               <Link to="/login" onClick={logoutHandler} className="nav-link">Logout</Link>
              </li>
             </>
            ) :
            ( <>
              <li className="nav-item active">
               <Link to="/login" className="nav-link">Login</Link>
              </li>

              <li className="nav-item active">
               <Link to="/signup" className="nav-link">SignUp</Link>
              </li>

              </>
            )
         }

        </ul>
       
       </div>

      </nav>

     </>
	)
}