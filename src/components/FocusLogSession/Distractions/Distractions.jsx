import { authRequest } from "../../../lib/auth"

function Distractions({ sessionData, setSessionData }) {
    async function assignDistraction(distractionId) {
        const response = await authRequest({method: 'patch', url: `http://127.0.0.1:8000/api/focusLogs/${sessionData.id}/assignDistraction/${distractionId}/`})
        setSessionData({
            ...sessionData,
            session_distractions: response.data.session_distractions,
            distractions_list: response.data.distractions_list
        })
    }

    async function unassignDistraction(distractionId) {
        const response = await authRequest({method: 'patch', url: `http://127.0.0.1:8000/api/focusLogs/${sessionData.id}/unassignDistraction/${distractionId}/`})
        setSessionData({
            ...sessionData,
            session_distractions: response.data.session_distractions,
            distractions_list: response.data.distractions_list
        })
    }

    return (
        <div>
            <h3>Session Distractions:</h3>
            {
                sessionData.session_distractions
                    ?
                    <div>
                        {
                            sessionData.session_distractions.length
                                ?
                                sessionData.session_distractions.map(distraction => {
                                    return (
                                        <div key={distraction.id}>
                                            <img src={`./${distraction.distraction_icon}`} height="50" width="50"></img>
                                            {distraction.distraction_name} 
                                            <button onClick={() => { unassignDistraction(distraction.id) }}>x</button>
                                        </div>
                                    )
                                })
                                :
                                <p>No Distractions</p>
                        }
                    </div>
                    :
                    <p>Loading...</p>
            }

            <h3>Distractions List</h3>
            {
                sessionData.distractions_list
                    ?
                    <div>
                        {
                            sessionData.distractions_list.length
                                ?
                                sessionData.distractions_list.map(distraction => {
                                    return (
                                        <div key={distraction.id}>
                                            <img src={distraction.distraction_icon}  height="50" width="50"></img>
                                            {distraction.distraction_name}
                                            <button onClick={() => { assignDistraction(distraction.id) }}>+</button>
                                        </div>
                                    )
                                })
                                :
                                <p>No Distractions in DB</p>
                        }
                    </div>
                    :
                    <p>Loading...</p>
            }
        </div>
    )
}

export default Distractions
