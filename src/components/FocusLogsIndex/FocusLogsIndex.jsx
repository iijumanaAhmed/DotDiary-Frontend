import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import { authRequest } from "../../lib/auth"

function FocusLogsIndex({ user }) {
    const [focusLogs, setFocusLogs] = useState([])

    async function displayFocusLogs() {
        const response = await authRequest({method:'get', url:'http://127.0.0.1:8000/api/focusLogs/'})
        console.log(response.data)
        setFocusLogs(response.data)
    }
    useEffect(() => {
        displayFocusLogs()
    }, [])

    return (
        <>
            {
                user
                    ?
                    <>
                        <h1>User: {user.user_id}</h1>
                        <h1>Focus Logs</h1>
                        <Link to='/focusLogs/newSession'>Start new Focus Session</Link>
                        {
                            focusLogs.length
                                ?
                                focusLogs.map(log => {
                                    return (
                                        <div key={log.id}>
                                            {/* <Link to={`/focusLogs/${log.id}`}>
                                                <h4> FocusLog #{log.id} </h4>
                                            </Link> */}
                                            <p> started at: {log.start_time} </p>
                                            <p> ended at: {log.end_time} </p>
                                            <p> total duration: {log.total_duration} </p>
                                            <p> status: {log.status} </p>
                                            <p> focus level: {log.focus_level} </p>
                                        </div>
                                    )
                                })
                                :
                                <p> No FocusLogs has been created 📋</p>
                        }
                    </>
                    :
                    <p>unathorized user</p>
            }
        </>
    )
}

export default FocusLogsIndex
