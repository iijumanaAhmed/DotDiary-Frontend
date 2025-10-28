import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'

function FocusLogSession() {
    const { sessionId } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        todolist: '',
        tag: null,
        status: null,
        focus_level: null,
        outcomes: '',
    })

    const [tags, setTags] = useState([])

    async function previewSession() {
        const response = await axios.get(`http://127.0.0.1:8000/api/focusLogs/${sessionId}`)
        setFormData(response.data)
    }
    useEffect(() => {
        if (sessionId) {
            previewSession()
        }
    }, [])

    async function retriveTags() {
        const response = await axios.get('http://127.0.0.1:8000/api/tags/')
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
            if ((formData.tag === '' || formData.status === '' || formData.focus_level === '') || (formData.tag === null || formData.status === null || formData.focus_level === null)) {
                // testing with log -> later will be handeled in the page
                console.error('must be selected')
            } else {
                response = await axios.put(`http://127.0.0.1:8000/api/focusLogs/${sessionId}/`, formData)
            }
        } else {
            if (formData.tag === '' || formData.tag === null) {
                console.error('tag must be selected');
            } else {
                response = await axios.post('http://127.0.0.1:8000/api/focusLogs/', formData)
            }

        }
        console.log(response)

        if (response.status === 201 || response.status === 200) {
            navigate(`/focusLogs/${response.data.id}/currentSession`)
        }
    }

    return (
        <div>
            {
                sessionId
                    ?
                    <>
                        <h1>Focus Session {sessionId}</h1>
                        <button>start</button>
                        <button>pause</button>
                        <button>end</button>
                        <form onSubmit={handleSessionEnd}>
                            <div>
                                <label htmlFor='todolist'> To Do List </label>
                                {/* Add the component (ToDoList) */}
                            </div>
                            <div>
                                {/* Timer will be active later on */}
                                <h2>00:00:00</h2>
                            </div>
                            <div>
                                <p> Session Tag: {
                                    tags.map(tag => {
                                        return (
                                            tag.id === formData.tag ? tag.tag_name : null
                                        )
                                    }
                                    )}
                                </p>
                            </div>
                            <div>
                                <label htmlFor='focus_level'> Focus Level: </label>
                                <select value={formData.focus_level} onChange={handleChange} id='focus_level' name='focus_level'>
                                    <option value={''}></option>
                                    <option value={1}>Distracted</option>
                                    <option value={2}>Unfocused</option>
                                    <option value={3}>Average</option>
                                    <option value={4}>Focused</option>
                                    <option value={5}>Flow State</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='outcomes'> Outcomes: </label>
                                <textarea value={formData.outcomes} onChange={handleChange} id='outcomes' name='outcomes'></textarea>
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
            }
        </div>
    )
}

export default FocusLogSession
