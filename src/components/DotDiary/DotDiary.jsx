import { Link } from 'react-router'

function DotDiary({ user }) {
    return (
        <div>
            {
                user
                    ?
                    <>
                        <h1>DotDiary Main page</h1>
                        <Link to='/focusLogs'>Focus Sessions</Link>
                        <Link to='/toDoLists'>ToDo Lists</Link>
                        <Link to='/weeklySummary'>Weekly Summary</Link>
                    </>
                    :
                    <p>unathorized user</p>
            }
        </div>
    )
}

export default DotDiary
