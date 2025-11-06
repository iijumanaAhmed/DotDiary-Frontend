// DONE

import { useEffect, useState } from 'react'
import { authRequest } from "../../lib/auth"

function ToDoListsIndex({ user }) {
    const [todolists, setTodolists] = useState([])

    async function displayToDoLists() {
        let response = {}
        response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/focusLogs/' })
        const user_sessions = response.data.filter(session => session.user == user.user_id)

        response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/toDoLists/' })
        const sessions_todolists = response.data.filter(todolist => user_sessions.some(session => session.todolist === todolist.id))
        setTodolists(sessions_todolists)
    }
    useEffect(() => {
        displayToDoLists()
    }, [])

    return (
        <>
            {
                user
                    ?
                    todolists.length
                        ?
                        <div className='focusLogs-index-section'>
                            <div className='section'>
                                <h1 className='title is-3 has-text-dark'>TO-DO LISTS</h1>
                            </div>
                            <div className='section is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-left'>
                                {
                                    todolists.map(list => {
                                        return (
                                            <div key={list.id} className='focuslog-card card'>
                                                <p className='subtitle has-text-success is-6 has-text-weight-medium is-capitalized'>{list.list_title} <p className='subtitle has-text-dark is-5 has-text-weight-bold is-capitalized'>TO-DO List</p></p>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                        :
                        <div className='focusLogs-index-section'>
                            <div className='section'>
                                <h1 className='title is-3 has-text-dark'>TO-DO LISTS</h1>
                            </div>
                            <div className='section has-text-centered todolists-index-empty-section'>
                                <p className='title is-5 has-text-grey-light is-capitalized'>No TO-DO Lists Created</p>
                            </div>
                        </div>
                    :
                    <p className='subtitle is-4 has-text-dark'>unathorized user</p>
            }
        </>
    )
}

export default ToDoListsIndex
