import React, { useContext } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from './App';
import axios from 'axios';
import logoImage from './assets/logo.png'

function Navbar() {
    const user = useContext(userContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get('http://localhost:3001/logout')
            .then(res => {
                if (res.data === "Success") navigate(0);
            }).catch(err => console.log(err));
    }

    return (
        <>
            <nav className='navbar-header'>

                <Link to="/" className='navbar-logo'>
                    <img src={logoImage} alt="Logo" className="logo-image"/>
                    <span className="logo-text">CatPosts</span>
                </Link>
                <div className='rolling-text'>Consider buying us a coffee if you liked it 🐱</div>

                <div className='navbar-links'>
                    <Link to="/" className='link'>Home</Link>
                    <a href="/about" className='link'>About</a>
                </div>
                <div className='navbar-user'>
                {user.username ?
                        <button onClick={handleLogout} className='btn_input'>Logout</button>
                        :
                        <Link to="/register" className="link">Register/Login</Link>
                    }
                </div>
            </nav>
            {user.username && (
                <Link to="/create" className="floating-button">+</Link>
            )}
        </>
    );
}

export default Navbar;
