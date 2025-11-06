import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { authRequest } from '../../lib/auth'

function FocusLogForm({ user, todolistId }) {
    const navigate = useNavigate()

    const [foocusLogData, setFocusLogData] = useState({
        user: user.user_id,
        focus_title: '',
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
        setTags(response.data)
    }
    useEffect(() => {
        retriveTags()
    }, [])

    function handleChange(event) {
        setFocusLogData({ ...foocusLogData, [event.target.name]: event.target.value })
    }
    let updatedwithTasksData = {}

    async function handleSessionCreation(event) {
        event.preventDefault()
        let response = {}
        if (foocusLogData.tag === '' || foocusLogData.tag === null) {
            console.error('tag must be selected');
        } else {
            updatedwithTasksData = {
                ...foocusLogData,
                todolist: todolistId
            }
            response = await authRequest({ data: updatedwithTasksData, method: 'post', url: 'http://127.0.0.1:8000/api/focusLogs/' })
        }
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
                        <div className='section has-text-centered create-focusLog-section'>
                            <img width='100' src='..\src\assets\images\three.gif'></img>
                            <h1 className='title is-3'>Create Your Session</h1>
                            <form onSubmit={handleSessionCreation}>
                                <div className='field columns'>
                                    <div className='column'>
                                        <label className='label has-text-left' htmlFor='focus_title'>Session Title</label>
                                        <div className='control has-icons-left'>
                                            <input className='input is-small' value={foocusLogData.focus_title} onChange={handleChange} id='focus_title' name='focus_title'></input>
                                            <span class="icon is-small is-left">
                                                <i class="fa-solid fa-bars-staggered"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='column'>
                                        <label className='label has-text-left' htmlFor='tag'>Session Tag</label>
                                        <div className='select is-small'>
                                            {
                                                tags.length
                                                    ?
                                                    <select className='tags-list' value={foocusLogData.priority} onChange={handleChange} id='tag' name='tag' required>
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
                                                    null
                                            }
                                        </div>
                                    </div>
                                </div>
                                <button className='button is-info create-button' type='submit'>Create</button>
                            </form>
                        </div>
                    </>
                    :
                    <p>unatorized user</p>
            }
        </>
    )
}

export default FocusLogForm
