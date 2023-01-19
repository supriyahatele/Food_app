import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

export default function Login() {

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    });

    const json = await response.json();
    if (!json.status) {
      alert('!Enter Valid Credentials');
    }
    else {
      localStorage.setItem("token", json.token);
      console.log(localStorage.getItem("token"));
      navigate('/');
    }

    console.log(json);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className='wrapper bg-dark d-flex align-items-center justify-content-center w-100'>
        <div className='login'>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
            </div>
            <button type="submit" className="m-3 btn btn-primary">Login</button>
            <Link to="/createuser" className='m-3 btn btn-danger' >New User</Link>
          </form>
        </div>
      </div>

    </div>
  );
};
