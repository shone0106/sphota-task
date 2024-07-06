import React, { useState } from 'react';
import { useAuthContext } from '../contexts/authContext'


const RegisterPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const { updateUser } = useAuthContext()

    const handleRegister = async () => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const data = await response.json();
            
            updateUser(data)
            console.log('Login successful:', data); 

            // Optionally, redirect or perform other actions upon successful login
        } catch (error) {
            console.error('Login error:', error.message); // Handle error
        }
    };

    return (
        <div>
            <h2>Register</h2>
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
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterPage;
