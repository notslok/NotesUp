import {React, useEffect} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    
    let location = useLocation();

    useEffect(() => {
      // Google Analytics
    //   console.log(location);
    }, [location]);
    
    let navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
        <Link className="navbar-brand" to="/">NotesUp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
        </ul>
        {!localStorage.getItem('token') ? 
        <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
            <Link role="button" className="btn btn-primary mx-2" to="/login">Login</Link>
            <Link role="button" className="btn btn-primary" to="/signup">Sign Up</Link>
        </form>
         : <button onClick={handleLogout} className='btn btn-primary'>Logout</button> 
        }
        </div>
    </div>
    </nav>
  )
}

export default Navbar;