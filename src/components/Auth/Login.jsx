import { useState } from "react"
import axios from "axios"
import { saveTokens, getUserFromToken } from "../../lib/auth"
import { Link, useNavigate } from 'react-router'

export default function Login({ setUser }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/login/", { username, password })
            saveTokens(res.data.access, res.data.refresh)
            setUser(getUserFromToken())
            navigate("/focusLogs")
        } catch (err) {
            console.error(err)
            alert('Login failed')
        }
    }

    return (
        <>
            <img className='singup-login-background' src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHQycTJjOGYyejZkZHN2M2xobWk4dWN2c2NkMTFoeTRocDY4c3BpdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/twQYPSiVdcq3s2KFyo/giphy.gif'></img>
            <div className='section has-text-centered login-section'>
                <Link to={'/dotDiary'}><img width="250" src='src/assets/images/DotDiary_logo.png'></img></Link>
                <form onSubmit={handleSubmit}>
                    <h2 className='title is-4'>LOGIN</h2>
                    <div className='field'>
                        <label className='label has-text-left'>Username</label>
                        <div className='control has-icons-left'>
                            <input className='input is-small' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-solid fa-user"></i>
                            </span>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label has-text-left'>Password</label>
                        <div className='control has-icons-left'>
                            <input className='input is-small' type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-solid fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <button className='button is-primary' type='submit'>Login</button>
                </form>
                <p className='box'>New to DotDiary? <Link className='has-text-primary' to={'/signup'}>Sign Up</Link></p>
            </div>
        </>
    )
}