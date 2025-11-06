import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authRequest } from '../../lib/auth'

import Tasks from '../ToDoListForm/Tasks/Tasks'

function ToDoListDetail({ user, sessionId, sessionData }) {
    const { toDoListId } = useParams()
    const navigate = useNavigate()

    const [todolistData, setTodoListData] = useState({
        list_title: ''
    })

    function handleChange(event) {
        setTodoListData({ ...todolistData, [event.target.name]: event.target.value })
        console.log(todolistData)
    }

    async function displayToDoList() {
        const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/toDoLists/${toDoListId}` })
        setTodoListData(response.data)
        console.log('todolist:', todolistData)
    }

    async function displaySessionToDoList() {
        let response = {}
        response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/focusLogs/${sessionId}/` })

        response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/toDoLists/${response.data.todolist}` })
        setTodoListData(response.data)
        console.log('todolist data:', response.data)
        console.log('todolist:', todolistData)
    }

    useEffect(() => {
        if (user) {
            if (toDoListId) {
                displayToDoList()
            } else if (sessionId) {
                displaySessionToDoList()
            }
        }
    }, [])


    async function updateToDoList(event) {
        event.preventDefault()
        let response = {}
        if (todolistData.list_title === '' || todolistData.list_title === null) {
            console.error('title must be written')
        } else {
            response = await authRequest({ data: todolistData, method: 'put', url: `http://127.0.0.1:8000/api/toDoLists/${toDoListId}/` })
            console.log("put: ", response)
            console.log("put data: ", response.data)
        }

        if (response.status === 200) {
            navigate(`/toDoLists/${response.data.id}`)
        }
    }

    async function updateList(event) {
        event.preventDefault()
        let response = {}
        if (todolistData.list_title === '' || todolistData.list_title === null) {
            console.error('title must be written')
        } else {
            response = await authRequest({ data: todolistData, method: 'put', url: `http://127.0.0.1:8000/api/toDoLists/${sessionData.todolist}/` })
            console.log("session put: ", response)
            console.log("session put data: ", response.data)
        }
    }

    async function deleteToDoList() {
        const response = await authRequest({ method: 'delete', url: `http://127.0.0.1:8000/api/toDoLists/${toDoListId}/` })
        console.log("delete: ", response)
        console.log("delete data: ", response.data)

        if (response.status === 204) {
            setTodoListData({ list_title: '' })
            navigate(`/toDoLists`)
        }
    }
    function currentSession() {
        navigate(`/focusLogs/newSession`)
    }

    return (
        <div>
            {
                user
                    ?
                    sessionId
                        ?
                        <table className='table session-todolist-table'>
                            <thead>
                                <tr>
                                    <td className='task-td'>
                                        <form onSubmit={updateList}>
                                            <div className='field columns'>
                                                <div className='column'>
                                                    <div className='control has-icons-left'>
                                                        <input className='input is-small' value={todolistData.list_title} onChange={handleChange} id='list_title' name='list_title' required></input>
                                                        <span class="icon is-small is-left">
                                                            <i class="fa-solid fa-list"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <button className='button is-primary is-small update-button' type='submit'>Update</button>
                                            </div>
                                        </form>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    todolistData.tasks
                                        ?
                                        <Tasks toDoListId={todolistData.id} todolistData={todolistData} setTodoListData={setTodoListData} />
                                        :
                                        <tr>
                                            <td>
                                                <p className='has-text-grey-light has-text-weight-semibold'> No Tasks Assigned...</p>
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                        :
                        toDoListId
                            ?
                            <>
                                <div className='section has-text-centered create-tasks-section'>
                                    <img width='100' src='..\src\assets\images\two.gif'></img>
                                    <h1 className='title is-3'>Add Your Tasks To Achieve!</h1>
                                    <form onSubmit={updateToDoList}>
                                        <div className='field columns'>
                                            <div className='column'>
                                                <div className='control has-icons-left'>
                                                    <input className='input is-small' value={todolistData.list_title} onChange={handleChange} id='list_title' name='list_title' required></input>
                                                    <span class="icon is-small is-left">
                                                        <i class="fa-solid fa-list"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <button className='button is-primary todolist-title-update' type='submit'>Update</button>
                                        </div>
                                    </form>
                                    <table className='table tabel-tasks-section'>
                                        <tbody>
                                            <Tasks toDoListId={toDoListId} todolistData={todolistData} setTodoListData={setTodoListData} />
                                        </tbody>
                                    </table>
                                    <div className='todolist-buttons'>
                                        <button className='button is-danger' type='submit' onClick={deleteToDoList}>Delete To-Do List</button>
                                        <button className='button is-success' type='submit' onClick={currentSession}>Next</button>
                                    </div>
                                </div>
                            </>
                            :
                            null
                    :
                    <p className='subtitle is-4 has-text-dark'>unathorized user</p>
            }
        </div>
    )
}

export default ToDoListDetail
