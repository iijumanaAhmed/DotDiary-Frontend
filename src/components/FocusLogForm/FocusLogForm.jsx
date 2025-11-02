import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { authRequest } from '../../lib/auth'

function FocusLogForm({ user, todolistId }) {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        user: user.user_id,
        tag: '',
        focus_level: '',
        outcomes: '',
        start_time: '',
        end_time: '',
        total_duration: '',
    })

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
        setFormData({ ...formData, [event.target.name]: event.target.value })
        console.log(formData)
    }
    let updatedtasksData = {}

    async function handleSessionEnd(event) {
        event.preventDefault()
        let response = {}
        if (formData.tag === '' || formData.tag === null) {
            console.error('tag must be selected');
        } else {
            updatedtasksData = {
                ...formData,
                todolist: todolistId
            }
            response = await authRequest({ data: updatedtasksData, method: 'post', url: 'http://127.0.0.1:8000/api/focusLogs/' })
        }
        console.log(response)
        console.log(response.data.id)

        if (response.status === 201) {
            navigate(`/focusLogs/${response.data.id}/currentSession`)
        }
    }

    return (
        <>
            {
                user
                    ?
                    <>
                        <h1> start Focus Session </h1>
                        <form onSubmit={handleSessionEnd}>
                            <div>
                                <label htmlFor='tag'> Session Tag </label>
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
                    <p>unatorized user</p>
            }
        </>
    )
}

export default FocusLogForm
