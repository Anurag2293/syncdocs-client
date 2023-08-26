import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Login from '../components/Login.jsx'
import Signup from '../components/Signup.jsx'

import userContext from '../context/user/userContext.jsx'

const Home = () => {
    const navigate = useNavigate()
    const [tab, setTab] = useState('LOGIN');
    const { loggedIn, fetchUser } = useContext(userContext)

    useEffect(() => {
        if (localStorage.getItem('userToken') !== null) {
            fetchUser(localStorage.getItem('userToken'))
        }

        if (loggedIn) {
            navigate('/dashboard')
        }
    }, [loggedIn])

    return (
        <div className="h-full bg-white">
            {tab === 'LOGIN' ? <Login setTab={setTab} /> : <Signup setTab={setTab} />}
        </div>
    )
}

export default Home