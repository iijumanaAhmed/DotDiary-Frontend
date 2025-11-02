import React from 'react'
import { useState, useEffect } from 'react'

function Timer({ setFormData, formData }) {
    // https://www.youtube.com/watch?v=ZhW7sB70lZ4
    let timer, time
    let manageInterval
    let timeStart
    function startTime() {
        const date = new Date()
        timeStart = date.getHours().toString().padStart(2, "0")
            + ':' + date.getMinutes().toString().padStart(2, "0")
            + ':' + date.getSeconds().toString().padStart(2, "0")
    }
    // useEffect(() => {
    //     startTime()
    // }, [])

    function startTimer() {
        const startBtn = document.getElementById('startBtn')
        const stopBtn = document.getElementById('stopBtn')
        startBtn.style.display = 'none'
        stopBtn.style.display = 'inline-block'
        timer = document.getElementById('timer')
        time = timer.textContent
        let hr, min, sec
        let [hours, minutes, seconds] = time.split(":").map(Number)

        manageInterval = setInterval(() => {
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
            time = `${hr}:${min}:${sec}`
            timer.textContent = time
        }, 1000)

        startTime()
    }

    function stopTimer() {
        const startBtn = document.getElementById('startBtn')
        const stopBtn = document.getElementById('stopBtn')
        startBtn.style.display = 'inline-block'
        startBtn.innerHTML = 'Resume'
        stopBtn.style.display = 'none'

        const date = new Date()
        const showTime = date.getHours().toString().padStart(2, "0")
            + ':' + date.getMinutes().toString().padStart(2, "0")
            + ':' + date.getSeconds().toString().padStart(2, "0")
        console.log(showTime)
        setFormData({ ...formData, start_time: timeStart, end_time: showTime, total_duration: time })
        clearInterval(manageInterval)
    }

    return (
        <div>
            <h2 id='timer'>00:00:00</h2>
            <button id='startBtn' onClick={startTimer}>Start</button>
            <button id='stopBtn' onClick={stopTimer}>Stop</button>
        </div>
    )
}

export default Timer
