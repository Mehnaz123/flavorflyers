import React, { useState } from 'react'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
let navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {

      email: credentials.email,
      password: credentials.password,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/loginuser', data);
      
      console.log(response.data);
      localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem('token', response.authToken)
      console.log(localStorage.getItem("authToken"))
      navigate('/')
      
    } catch (error) {
      console.log(error);
    }
  
      
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: 'cover',
        height: '100vh',
      }}
    >
      <div></div>

      <div className='container'>
        <form
          className='w-50 m-auto mt-5 border bg-dark border-success rounded'
          onSubmit={handleSubmit}
        >


          <div className='m-3'>
            <label htmlFor='email' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              name='email'
              value={credentials.email}
              onChange={handleChange}
              aria-describedby='emailHelp'
            />
          </div>
          <div className='m-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              value={credentials.password}
              onChange={handleChange}
              name='password'
              autoComplete='current-password'
            />
          </div>
          <button
            type='submit'
            onClick={handleSubmit}
            className='m-3 btn btn-success'
          >
            Login
          </button>
          <Link
            to='/signup'
            className='m-3 mx-1 btn btn-danger'
          >
            New user
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login