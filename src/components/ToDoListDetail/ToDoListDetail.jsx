import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authRequest } from '../../lib/auth'

import Tasks from '../ToDoListForm/Tasks/Tasks'
// todo:
// 1. handle displaying tasks

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
        // undefined on todolist id
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
                        <div>
                            <h1> {sessionData.todolist} - {todolistData.list_title} session To Do List </h1>
                            <form onSubmit={updateList}>
                                <div>
                                    <label htmlFor='list_title'> Current To Do List </label>
                                    <input value={todolistData.list_title} onChange={handleChange} id='list_title' name='list_title'></input>
                                </div>
                                <button type='submit'>Update</button>
                            </form>
                            <Tasks toDoListId={todolistData.id} todolistData={todolistData} setTodoListData={setTodoListData} />
                        </div>
                        :
                        toDoListId
                            ?
                            <>
                                <h1> {toDoListId} - {todolistData.list_title} To Dooooo List </h1>
                                <form onSubmit={updateToDoList}>
                                    <div>
                                        <label htmlFor='list_title'> Current To Do List </label>
                                        <input value={todolistData.list_title} onChange={handleChange} id='list_title' name='list_title'></input>
                                    </div>
                                    <button type='submit'>Update</button>
                                </form>
                                {/* <Tasks toDoListId={toDoListId} todolistData={todolistData} setTodoListData={setTodoListData} /> */}
                                <button type='submit' onClick={deleteToDoList}>Delete</button>
                                <button type='submit' onClick={currentSession}>Next</button>
                            </>
                            :
                            <p>no todolist id</p>
                    :
                    <p>unathorized user</p>
            }
        </div>
    )
}

export default ToDoListDetail


// <div>
//     <h1> {todolistData.list_title} To Do List Detail</h1>
//     {/* <form onSubmit={updateToDoList}>
//             <div>
//                 <label htmlFor='list_title'> Current To Do List </label>
//                 <input value={todolistData.list_title} onChange={handleChange} id='list_title' name='list_title'></input>
//             </div>
//             <button type='submit'>Update</button>
//         </form>
//         <Tasks toDoListId={todolist} todolistData={todolistData} setTodoListData={setTodoListData} sessionId={sessionId} />
//         <button type='submit' onClick={deleteToDoList}>Delete</button>
//         <button type='submit' onClick={currentSession}>Next</button> */}
// </div>
