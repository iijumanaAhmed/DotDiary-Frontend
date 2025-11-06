import { Link } from 'react-router'

function DotDiary() {
    return (
        <>
            <img className='dotdiary-img1' src='src\assets\images\task-management.gif'></img>
            <img className='dotdiary-img2' src='src\assets\images\task.gif'></img>
            <img className='dotdiary-img3' src='src\assets\images\sleep.gif'></img>
            <div className='section has-text-centered'>
                <img width="400" src='src/assets/images/DotDiary_logo.png'></img>
                <p className='subtitle is-3'>Life moves fast. Your mind doesn’t have to.</p>
                <p className='title is-2 has-text-warning'> Welcome to DotDiary, Where Focus Meets Flow.</p>
                <div className='subtitle dotdiary-description'>
                    <span className='has-text-centered has-text-weight-bold tag is-danger is-medium is-rounded dotdiary-tags button is-outlined'>Focus Sessions</span>
                    <span className='has-text-centered has-text-weight-bold tag is-primary is-medium is-rounded dotdiary-tags button is-outlined'>To-Do Lists</span>
                    <span className='has-text-centered has-text-weight-bold tag is-success is-medium is-rounded dotdiary-tags button is-outlined'>Smart Insights</span>
                    <p className='is-4'>Start Your daily achievements for mindful productivity</p>
                </div>
                <div className='dotdiary-buttons'>
                    <Link className='button is-link' to={'/signup'}>Sign Up</Link>
                    <Link className='button is-warning' to={'/login'}>Login</Link>
                </div>
                <p className='subtitle is-4 dotdiary-description'>
                    DotDiary helps you slow down, focus deeply, and reconnect with what truly matters — one mindful session, one small win, one day at a time.
                    Build <span className='has-text-success has-text-weight-semibold'>balance</span>, <span className=' has-text-link has-text-weight-semibold'>clarity</span>, and <span className=' has-text-danger has-text-weight-semibold'>confidence</span>.
                </p>
            </div>
        </>
    )
}

export default DotDiary
