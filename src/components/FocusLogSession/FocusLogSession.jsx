import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authRequest } from "../../lib/auth"

import Distractions from './Distractions/Distractions'
import ToDoListDetail from '../../components/ToDoListDetail/ToDoListDetail'
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
                            <div className='has-text-centered'>
                                <div className='section'>
                                    <span className='title is-3 has-text-dark is-capitalized'>{sessionData.focus_title} Focus Session</span>
                                    <button className='button is-danger is-pulled-right' type='submit' onClick={deleteSession}>Delete Session</button>
                                </div>
                                <div className='section grid'>
                                    <div className='cell'>
                                        <ToDoListDetail user={user} sessionId={sessionId} sessionData={sessionData} />
                                    </div>
                                    <div className='cell'>
                                        <div className='columns session-timer'>
                                            <Timer setSessionData={setSessionData} sessionData={sessionData} />
                                        </div>
                                        <div className='column session-distractions'>
                                            <p className='has-text-dark has-text-weight-semibold'>Session Distractions</p>
                                            <div className='grid'>
                                                <Distractions sessionData={sessionData} setSessionData={setSessionData} />
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSessionEnd}>
                                        <div className='cell'>
                                            <div className='columns session-tag-level'>
                                                <div className='column'>
                                                    <p className='has-text-dark has-text-weight-semibold'>Session Tag</p>
                                                    <p className='has-text-primary has-text-weight-semibold'>
                                                        {
                                                            tags.map(tag => {
                                                                return (
                                                                    tag.id === sessionData.tag ? tag.tag_name : ''
                                                                )
                                                            }
                                                            )
                                                        }
                                                    </p>
                                                </div>
                                                <div className='column'>
                                                    <p className='has-text-dark has-text-weight-semibold'>Focus Level</p>
                                                    <div className='select is-small'>
                                                        <select onChange={handleChange} id='focus_level' name='focus_level'>
                                                            <option value={''}></option>
                                                            <option value={'1'}>Distracted</option>
                                                            <option value={'2'}>Unfocused</option>
                                                            <option value={'3'}>Average</option>
                                                            <option value={'4'}>Focused</option>
                                                            <option value={'5'}>Flow State</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='columns session-outcomes'>
                                                <div className='column'>
                                                    <p className='has-text-dark has-text-weight-semibold'>Outcomes</p>
                                                    <textarea className='input' onChange={handleChange} id='outcomes' name='outcomes'></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <button className='button is-primary create-button is-pulled-right' type='submit'>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </>
                        :
                        null
                    :
                    <p className='subtitle is-4 has-text-dark'>unathorized user</p>
            }
        </div >
    )
}

export default FocusLogSession
