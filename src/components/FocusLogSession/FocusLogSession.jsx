import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authRequest } from "../../lib/auth"

function FocusLogSession({ user }) {
    const { sessionId } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        user: user.user_id,
        tag: '',
        status: '',
        focus_level: 1,
        outcomes: '',
    })

    const [sessionData, setSessionData] = useState({})
    const [tags, setTags] = useState([])

    async function previewSession() {
        const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/focusLogs/${sessionId}` })
        setFormData(response.data)
        setSessionData(formData)
        console.log(response.data)
        console.log('formData:', formData)
        console.log('sessionData:', sessionData)
    }
    useEffect(() => {
        if (sessionId) {
            previewSession()
        }
    }, [])

    async function retriveTags() {
        const response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/tags/' })
        console.log(response.data)
        setTags(response.data)
    }
    useEffect(() => {
        retriveTags()
    }, [])

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        console.log(formData)
    }

    async function handleSessionEnd(event) {
        event.preventDefault()
        let response = {}
        if (sessionId) {
            if (formData.tag === '' || formData.tag === null || formData.focus_level === null) {
                // testing with log -> later will be handeled in the page
                console.error('must be selected')

            } else {
                response = await authRequest({ data: formData, method: 'put', url: `http://127.0.0.1:8000/api/focusLogs/${sessionId}/` })
            }
        } else {
            if (formData.tag === '' || formData.tag === null) {
                console.error('tag must be selected');
            } else {
                response = await authRequest({ data: formData, method: 'post', url: 'http://127.0.0.1:8000/api/focusLogs/' })
            }

        }
        console.log(response)

        if (response.status === 201) {
            setSessionData(response.data)
            console.log('session DATA:', sessionData)
            navigate(`/focusLogs/${response.data.id}/currentSession`)
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
                            <button>start</button>
                            <button>pause</button>
                            <button>end</button>
                            <form onSubmit={handleSessionEnd}>
                                <div>
                                    <h3> Session Tag: {
                                        tags.map(tag => {
                                            return (
                                                tag.id === formData.tag ? tag.tag_name : ''
                                            )
                                        }
                                        )}
                                    </h3>
                                </div>
                                <div>
                                    <label htmlFor='todolist'> To Do List </label>
                                    {/* Add the component (ToDoList) */}
                                </div>
                                <div>
                                    {/* Timer will be active later on */}
                                    <h2>00:00:00</h2>
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
                        </>
                        :
                        <>
                            <h1> start Focus Session </h1>
                            <form onSubmit={handleSessionEnd}>
                                <div>
                                    {/* will be updated to displayed from the child component (Tag) */}
                                    <label htmlFor='status'> Session Tag </label>
                                    {
                                        tags.length
                                            ?
                                            <select value={formData.tag} onChange={handleChange} id='tag' name='tag'>
                                                <option value={''}></option>
                                                {
                                                    tags.map(tag => {
                                                        return (
                                                            <option id='tag' name='tag' value={tag.id} key={tag.id}>{tag.tag_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            :
                                            <p>No Tags Found !!</p>
                                    }
                                </div>
                                <button type='submit'>Submit</button>
                            </form>
                        </>
                    :
                    <p>unathorized user</p>
            }
        </div >
    )
}

export default FocusLogSession
