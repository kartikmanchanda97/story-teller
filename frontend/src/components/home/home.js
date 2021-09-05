import './home.css';
import { useState, useEffect } from 'react';
import Card from '../card/card';
import axios from 'axios';
import Footer from '../footer/footer';

export default function Home() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/blog')
    .then(({data}) => setList(data))
    .catch(err => console.log(err));
  }, []);

  return(
    <div className="home" >
      <h1 className="text-center py-5" >Story Teller</h1>

      <div className="cardContainer py-5" >
       {
        list.map((e, i) => (
          <Card blog={e} index={i} key={e._id} />
        ))
       }
      </div>
      <Footer />
    </div>
  )
}
