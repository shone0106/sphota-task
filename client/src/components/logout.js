import React from 'react'
import { useAuthContext } from '../contexts/authContext'


function Logout() {
    const { updateUser } = useAuthContext()

    async function onLogout () {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }
            updateUser(null)
        }
        catch(error){
            console.error('failed to logout')
        }
    }
  return (
    <div style={{ marginTop:'6%', marginLeft:"50%"}}>
        <button onClick={onLogout}>Logout</button>
    </div>
  )
}

export default Logout