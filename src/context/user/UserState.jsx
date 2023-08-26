
import { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({ name: '', email: '', token: '' })

    const fetchUser = async (token) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/`, {
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            if (response.ok) {
                const { name, email, token } = await response.json()
                setUser({ name, email, token })
                setLoggedIn(true)
            }
            else {
                console.log('Token Invalid')
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleLoginSubmit = async (data) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Set the Content-Type header
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const {name, email, token} = await response.json();
                localStorage.setItem('userToken', token)
                setUser({name, email, token})
                setLoggedIn(true)
                console.log({name, email, token})
            }
            else {
                alert('Authorization Error')
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const handleSignupSubmit = async (data) => {
        console.log(data)
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Set the Content-Type header
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password
                })
            });

            if (response.ok) {
                const {name, email, token} = await response.json();
                localStorage.setItem('userToken', token)
                setUser({name, email, token})
                setLoggedIn(true)
                console.log({name, email, token})
            }
            else {
                alert('Authorization Error!')
            }
            
        } catch (error) {
            alert(error.message)
        }
    }

    const handleLogout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/logout`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            if (response.ok) {
                localStorage.removeItem('userToken')
                setUser({ name: '', email: '', token: '' })
                setLoggedIn(false)
            }
            else {
                alert('Error while logging out')
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <UserContext.Provider value={{ loggedIn, user, fetchUser, handleSignupSubmit, handleLoginSubmit, handleLogout }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;