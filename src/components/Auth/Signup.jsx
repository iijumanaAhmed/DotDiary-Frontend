import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'

export default function SignUp() {
    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://127.0.0.1:8000/api/signup/', { first_name, last_name, username, password, email })
            navigate('/login')
        } catch (err) {
            console.error(err)
            alert('Signup failed')
        }
    }

    return (
        <>
            <img className='singup-login-background' src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHQycTJjOGYyejZkZHN2M2xobWk4dWN2c2NkMTFoeTRocDY4c3BpdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/twQYPSiVdcq3s2KFyo/giphy.gif'></img>
            <div className='section has-text-centered signup-section'>
                <Link to={'/dotDiary'}><img width="250" src='src/assets/images/DotDiary_logo.png'></img></Link>
                <form onSubmit={handleSubmit}>
                    <h2 className='title is-4'>SIGN UP</h2>
                    <div className='field columns'>
                        <div className='column'>
                            <label className='label has-text-left'>First Name</label>
                            <div className='control has-icons-left'>
                                <input className='input is-small' placeholder='Firstname' value={first_name} onChange={e => setFirstname(e.target.value)} required />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-solid fa-id-card"></i>
                                </span>
                            </div>
                        </div>
                        <div className='column'>
                            <label className='label has-text-left'>Last Name</label>
                            <div className='control has-icons-left'>
                                <input className='input is-small' placeholder='Lastname' value={last_name} onChange={e => setLastname(e.target.value)} required />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-solid fa-id-card"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label has-text-left'>Username</label>
                        <div className='control has-icons-left'>
                            <input className='input is-small' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} required />
                            <span className="icon is-small is-left">
                                <i className="fas fa-solid fa-user"></i>
                            </span>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label has-text-left'>Email</label>
                        <div className='control has-icons-left'>
                            <input className='input is-small' type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label has-text-left'>Password</label>
                        <div className='control has-icons-left'>
                            <input className='input is-small' type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
                            <span className="icon is-small is-left">
                                <i className="fas fa-solid fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <button className='button is-primary' type='submit'>Sign Up</button>
                </form>
                <p className='box'>Already have an account? <Link className='has-text-primary' to={'/login'}>Login</Link></p>
            </div>
        </>
    )
}