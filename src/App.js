// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Notif from './components/Notif';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [notif, setNotif] = useState(null);
  const showNotif = (message, type) => {
    setNotif({message, type});
    setTimeout(() => {
      setNotif(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <Notif alert={notif}/>
            <div className='container'>
              <Routes>
                  <Route path="/" element={<Home showNotif={showNotif}/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/login" element={<Login showNotif={showNotif}/>}/>
                  <Route path="/signup" element={<Signup showNotif={showNotif}/>}/>
              </Routes>
            </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
