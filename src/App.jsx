import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'

import FocusLogsIndex from './components/FocusLogsIndex/FocusLogsIndex'
import FocusLogSession from './components/FocusLogSession/FocusLogSession'
import SessionDetail from './components/SessionDetail/SessionDetail'

import Login from './components/Auth/Login'
import SignUp from './components/Auth/Signup'
import NavBar from './components/NavBar/NavBar'

import ProtectedRoute from './components/Auth/ProtectedRoute'

import { getUserFromToken } from './lib/auth'

function App() {

  const [user, setUser] = useState(getUserFromToken());

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path='/login' element={<Login setUser={setUser}/>}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/focusLogs' element={<ProtectedRoute> <FocusLogsIndex user={user}/> </ProtectedRoute>}></Route>
        <Route path='/focusLogs/newSession' element={<ProtectedRoute> <FocusLogSession user={user}/> </ProtectedRoute>}></Route>
        <Route path='/focusLogs/:sessionId/currentSession' element={<ProtectedRoute> <FocusLogSession user={user}/> </ProtectedRoute>}></Route>
        <Route path='/focusLogs/:sessionId' element={<ProtectedRoute> <SessionDetail user={user}/> </ProtectedRoute>}></Route>
      </Routes>
    </Router>
  )
}

export default App
