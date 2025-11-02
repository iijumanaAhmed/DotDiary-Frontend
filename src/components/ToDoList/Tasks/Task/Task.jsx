import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { authRequest } from '../../../../lib/auth'

function Task({ toDoListId, taskId }) {
    const navigate = useNavigate()

    const [taskData, setTaskData] = useState({
        task: '',
        is_done: '',
        priority: ''
    })

    function handleChange(event) {
        setTaskData({ ...taskData, [event.target.name]: event.target.value })
        console.log(taskData)
    }

    async function displayTask() {
        const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/toDoLists/${toDoListId}/tasks/${taskId}/` })
        setTaskData(response.data)
    }
    useEffect(() => {
        if (taskId) {
            displayTask()
        }
    }, [])

    async function updateTask(event) {
        event.preventDefault()
        const response = await authRequest({ data: taskData, method: 'put', url: `http://127.0.0.1:8000/api/toDoLists/${toDoListId}/tasks/${taskId}/` })
        if (response.status === 200) {
            navigate(`/toDoLists/${toDoListId}`)
        }
    }

    return (
        <div>
            <form onSubmit={updateTask}>
                <div>
                    <label htmlFor='task'>task </label>
                    <input value={taskData.task} onChange={handleChange} id='task' name='task'></input>
                </div>
                <div>
                    <label htmlFor='priority'>priority </label>
                    <select value={taskData.priority} onChange={handleChange} id='priority' name='priority'>
                        <option value=""></option>
                        <option value="L">Low</option>
                        <option value="M">Medium</option>
                        <option value="H">High</option>
                    </select>
                </div>
                <button type='submit'>^</button>
            </form>
        </div>
    )
}

export default Task
