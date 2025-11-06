import { useEffect, useState } from 'react'

import { authRequest } from '../../../../lib/auth'

function Task({ toDoListId, taskId }) {

    const [taskData, setTaskData] = useState({
        task: '',
        is_done: '',
        priority: ''
    })
    const [isChecked, setIsChecked] = useState()

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
        setIsChecked(response.data.is_done)
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

    function handleIsChecked() {
        setIsChecked(!isChecked)
        updateTaskStatus()
    }
    async function updateTaskStatus() {
        const updatedTaskData = {
            ...taskData,
            is_done: !isChecked
        }
        const response = await authRequest({ data: updatedTaskData, method: 'put', url: `http://127.0.0.1:8000/api/toDoLists/${toDoListId}/tasks/${taskId}/` })
    }

    return (
        <form onSubmit={updateTask}>
            <td className='task-td task-col'>
                {/* https://dev.to/collegewap/how-to-work-with-checkboxes-in-react-44bc */}
                <input type='checkbox' checked={isChecked} onChange={handleIsChecked}></input>
            </td>
            <td className='task-td task-col'>
                <input className='input is-small task-input' placeholder='Task' value={taskData.task} onChange={handleChange} id='task' name='task'></input>
            </td>
            <td className='task-td task-col'>
                <div className='select is-small'>
                    <select value={taskData.priority} onChange={handleChange} id='priority' name='priority'>
                        <option value=""></option>
                        <option value="L">Low</option>
                        <option value="M">Medium</option>
                        <option value="H">High</option>
                    </select>
                </div>
            </td>
            <td className='task-td'>
                <button className='button is-primary add-update-delete-button is-pulled-right' type='submit'>
                    <span class="icon">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </span>
                </button>
            </td>
        </form>
    )
}

export default Task
