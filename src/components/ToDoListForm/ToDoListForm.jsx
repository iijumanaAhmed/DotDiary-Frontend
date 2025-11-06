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
        <div className='countiner'>
            {
                user
                    ?
                    <div className='section has-text-centered todolist-form-section'>
                        <img width='100' src='..\src\assets\images\one.gif'></img>
                        <h1 className='title is-3'>Create Your Session To-Do List</h1>
                        <form onSubmit={addToDoList}>
                            <div className='field'>
                                <label className='label has-text-left' htmlFor='list_title'>List Title</label>
                                <div className='control has-icons-left'>
                                    <input className='input' value={todolistData.list_title} onChange={handleChange} id='list_title' name='list_title' required></input>
                                    <span class="icon is-small is-left">
                                        <i class="fa-solid fa-list"></i>
                                    </span>
                                </div>
                            </div>
                            <button className='button is-success create-button' type='submit'>Create</button>
                        </form>
                    </div>
                    :
                    <p className='subtitle is-4 has-text-dark'>unathorized user</p>
            }
        </div>
    )
}

export default ToDoListForm
