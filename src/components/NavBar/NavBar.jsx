import { Link } from 'react-router'
import LogOutButton from '../Auth/LogOutButton'

function NavBar({ user, setUser }) {
    return (
        <nav>
            {
                user
                    ?
                    <>
                        <LogOutButton setUser={setUser} />
                        <Link to={'/focusLogs'}>Focus Sessions</Link>
                        <Link to={'/toDoLists'}>Todo Lists</Link>
                        <Link to={'/userprofile'}>Account</Link>
                    </>
                    :
                    <>
                        <Link to={'/signup'}>Sign Up</Link>
                        <Link to={'/login'}>Log In</Link>
                    </>
            }
        </nav>
    )
}

export default NavBar