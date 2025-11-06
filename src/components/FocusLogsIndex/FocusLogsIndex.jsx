import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { authRequest } from "../../lib/auth"

function FocusLogsIndex({ user }) {
    const [focusLogs, setFocusLogs] = useState([])

    const FOCUS_LEVEL = {
        1: 'Distracted',
        2: 'Unfocused',
        3: 'Average',
        4: 'Focused',
        5: 'Flow State'
    }

    async function displayFocusLogs() {
        const response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/focusLogs/' })
        const user_sessions = response.data.filter(session => session.user == user.user_id)
        setFocusLogs(user_sessions)
    }
    useEffect(() => {
        displayFocusLogs()
    }, [])

    return (
        <>
            {
                user
                    ?
                    focusLogs.length
                        ?
                        <div className='focusLogs-index-section'>
                            <div className='section'>
                                <span className='title is-3 has-text-dark'>FOCUS SESSIONS</span>
                                <Link className='button is-danger is-pulled-right' to='/toDoLists/newToDoList'>Start new Focus Session</Link>
                            </div>
                            <div className='section is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-left'>
                                {
                                    focusLogs.map(log => {
                                        return (
                                            <div key={log.id} className='focuslog-card card'>
                                                <Link className='subtitle has-text-dark is-6 has-text-weight-medium is-capitalized' to={`/focusLogs/${log.id}`}>{log.focus_title}<p className='subtitle has-text-dark is-5 has-text-weight-bold is-capitalized'>Focus Session</p></Link>
                                                <div className='columns focuslog-summary'>
                                                    <div className='column'>
                                                        <p className='has-text-dark has-text-weight-semibold'>Total Duration</p>
                                                        <p className='tag is-dark has-text-light has-text-weight-medium'>{log.total_duration}</p>
                                                    </div>
                                                    <div className='column'>
                                                        <p className='has-text-dark has-text-weight-semibold'>Focus Level</p>
                                                        <p className={log.focus_level === 1 ? 'tag is-danger has-text-weight-medium' : log.focus_level === 2 ? 'tag is-info has-text-weight-medium' : log.focus_level === 3 ? 'tag is-warning has-text-weight-medium' : log.focus_level === 4 ? 'tag is-primary has-text-weight-medium' : log.focus_level === 5 ? 'tag is-success has-text-weight-medium' : 'is-hidden'}>{FOCUS_LEVEL[log.focus_level]}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                        :
                        <div>
                            <div className='section'>
                                <h1 className='title is-3 has-text-dark'>FOCUS SESSIONS</h1>
                            </div>
                            <div className='section has-text-centered focusLogs-index-empty-section has-background-white-ter'>
                                <p className='title is-3 has-text-info is-capitalized'>Ready to flow? Your first session starts here.</p>
                                <p className='title is-4 has-text-dark has-text-weight-semibold'>Hit start and feel the difference focus makes.</p>
                                <p className='title is-4 has-text-dark has-text-weight-semibold'>The best time to start is now. Let’s go.</p>
                                <Link className='button is-success' to='/toDoLists/newToDoList'>Start new Focus Session</Link>
                            </div>
                        </div>
                    :
                    <p className='subtitle is-4 has-text-dark'>unathorized user</p>
            }
        </>
    )
}

export default FocusLogsIndex
