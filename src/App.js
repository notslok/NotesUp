// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Notif from './components/Notif';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <Notif message="this is amazing" notifType="primary"/>
            <div className='container'>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/about" element={<About/>}/>
              </Routes>
            </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
