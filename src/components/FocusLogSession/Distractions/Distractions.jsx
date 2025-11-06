import { authRequest } from '../../../lib/auth'

function Distractions({ sessionData, setSessionData }) {

    async function assignDistraction(distractionId) {
        const response = await authRequest({ method: 'patch', url: `http://127.0.0.1:8000/api/focusLogs/${sessionData.id}/assignDistraction/${distractionId}/` })
        setSessionData({
            ...sessionData,
            session_distractions: response.data.session_distractions,
            distractions_list: response.data.distractions_list
        })
    }

    async function unassignDistraction(distractionId) {
        const response = await authRequest({ method: 'patch', url: `http://127.0.0.1:8000/api/focusLogs/${sessionData.id}/unassignDistraction/${distractionId}/` })
        setSessionData({
            ...sessionData,
            session_distractions: response.data.session_distractions,
            distractions_list: response.data.distractions_list
        })
    }

    return (
        <div>
            {
                sessionData.session_distractions
                    ?
                    <div className='is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-left session-distraction-flex'>
                        {
                            sessionData.session_distractions.length
                                ?
                                sessionData.session_distractions.map(distraction => {
                                    return (
                                        <div key={distraction.id} className='cell distraction-cell'>
                                            <img src={`http://127.0.0.1:8000${distraction.distraction_icon}`} height="50" width="50"></img>
                                            <button onClick={() => { unassignDistraction(distraction.id) }}><i class="fa-solid fa-xmark"></i></button>
                                            <p className='has-text-dark has-text-weight-semibold'>{distraction.distraction_name}</p>
                                        </div>
                                    )
                                })
                                :
                                null
                        }
                    </div>
                    :
                    <p className='subtitle is-6 has-text-grey'>Loading...</p>
            }
            <hr />
            {
                sessionData.distractions_list
                    ?
                    <div className='is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-left session-distraction-flex'>
                        {
                            sessionData.distractions_list.length
                                ?
                                sessionData.distractions_list.map(distraction => {
                                    return (
                                        <div key={distraction.id} className='cell distraction-cell'>
                                            <img src={`http://127.0.0.1:8000${distraction.distraction_icon}`} height="50" width="50"></img>
                                            <button onClick={() => { assignDistraction(distraction.id) }}><i class="fa-solid fa-plus"></i></button>
                                            <p className='has-text-dark has-text-weight-semibold'>{distraction.distraction_name}</p>
                                        </div>
                                    )
                                })
                                :
                                null
                        }
                    </div>
                    :
                    <p className='subtitle is-6 has-text-grey'>Loading...</p>
            }
        </div>
    )
}

export default Distractions
