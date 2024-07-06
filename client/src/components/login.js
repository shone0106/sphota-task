import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext'


const LoginPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const { updateUser } = useAuthContext()

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            
            updateUser(data)
            console.log('Login successful:', data); 

        } catch (error) {
            console.error('Login error:', error.message); 
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
            </div>
            <button onClick={handleLogin}>Login</button>

            <div>Not a Member? <Link to='/register'>Register</Link></div>
        </div>
    );
};

export default LoginPage;
