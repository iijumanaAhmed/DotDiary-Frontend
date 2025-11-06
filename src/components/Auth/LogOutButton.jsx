import { clearTokens } from '../../lib/auth'
import { useNavigate } from 'react-router'

function LogOutButton({ setUser }) {
    const navigate = useNavigate()
    function handleLogOut() {
        clearTokens()
        setUser(null)
        navigate('/login')
    }
    return (
        <button className='button is-danger' onClick={handleLogOut}>Log Out</button>
    )
}

export default LogOutButton