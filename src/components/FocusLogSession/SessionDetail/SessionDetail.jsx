import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { authRequest } from "../../../lib/auth"

function SessionDetail({ user }) {
    const { sessionId } = useParams()
    const navigate = useNavigate()

    const [session, setSession] = useState({})
    const [tags, setTags] = useState([])
    async function retriveTags() {
        const response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/tags/' })
        console.log(response.data)
        setTags(response.data)
    }
    useEffect(() => {
        retriveTags()
    }, [])
    async function previewSession() {
        const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/focusLogs/${sessionId}` })
        setSession(response.data)
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
                        <h1>Session #{session.id} Detail</h1>
                        <p>started at: {session.start_time}</p>
                        <p>ended at: {session.end_time}</p>
                        <p>total duration: {session.total_duration}</p>
                        <p>focus level: {session.focus_level}</p>
                        <p>outcomes: {session.outcomes}</p>
                        <p>to do list</p>
                        <p>tag: {
                            tags.map(tag => {
                                return (
                                    tag.id === session.tag ? tag.tag_name : ''
                                )
                            }
                            )}
                        </p>
                        <p>distractions :</p>
                        {
                            session.session_distractions
                                ?
                                <div>
                                    {
                                        session.session_distractions.length
                                            ?
                                            session.session_distractions.map(distraction => {
                                                return (
                                                    <div key={distraction.id}>
                                                        <img src={`./${distraction.distraction_icon}`} height="50" width="50"></img>
                                                        {distraction.distraction_name}
                                                    </div>
                                                )
                                            })
                                            :
                                            <p>Great work! you were not distracted 😁</p>
                                    }
                                </div>
                                :
                                null
                        }
                        <button onClick={deleteSession}>Delete</button>
                    </>
                    :
                    <p>unathorized user</p>
            }
        </div>
    )
}

export default SessionDetail
