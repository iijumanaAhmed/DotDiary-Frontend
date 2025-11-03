import { useEffect, useState } from 'react'

import { authRequest } from '../../../../lib/auth'

function Task({ toDoListId, taskId }) {

    const [taskData, setTaskData] = useState({
        task: '',
        is_done: '',
        priority: ''
    })

    const PRIORITY = {
        L: 'Low',
        M: 'Medium',
        H: 'High'
    }

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
                    <input value={PRIORITY[taskData.priority]} onChange={handleChange} id='task' name='task' disabled></input>
                </div>
                <button type='submit'>^</button>
            </form>
        </div>
    )
}

export default Task
