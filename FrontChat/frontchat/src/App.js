import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import MarvelMain from "./components/marvel/MarvelMain"
import DCMain from "./components/dc/DCMain";
import { useState, useEffect } from 'react';
import api from './api/axios';
import ComicDetailsPage from './components/ComicDetails/ComicDetailsPage';
import Nav from './components/Navbar/Nav';
import Home from './components/Home/Home';
import OtherPublisher from './components/otherPublisher/OtherPublisher';


function App() {

   // State to store the list of comics
  const [comix, setComix] = useState([]);
 
  // Function to fetch comics data from the API
  const getComix = async () => {
    try {
      // Fetching data from the API
      const response = await api.get("/api/v1/comix");
       // Updating the state with the fetched data
      setComix(response.data);

    } catch (err) {
       // Logging error if fetching fails
      console.error(err);
    }

  }

  // Effect hook to fetch comics data when the component mounts
  useEffect(() => {
    getComix(); // Calling the getComix function to fetch data
  }, [])


  return (
    <div>
      <Nav/>
      {/* Setting up routes for different components */}
      <Routes>

      <Route exact path="/" element={<Home comix={comix}/>}/>
     <Route path="/dc" element={<DCMain comix={comix} />} />
     <Route path="/marvel" element={<MarvelMain comix={comix} />} />
     <Route path="/otherPublisher" element={<OtherPublisher comix={comix}/>} />
       <Route path="/comix/:title" element={<ComicDetailsPage  />} />
        <Route path="/chat" element={<ChatRoom/>} />

      </Routes>
    </div>
  );
}

export default App;
