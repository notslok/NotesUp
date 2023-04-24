import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {

  const [credentials, setCredentials] = useState({email: "", password: ""});
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = "http://localhost:5000/api/auth/login";
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });

    console.log("here");
    
    const jsonResponse = await response.json();
    if(jsonResponse.success){
      // save auth-token and redirect
      localStorage.setItem('token', jsonResponse.authToken);
      
      navigate("/");
      
      props.showNotif("Logged in Successfully", "success");
    }else{
      props.showNotif("Logged in Failed, Try Again...", "danger");
    }
    e.target.reset();
  }

  
  return (
    <div className='mt-3'>
      <h2>Login to NotesUp</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} name="email"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login;
