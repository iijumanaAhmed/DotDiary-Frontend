// DONE

import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { authRequest } from "../../lib/auth"

function WeeklySummary({ user }) {
    const [weekSessions, setWeekSessions] = useState([])

    const FOCUS_LEVEL = {
        1: 'Distracted',
        2: 'Unfocused',
        3: 'Average',
        4: 'Focused',
        5: 'Flow State'
    }
    async function displayFocusLogs() {
        const response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/focusLogs/' })
        console.log(response.data)
        const date = new Date()
        const week = new Date(date)
        week.setDate(date.getDate() - 7)
        const week_sesssions = response.data.filter(session => {
            const sessionDate = new Date(session.created_at);
            return sessionDate >= week && sessionDate <= date && session.user == user.user_id;
        });

        setWeekSessions(week_sesssions)
        console.log(week_sesssions)
    }
    useEffect(() => {
        displayFocusLogs()
    }, [])

    return (
        <div>
            {
                user
                    ?
                    weekSessions.length
                        ?
                        <div className='focusLogs-index-section'>
                            <div className='section'>
                                <h1 className='title is-3 has-text-dark'>WEEKLY SUMMARY</h1>
                            </div>
                            <div className='section is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-left'>
                                {
                                    weekSessions.map(log => {
                                        return (
                                            <div key={log.id} className='focuslog-card card'>
                                                <div>
                                                    <Link className='subtitle has-text-dark is-6 has-text-weight-medium is-capitalized' to={`/focusLogs/${log.id}`}>{log.focus_title}</Link> | <p className='tag has-text-dark has-text-weight-medium is-small'>{log.created_at}</p>
                                                </div>
                                                <p className='subtitle has-text-dark is-5 has-text-weight-bold is-capitalized'>Focus Session</p>
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
                        <div className='focusLogs-index-section'>
                            <div className='section'>
                                <h1 className='title is-3 has-text-dark'>WEEKLY SUMMARY</h1>
                            </div>
                            <div className='section has-text-centered todolists-index-empty-section'>
                                <p className='title is-5 has-text-grey-light is-capitalized'>No Sessions created in the last week</p>
                            </div>
                        </div>
                    :
                    <p className='subtitle is-4 has-text-dark'>unathorized user</p>
            }
        </div>
    )
}

export default WeeklySummary
