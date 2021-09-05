import { useState, useEffect } from 'react';
import './App.css';

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import Nav from './components/nav/nav';
import Home from './components/home/home';
import Blog from './components/blog/blog';
import SignUp from './components/auth/signup';
import Login from './components/auth/login';
import CreateBlog from './components/dashboard/createBlog';
import UpdateBlog from './components/dashboard/updateBlog';
import Dashboard from './components/dashboard/dashboard';

function App() {
  const [isLoggedIn, setLog] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    (token !== null) ? setLog(true) : setLog(false);
  }, []);

  return (
    
    <BrowserRouter>

     <Nav isLoggedIn={isLoggedIn} />


     <Switch>

      <Route exact path='/' component={Home} />

      <Route exact path='/blog/:id' component={Blog} />
 
      <Route path='/signup' component={SignUp} />

      <Route path='/login' component={Login} />

      <Route exact path='/dashboard' component={Dashboard} />
      
      <Route path='/dashboard/create' component={CreateBlog} />

      <Route path='/dashboard/update/:id' component={UpdateBlog} />

     </Switch>
     
    </BrowserRouter>
  );
}

export default App;
