import React, { useState } from 'react';
import axios from "axios"
import {Link} from "react-router-dom"
import "./login.css"
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const submitForm = (e)=> {
        e.preventDefault()
        setErr('')
        setIsLoading(true);
        let data ={email,password}
        axios.post('http://localhost:3000/login', data)
        .then(result => {
            localStorage.setItem('token', result.data.token)
            window.location.href = "/"
        })
        .catch(err => {
            console.log("Error Details: ", err);  
             setErr(err.response.data || 'Login failed. Please try again.' ); 
        })
        .finally(() => {
            setIsLoading(false);
        }) 
        }
  return (
    <div className='div-signup'>
    <h1>Login</h1>
    <form className='auth-form' onSubmit={submitForm}>
        <div>
            <label>Your Email:</label>
            <input type='email'
             name='email' placeholder='Write your email'
             value={email} onChange={(e) => setEmail(e.target.value)}
             ></input>
        </div>
        <div>
            <label>Password:</label>
            <input type='password'
             name='password' placeholder='Password'
             value={password} onChange={(e) => setPassword(e.target.value)}
             ></input>
        </div> 
        <button type="submit" className="login-button"
            disabled={isLoading} >
            {isLoading ? 'Logging in...' : 'Login'}
        </button>
    </form>
    {err? 
    <h4 className="error-message">{err}</h4>:
    null
    }
    <div className="login-footer">
        <p>Don't have an account? 
        <Link to="/signup" 
        className="footer-link">Sign up</Link></p>
    </div>
</div>
  )
}

  
