import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { authRequest } from "../../lib/auth"

import LogOutButton from '../Auth/LogOutButton'

function UserProfile({ user, setUser }) {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: ''
    })

    async function displayUser() {
        const response = await authRequest({ data: userData, method: 'get', url: `http://127.0.0.1:8000/api/profile/${user.user_id}/` })
        setUserData(response.data)
        console.log("get user: ", response)
        console.log(" data: ", response.data)
    }
    useEffect(() => {
        if (user.user_id) {
            displayUser()
        }
    }, [])

    function handleChange(event) {
        setUserData({ ...userData, [event.target.name]: event.target.value })
        console.log(userData)
    }

    async function updateUserInformation(event) {
        event.preventDefault()
        let response = {}
        if (userData.first_name === '' || userData.last_name === '' || userData.username === '' || userData.email === '') {
            console.error('fields must be written')
        } else {
            response = await authRequest({ data: userData, method: 'put', url: `http://127.0.0.1:8000/api/profile/${user.user_id}/` })
            console.log("put: ", response)
            console.log("put data: ", response.data)
        }

        if (response.status === 200) {
            navigate(`/profile/${user.user_id}`)
        }
    }

    async function deleteUserAccount() {
        const response = await authRequest({ method: 'delete', url: `http://127.0.0.1:8000/api/profile/${user.user_id}/` })

        if (response.status === 204) {
            navigate(`/signup`)
        }
    }

    return (
        <div>
            {
                user
                    ?
                    <div>
                        <h1>Welcome @{userData.username}</h1>
                        <form onSubmit={updateUserInformation}>
                            <div>
                                <label htmlFor='first_name'> First name </label>
                                <input value={userData.first_name} onChange={handleChange} id='first_name' name='first_name'></input>
                            </div>
                            <div>
                                <label htmlFor='last_name'> Last name </label>
                                <input value={userData.last_name} onChange={handleChange} id='last_name' name='last_name'></input>
                            </div>
                            <div>
                                <label htmlFor='username'> Username </label>
                                <input value={userData.username} onChange={handleChange} id='username' name='username'></input>
                            </div>
                            <div>
                                <label htmlFor='email'> Email </label>
                                <input value={userData.email} onChange={handleChange} id='email' name='email' type='email'></input>
                            </div>
                            <button type='submit'>Update Information</button>
                        </form>
                        <button type='submit' onClick={deleteUserAccount}>Delete Account</button>
                        <LogOutButton setUser={setUser} />
                    </div>
                    :
                    <p>unathorized user</p>
            }
        </div>
    )
}

export default UserProfile
