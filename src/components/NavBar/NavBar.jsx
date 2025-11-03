import { Link } from 'react-router'
import LogOutButton from '../Auth/LogOutButton'

function NavBar({ user, setUser }) {
    return (
        <nav>
            {
                user
                    ?
                    <>
                        <image src='../assets/images/dotDiary_logo.png'></image>
                        <Link to={'/dotDiary'}>DotDiary</Link>
                        <Link to={'/focusLogs'}>Focus Sessions</Link>
                        <Link to={'/toDoLists'}>Todo Lists</Link>
                        <Link to='/weeklySummary'>Weekly Summary</Link>
                        <Link to={`/profile/${user.user_id}`}>Profile</Link>
                        <LogOutButton setUser={setUser} />
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