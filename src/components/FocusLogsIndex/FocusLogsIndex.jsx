import { useEffect, useState } from 'react'
import axios from 'axios'

function FocusLogsIndex() {
    const [focusLogs, setFocusLogs] = useState([])

    async function retriveFocusLogs() {
        const response = await axios.get('http://127.0.0.1:8000/api/focusLogs/')
        console.log(response.data)
        setFocusLogs(response.data)
    }
    useEffect(() => {
        retriveFocusLogs()
    }, [])

    return (
        <>
            {/* Display testing */}
            <h1>Focus Logs</h1>
            {
                focusLogs.length
                ?
                focusLogs.map(log => {
                    return (
                        <div key={log.id}>
                            <h4> FocusLog #{log.id} </h4>
                            <p> started at: {log.start_time} </p>
                            <p> ended at: {log.end_time} </p>
                            <p> total duration: {log.total_duration} </p>
                            <p> status: {log.status} </p>
                            <p> focus level: {log.focus_level} </p>
                        </div>
                    )
                })
                :
                <p> No FocusLogs has been created 📋</p>
            }
        </>
    )
}

export default FocusLogsIndex
