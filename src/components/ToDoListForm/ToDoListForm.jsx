import { useState } from 'react'
import { useNavigate } from 'react-router'

import { authRequest } from "../../lib/auth"

function ToDoListForm({ user, setTodolistId }) {
    const navigate = useNavigate()

    const [todolistData, setTodoListData] = useState({
        list_title: ''
    })

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

    return (
        <div>
            {
                user
                    ?
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

export default ToDoListForm
