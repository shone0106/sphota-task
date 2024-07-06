import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './contexts/authContext';
import RegisterPage from './components/register';
import LoginPage from './components/login';
import Home from './components/home';

function App() {
  const { user } = useAuthContext()
    return (
      <>
      {
        user
        ?
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/complaints/:id" element={<ViewSingle />} />
            <Route path="/open" element={<Open/>} /> */}
            <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
        </>
        :
        <>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
        
      }
      
      </>
    )
  }
  
  export default App
  