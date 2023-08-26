import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import userContext from '../context/user/userContext'
import Navbar from '../components/Navbar.jsx'

const Dashboard = () => {
    const navigate = useNavigate()
    const { user, loggedIn, handleLogout } = useContext(userContext)

    useEffect(() => {
        if (!loggedIn) {
            navigate('/')
        }
    }, [loggedIn])

    return (
        <div>
            <Navbar handleLogout={handleLogout} />
            <h1>Welcome, {user.name}</h1>
            <button onClick={handleLogout} className='text-white bg-red-500 px-4 py-2 text-xl'>Logout</button>

        </div>
    )
}

export default Dashboard