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
        <div className='countiner has-background-white-ter'>
            {
                user
                    ?
                    <div className='section has-text-centered profile-section'>
                        <h1 className='title is-3'>User Account</h1>
                        <form onSubmit={updateUserInformation}>
                            <div className='field columns'>
                                <div className='column'>
                                    <label className='label has-text-left'>First Name</label>
                                    <div className='control has-icons-left'>
                                        <input className='input is-small' value={userData.first_name} onChange={handleChange} id='first_name' name='first_name'></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-solid fa-id-card"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className='column'>
                                    <label className='label has-text-left'>Last Name</label>
                                    <div className='control has-icons-left'>
                                        <input className='input is-small' value={userData.last_name} onChange={handleChange} id='last_name' name='last_name'></input>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-solid fa-id-card"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label has-text-left'>Username</label>
                                <div className='control has-icons-left'>
                                    <input className='input is-small' value={userData.username} onChange={handleChange} id='username' name='username'></input>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-solid fa-user"></i>
                                    </span>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label has-text-left'>Email</label>
                                <div className='control has-icons-left'>
                                    <input className='input is-small' value={userData.email} onChange={handleChange} id='email' name='email' type='email'></input>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <button className='button is-primary' type='submit'>Update Information</button>
                        </form>
                        <div className='profile-buttons is-pulled-right'>
                            <LogOutButton setUser={setUser} />
                            <button className='button is-dark' type='submit' onClick={deleteUserAccount}>Delete Account</button>
                        </div>
                    </div>
                    :
                    <p className='subtitle is-4 has-text-dark'>unathorized user</p>
            }
        </div>
    )
}

export default UserProfile
