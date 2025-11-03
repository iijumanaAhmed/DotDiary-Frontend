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
        <div>
            {
                todolistData.tasks
                    ?
                    <div>
                        <h3>Tasks:</h3>
                        {
                            todolistData.tasks
                                ?
                                todolistData.tasks.map(task => {
                                    return (
                                        <div key={task.id}>
                                            <Task toDoListId={toDoListId} taskId={task.id} tasksData={tasksData} setTasksData={setTasksData} />
                                            <button onClick={() => { deleteTask(task.id) }}>x</button>
                                        </div>
                                    )
                                })
                                :
                                null
                        }
                        <form onSubmit={addTask}>
                            <div>
                                <label htmlFor='task'>task </label>
                                <input value={tasksData.task} onChange={handleChange} id='task' name='task'></input>
                            </div>
                            <div>
                                <label htmlFor='priority'>priority </label>
                                <select value={tasksData.priority} onChange={handleChange} id='priority' name='priority'>
                                    <option value=""></option>
                                    <option value="L">Low</option>
                                    <option value="M">Medium</option>
                                    <option value="H">High</option>
                                </select>
                            </div>
                            <button type='submit'>+</button>
                        </form>
                    </div>
                    :
                    <form onSubmit={addTask}>
                        <div>
                            <label htmlFor='task'>task </label>
                            <input value={tasksData.task} onChange={handleChange} id='task' name='task'></input>
                        </div>
                        <div>
                            <label htmlFor='priority'>priority </label>
                            <select value={tasksData.priority} onChange={handleChange} id='priority' name='priority'>
                                <option value=""></option>
                                <option value="L">Low</option>
                                <option value="M">Medium</option>
                                <option value="H">High</option>
                            </select>
                        </div>
                        <button type='submit'>+</button>
                    </form>
            }
        </div>
    )
}

export default Tasks
