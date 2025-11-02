import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'

import Distractions from '../FocusLogSession/Distractions/Distractions'

function SessionDetail() {
    const { sessionId } = useParams()
    const navigate = useNavigate()

    const [session, setSession] = useState({})

    async function previewSession() {
        const response = await axios.get(`http://127.0.0.1:8000/api/focusLogs/${sessionId}`)
        setSession(response.data)
    }
    useEffect(() => {
        if (sessionId) {
            previewSession()
        }
    }, [])

    async function deleteSession() {
        let response = {}
        response = await axios.delete(`http://127.0.0.1:8000/api/focusLogs/${sessionId}/`)
        if (response.status === 204) {
            navigate(`/focusLogs`)
        }
    }

    return (
        <div>
            <h1>Session #{session.id} Detail</h1>
            <p>started at: {session.start_time}</p>
            <p>ended at: {session.end_time}</p>
            <p>total duration: {session.total_duration}</p>
            <p>focus level: {session.focus_level}</p>
            <p>outcomes: {session.outcomes}</p>
            <p>to do list</p>
            <p>tag</p>
            <p>distractions</p>
            <Distractions session={session} setSession={setSession} />
            <button onClick={deleteSession}>Delete</button>
        </div>
    )
}

export default SessionDetail
