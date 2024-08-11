import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const handleLogout = () => {
       
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login'); 
    };

    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            {token ? (
                <div>
                    <p>Logged in as: {role}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Please <a href="/login">login</a> to access the home page.</p>
            )}
        </div>
    );
};

export default Home;
