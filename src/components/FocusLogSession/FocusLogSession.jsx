import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authRequest } from "../../lib/auth"

import Distractions from './Distractions/Distractions'
import Timer from './Timer/Timer'

function FocusLogSession({ user }) {
    const { sessionId } = useParams()
    const navigate = useNavigate()

    const [sessionData, setSessionData] = useState({
        user: user.user_id,
        tag: '',
        focus_level: '',
        outcomes: '',
        start_time: '',
        end_time: '',
        total_duration: '',
    })

    let updatedtasksData = {}

    async function previewSession() {
        const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/focusLogs/${sessionId}` })
        setSessionData(response.data)
        updatedtasksData = response.data
        console.log(response.data)
        console.log('updatedtasksData:', updatedtasksData)

    }
    useEffect(() => {
        if (sessionId) {
            previewSession()
        }
    }, [])

    const [tags, setTags] = useState([])
    async function retriveTags() {
        const response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/tags/' })
        console.log(response.data)
        setTags(response.data)
    }
    useEffect(() => {
        retriveTags()
    }, [])

    function handleChange(event) {
        setSessionData({ ...sessionData, [event.target.name]: event.target.value })
        console.log(sessionData)
    }

    async function handleSessionEnd(event) {
        event.preventDefault()
        let response = {}
        if (sessionId) {
            if (sessionData.tag === '' || sessionData.tag === null || sessionData.focus_level === null) {
                console.error('must be selected')

            } else {
                response = await authRequest({ data: sessionData, method: 'put', url: `http://127.0.0.1:8000/api/focusLogs/${sessionId}/` })
            }
        }
        if (response.status === 200) {
            navigate(`/focusLogs`)
        }
    }

    async function deleteSession() {
        let response = {}
        response = await authRequest({ method: 'delete', url: `http://127.0.0.1:8000/api/focusLogs/${sessionId}/` })
        response = await authRequest({ method: 'delete', url: `http://127.0.0.1:8000/api/toDoLists/${sessionData.todolist}/` })
        if (response.status === 204) {
            navigate(`/focusLogs`)
        }
    }


    return (
        <div>
            {
                user
                    ?
                    sessionId
                        ?
                        <>
                            <h1> Focus Session {sessionId}</h1>
                            <div>
                                <Timer setSessionData={setSessionData} sessionData={sessionData} />
                            </div>
                            <form onSubmit={handleSessionEnd}>
                                <div>
                                    <h3> Session Tag: {
                                        tags.map(tag => {
                                            return (
                                                tag.id === sessionData.tag ? tag.tag_name : ''
                                            )
                                        }
                                        )}
                                    </h3>
                                </div>
                                <div>
                                    <label htmlFor='focus_level'> Focus Level: </label>
                                    <select onChange={handleChange} id='focus_level' name='focus_level'>
                                        <option value={''}></option>
                                        <option value={'1'}>Distracted</option>
                                        <option value={'2'}>Unfocused</option>
                                        <option value={'3'}>Average</option>
                                        <option value={'4'}>Focused</option>
                                        <option value={'5'}>Flow State</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor='outcomes'> Outcomes: </label>
                                    <textarea onChange={handleChange} id='outcomes' name='outcomes'></textarea>
                                </div>
                                <button type='submit'>Submit</button>
                            </form>
                            <Distractions sessionData={sessionData} setSessionData={setSessionData} />
                            <button type='submit' onClick={deleteSession}>Delete</button>
                        </>
                        :
                        null
                    :
                    <p>unathorized user</p>
            }
        </div >
    )
}

export default FocusLogSession
