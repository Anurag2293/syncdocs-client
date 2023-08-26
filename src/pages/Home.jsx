import React, { useState } from 'react'
import Login from '../components/Login.jsx'
import Signup from '../components/Signup.jsx'

const Home = () => {
    const [tab, setTab] = useState('LOGIN');

    return (
        <div className="h-full bg-white">
            {tab === 'LOGIN' ? <Login setTab={setTab} /> : <Signup setTab={setTab} />}
        </div>
    )
}

export default Home