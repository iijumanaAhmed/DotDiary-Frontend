import { useState } from 'react'
import { authRequest } from '../../../lib/auth'

import Task from './Task/Task'

function Tasks({ toDoListId, todolistData, setTodoListData }) {

    const [tasksData, setTasksData] = useState({
        task: '',
        is_done: false,
        priority: ''
    })

    async function displayTasks() {
        const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/toDoLists/${toDoListId}/tasks` })
        setTodoListData({
            ...todolistData,
            tasks: response.data
        })
    }

    function handleChange(event) {
        setTasksData({ ...tasksData, [event.target.name]: event.target.value })
        console.log(tasksData)
    }

    async function addTask(event) {
        event.preventDefault()
        const updatedtasksData = {
            todolist: toDoListId,
            ...tasksData
        }
        const response = await authRequest({ data: updatedtasksData, method: 'post', url: `http://127.0.0.1:8000/api/toDoLists/${toDoListId}/tasks/` })
        setTodoListData({
            ...todolistData,
            tasks: response.data
        })
        setTasksData({
            task: '',
            is_done: false,
            priority: ''
        })
    }

    async function deleteTask(taskId) {
        const response = await authRequest({ method: 'delete', url: `http://127.0.0.1:8000/api/toDoLists/${toDoListId}/tasks/${taskId}/` })
        displayTasks()
    }

    return (
            <>
                <tr>
                    <td colSpan={5}></td>
                </tr>
                <tr>
                    <td colSpan={5}>
                        <form onSubmit={addTask}>
                            <td className='task-td'>
                                <input className='input is-small session-new-task-input' placeholder='Task' value={tasksData.task} onChange={handleChange} id='task' name='task' required></input>
                            </td>
                            <td className='task-td'>
                                <div className='select is-small'>
                                    <select value={tasksData.priority} onChange={handleChange} id='priority' name='priority' required>
                                        <option value=""></option>
                                        <option value="L">Low</option>
                                        <option value="M">Medium</option>
                                        <option value="H">High</option>
                                    </select>
                                </div>
                            </td>
                            <td className='task-td'>
                                <button className='button is-success add-update-delete-button' type='submit'>
                                    <span class="icon is-small">
                                        <i class="fa-solid fa-plus"></i>
                                    </span>
                                </button>
                            </td>
                        </form>
                    </td>
                </tr>
                {
                    todolistData.tasks
                        ?
                        todolistData.tasks.map(task => {
                            return (
                                <tr key={task.id}>
                                    <td className='task-col'>
                                        <Task toDoListId={toDoListId} taskId={task.id} />
                                    </td>
                                    <td>
                                        <td className='task-td'>
                                            <button className='button is-danger add-update-delete-button delete-col' onClick={() => { deleteTask(task.id) }}>
                                                <span class="icon is-small">
                                                    <i class="fa-solid fa-trash"></i>
                                                </span>
                                            </button>
                                        </td>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        null
                }
            </>
    )
}

export default Tasks
