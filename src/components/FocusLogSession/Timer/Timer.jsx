import { useState, useRef } from "react"

function Timer({ setSessionData, sessionData }) {
    // Used to create simple timer: https://www.youtube.com/watch?v=ZhW7sB70lZ4
    // Used to update the timer using useState, useRef: https://medium.com/swlh/creating-a-simple-countdown-timer-using-react-useref-hook-92ae5b6210cb
    const [starting, setStarting] = useState(false)
    const [durationTime, setDurationTime] = useState("00:00:00")
    const [timeStart, setTimeStart] = useState(null)
    const intervalRef = useRef()

    function startTime() {
        const date = new Date()
        const time = date.getHours().toString().padStart(2, "0")
            + ':' + date.getMinutes().toString().padStart(2, "0")
            + ':' + date.getSeconds().toString().padStart(2, "0")
        setTimeStart(time)
    }

    function startTimer() {
        if (starting) {
            return
        } else {
            startTime()
            setStarting(true)
            let hr, min, sec
            let [hours, minutes, seconds] = durationTime.split(":").map(Number)
            intervalRef.current = setInterval(() => {
                seconds++
                if (seconds === 60) {
                    seconds = 0
                    minutes++
                }
                if (minutes === 60) {
                    minutes = 0
                    hours++
                }
                hr = hours.toString().padStart(2, "0")
                min = minutes.toString().padStart(2, "0")
                sec = seconds.toString().padStart(2, "0")
                const timer = `${hr}:${min}:${sec}`
                setDurationTime(timer)
            }, 1000)
        }
    }

    function stopTimer() {
        if (!starting) {
            return
        } else {
            setStarting(false)
            const date = new Date()
            const timeEnd = date.getHours().toString().padStart(2, "0")
                + ':' + date.getMinutes().toString().padStart(2, "0")
                + ':' + date.getSeconds().toString().padStart(2, "0")
            setSessionData({ ...sessionData, start_time: timeStart, end_time: timeEnd, total_duration: durationTime })
            clearInterval(intervalRef.current)
        }
    }

    return (
        <div>
            <h2 id='timer'>{durationTime}</h2>
            {
                !starting
                    ?
                    <button id='startBtn' onClick={startTimer}>{durationTime !== '00:00:00' ? 'Resume' : 'Start'}</button>
                    :
                    <button id='stopBtn' onClick={stopTimer}>Stop</button>
            }
        </div>
    )
}

export default Timer