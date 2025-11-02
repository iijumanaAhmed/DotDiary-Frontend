import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { authRequest } from "../../lib/auth"

import Tasks from './Tasks/Tasks'

function ToDoList({ user, setTodolistId, sessionId, todolist }) {
    const { toDoListId } = useParams()
    const navigate = useNavigate()

    const [todolistData, setTodoListData] = useState({
        list_title: ''
    })

    let updatedTodolist = {}

    async function displayToDoList() {
        const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/toDoLists/${toDoListId}` })
        setTodoListData(response.data)
        console.log(response.data)
        console.log(todolistData)
    }

    async function sessionToDoList() {
        const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/toDoLists/${todolist}` })
        setTodoListData(response.data)
        updatedTodolist = response.data
        console.log(response.data)
        console.log(updatedTodolist)
    }
    useEffect(() => {
        if (toDoListId) {
            displayToDoList()
        } else if (sessionId) {
            sessionToDoList()
        }
    }, [])

    function handleChange(event) {
        setTodoListData({ ...todolistData, [event.target.name]: event.target.value })
        console.log(todolistData)
    }

    async function addToDoList(event) {
        event.preventDefault()
        let response = {}
        if (todolistData.list_title === '' || todolistData.list_title === null) {
            console.error('write your to do list title');
        } else {
            response = await authRequest({ data: todolistData, method: 'post', url: 'http://127.0.0.1:8000/api/toDoLists/' })
            console.log("post: ", response)
            console.log("post data: ", response.data)
        }

        if (response.status === 201) {
            setTodolistId(response.data.id)
            navigate(`/toDoLists/${response.data.id}`)
        }
    }

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
                        <div>
                            <h1> {todolist} To Do List </h1>
                            <form onSubmit={updateToDoList}>
                                <div>
                                    <label htmlFor='list_title'> Current To Do List </label>
                                    <input value={todolistData.list_title} onChange={handleChange} id='list_title' name='list_title'></input>
                                </div>
                                <button type='submit'>Update</button>
                            </form>
                            <Tasks toDoListId={todolist} todolistData={todolistData} setTodoListData={setTodoListData} sessionId={sessionId} />
                            <button type='submit' onClick={deleteToDoList}>Delete</button>
                            <button type='submit' onClick={currentSession}>Next</button>
                        </div>
                        :
                        toDoListId
                            ?
                            <>
                                <h1> {toDoListId} To Dooooo List </h1>
                                <form onSubmit={updateToDoList}>
                                    <div>
                                        <label htmlFor='list_title'> Current To Do List </label>
                                        <input value={todolistData.list_title} onChange={handleChange} id='list_title' name='list_title'></input>
                                    </div>
                                    <button type='submit'>Update</button>
                                </form>
                                <Tasks toDoListId={toDoListId} todolistData={todolistData} setTodoListData={setTodoListData} />
                                <button type='submit' onClick={deleteToDoList}>Delete</button>
                                <button type='submit' onClick={currentSession}>Next</button>
                            </>
                            :
                            <>
                                <h1>Create To Do List FOR SESSION</h1>
                                <form onSubmit={addToDoList}>
                                    <div>
                                        <label htmlFor='list_title'> To Do List </label>
                                        <input value={todolistData.list_title} onChange={handleChange} id='list_title' name='list_title'></input>
                                    </div>
                                    <button type='submit'>Create</button>
                                </form>
                            </>
                    :
                    <p>unathorized user</p>
            }
        </div>
    )
}

export default ToDoList
