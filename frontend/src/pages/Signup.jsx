import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
    const [user, setUser] = useState({
        userName: '',
        email: '',
        phoneNumber: '',
        password: ''
    });
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submitForm = (e) => {
        e.preventDefault();
        setErr('');
        setSuccess('');
        
        axios.post('http://localhost:2000/api/signup', user , {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then( result => {
                setSuccess((result.data && result.data.message) ||
                    ("Account Created successfully"));
                setUser({
                    userName: '',
                    email: '',
                    phoneNumber: '',
                    password: ''
                });
            })
            .catch(err => {
                console.log("Error Details: ", err);
                setErr(err.response?.data || 'An error occurred');
            });
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h1 className="signup-title">Create Your Account</h1>
                <form onSubmit={submitForm} className="signup-form">
                    <div className="form-group">
                        <label className="form-label">UserName</label>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Enter your username"
                            value={user.userName}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            placeholder="Create a password"
                            value={user.password}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            placeholder="123-456-7890"
                            value={user.phoneNumber}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="signup-button">
                        Sign Up Now
                    </button>
                </form>
                <div className="message-container">
                    {err && <div className="error-message">{err}</div>}
                    {success && (
                        <div className="success-message">
                            <div className="success-icon">✓</div>
                                <div className="success-content">
                                    <p>{success}</p>
                                    <Link to="/login" className="login-button">
                                        Continue to Login
                                    </Link>
                                </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}