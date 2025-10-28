import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'

function FocusLogSession() {
    const [formData, setFormData] = useState({
        todolist: '',
        tag: '',
        status: '',
        focus_level: '',
        outcomes: '',
    })

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        console.log(formData)
    }

    async function handleSessionEnd(event) {
        event.preventDefault()
        let response = {}
        response = await axios.post('http://127.0.0.1:8000/api/focusLogs/', formData)
        console.log(response)
    }

    return (
        <div>
            <h1> Focus Session </h1>
            <form onSubmit={handleSessionEnd}>
                <div>
                    <label htmlFor='status'> To Do List </label>
                    {/* Add the component (ToDoList) */}
                </div>
                <div>
                    <label htmlFor='status'> Session Tag </label>
                    {/* Add the child component (Tag) */}
                </div>
                <div>
                    <label htmlFor='status'> Session Status </label>
                    <select value={formData.status} onChange={handleChange} id='status' name='status'>
                        <option value={'S'}>Started</option>
                        <option value={'P'}>Paused</option>
                        <option value={'E'}>Ended</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='focus_level'> Focus Level: </label>
                    <select value={formData.focus_level} onChange={handleChange} id='focus_level' name='focus_level'>
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
        </div>
    )
}

export default FocusLogSession
