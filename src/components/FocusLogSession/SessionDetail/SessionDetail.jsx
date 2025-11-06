import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authRequest } from "../../../lib/auth"

function SessionDetail({ user }) {
    const { sessionId } = useParams()
    const navigate = useNavigate()

    const [tags, setTags] = useState([])
    const [session, setSession] = useState({})
    const [todolist, setToDoList] = useState({})

    const FOCUS_LEVEL = {
        1: 'Distracted',
        2: 'Unfocused',
        3: 'Average',
        4: 'Focused',
        5: 'Flow State'
    }

    const PRIORITY = {
        'L': 'Low',
        'M': 'Medium',
        'H': 'High'
    }

    async function retriveTags() {
        const response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/tags/' })
        setTags(response.data)
    }
    useEffect(() => {
        retriveTags()
    }, [])

    async function previewSession() {
        let response = {}
        response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/focusLogs/${sessionId}` })
        setSession(response.data)
        console.log(response.data)

        response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/toDoLists/${response.data.todolist}` })
        setToDoList(response.data)
        console.log(response.data)
    }
    useEffect(() => {
        if (sessionId) {
            previewSession()
        }
    }, [])

    async function deleteSession() {
        let response = {}
        response = await authRequest({ method: 'delete', url: `http://127.0.0.1:8000/api/focusLogs/${sessionId}/` })
        response = await authRequest({ method: 'delete', url: `http://127.0.0.1:8000/api/toDoLists/${session.todolist}/` })

        if (response.status === 204) {
            navigate(`/focusLogs`)
        }
    }

    return (
        <div>
            {
                user
                    ?
                    <>
                        <div className='section has-text-centered'>
                            <div className='section'>
                                <h1 className='title is-3 has-text-dark is-capitalized'>{session.focus_title} Focus Session</h1>
                            </div>
                            <div className='grid'>
                                <div className='cell'>
                                    <table className='table session-todolist-table'>
                                        <thead>
                                            <tr>
                                                <th className='has-text-dark has-text-weight-semibold is-capitalized has-text-centered' colSpan='3'>{todolist.list_title} To-Do List</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                todolist.tasks
                                                    ?
                                                    todolist.tasks.length
                                                        ?
                                                        todolist.tasks.map(task => {
                                                            return (
                                                                <tr key={task.id} className={task.is_done ? 'has-background-success-light' : 'has-background-danger-light'}>
                                                                    <td>
                                                                        {
                                                                            task.is_done
                                                                                ?
                                                                                <span className="icon is-small is-left">
                                                                                    <i className="fa-solid fa-square-check fa-lg check-color"></i>
                                                                                </span>
                                                                                :
                                                                                <span className="icon is-small is-left">
                                                                                    <i className="fa-solid fa-square-xmark fa-lg uncheck-color"></i>
                                                                                </span>
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <p className={task.priority === 'H' ? 'tag is-danger has-text-weight-bold' : task.priority === 'M' ? 'tag is-warning has-text-weight-bold' : task.priority === 'L' ? 'tag is-success has-text-weight-bold' : 'is-hidden'}> {PRIORITY[task.priority]}</p>
                                                                    </td>
                                                                    <td className='task-task'>
                                                                        <p className='subtitle is-6 has-text-dark is-capitalized'> {task.task}</p>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            <td>
                                                                <p className='has-text-grey-light has-text-weight-semibold'> No Tasks Assigned...</p>
                                                            </td>
                                                        </tr>
                                                    :
                                                    <tr>
                                                        <td>
                                                            <p className='has-text-grey-light has-text-weight-semibold'> No To-Do List Created at This Session</p>
                                                        </td>
                                                    </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className='cell'>
                                    <div className='columns session-timer'>
                                        <div className='column'>
                                            <p className='has-text-dark has-text-weight-semibold'>Start Time</p>
                                            <p className='has-text-success has-text-weight-semibold'>{session.start_time}</p>
                                        </div>
                                        <div className='column'>
                                            <p className='has-text-dark has-text-weight-semibold'>End Time</p>
                                            <p className='has-text-danger has-text-weight-semibold'>{session.end_time}</p>
                                        </div>
                                        <div className='column'>
                                            <p className='has-text-dark has-text-weight-semibold'> Total Duration</p>
                                            <p className='has-text-info has-text-weight-semibold'>{session.total_duration}</p>
                                        </div>
                                    </div>
                                    <div className='column session-distractions'>
                                        <p className='has-text-dark has-text-weight-semibold'>Session Distractions</p>
                                        <div className='is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-left distraction-flex'>
                                            {
                                                session.session_distractions
                                                    ?
                                                    session.session_distractions.length
                                                        ?
                                                        session.session_distractions.map(distraction => {
                                                            return (
                                                                <div key={distraction.id} className='cell distraction-cell'>
                                                                    <img src={`http://127.0.0.1:8000${distraction.distraction_icon}`} height="50" width="50"></img>
                                                                    <p className='has-text-dark has-text-weight-semibold'>{distraction.distraction_name}</p>
                                                                </div>
                                                            )
                                                        })
                                                        :
                                                        <p className='has-text-grey-light has-text-weight-semibold'>Great work! you were not distracted 😁😁😁</p>
                                                    :
                                                    null
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='cell'>
                                    <div className='columns session-tag-level'>
                                        <div className='column'>
                                            <p className='has-text-dark has-text-weight-semibold'>Session Tag</p>
                                            <p className='has-text-primary has-text-weight-semibold'>
                                                {
                                                    tags.map(tag => {
                                                        return (
                                                            tag.id === session.tag ? tag.tag_name : ''
                                                        )
                                                    }
                                                    )
                                                }
                                            </p>
                                        </div>
                                        <div className='column'>
                                            <p className='has-text-dark has-text-weight-semibold'>Focus Level</p>
                                            <p className={session.focus_level === 1 ? 'tag is-danger has-text-weight-bold' : session.focus_level === 2 ? 'tag is-info has-text-weight-bold' : session.focus_level === 3 ? 'tag is-warning has-text-weight-bold' : session.focus_level === 4 ? 'tag is-primary has-text-weight-bold' : session.focus_level === 5 ? 'tag is-success has-text-weight-bold' : 'is-hidden'}>{FOCUS_LEVEL[session.focus_level]}</p>
                                        </div>
                                    </div>
                                    <div className='columns session-outcomes'>
                                        <div className='column'>
                                            <p className='has-text-dark has-text-weight-semibold'>Outcomes</p>
                                            <p className='has-text-grey-light has-text-weight-semibold'>{session.outcomes}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <p className='subtitle is-4 has-text-dark'>unathorized user</p>
            }
        </div>
    )
}

export default SessionDetail
