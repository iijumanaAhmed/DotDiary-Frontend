import { Link } from 'react-router'

function NavBar({ user }) {
    return (
        <nav className='navbar level'>
            {
                user
                    ?
                    <>
                        <Link className='level-item has-text-primary has-text-weight-semibold' to={'/focusLogs'}>FOCUS SESSIONS</Link>
                        <Link className='level-item has-text-primary has-text-weight-semibold' to={'/toDoLists'}>TO-DO LISTS</Link>
                        <Link><img className='level-item'  width='150' src='..\..\..\src\assets\images\DotDiary_logo.png'></img></Link>
                        <Link className='level-item has-text-primary has-text-weight-semibold' to='/weeklySummary'>WEEKLY SUMMARY</Link>
                        <Link className='level-item has-text-primary has-text-weight-semibold' to={`/profile/${user.user_id}`}>PROFILE</Link>
                    </>
                    :
                    null
            }
        </nav>
    )
}

export default NavBar