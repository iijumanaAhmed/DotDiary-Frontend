import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'

import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/Auth/ProtectedRoute'

import Login from './components/Auth/Login'
import SignUp from './components/Auth/Signup'
import UserProfile from './components/UserProfile/UserProfile'

import FocusLogsIndex from './components/FocusLogsIndex/FocusLogsIndex'
import FocusLogForm from './components/FocusLogForm/FocusLogForm'
import FocusLogSession from './components/FocusLogSession/FocusLogSession'
import SessionDetail from './components/FocusLogSession/SessionDetail/SessionDetail'

import ToDoListForm from './components/ToDoListForm/ToDoListForm'
import ToDoListDetail from './components/ToDoListDetail/ToDoListDetail'

import DotDiary from './components/DotDiary/DotDiary'
import WeeklySummary from './components/WeeklySummary/WeeklySummary'

import { getUserFromToken } from './lib/auth'

function App() {

  const [user, setUser] = useState(getUserFromToken())
  const [todolistId, setTodolistId] = useState(null)

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />

      <Routes>
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile/:userid' element={<ProtectedRoute> <UserProfile user={user} setUser={setUser} /> </ProtectedRoute>}></Route>

        <Route path='/dotDiary' element={<ProtectedRoute> <DotDiary user={user} /> </ProtectedRoute>}></Route>
        <Route path='/weeklySummary' element={<ProtectedRoute> <WeeklySummary user={user} /> </ProtectedRoute>}></Route>
        <Route path='/focusLogs' element={<ProtectedRoute> <FocusLogsIndex user={user} /> </ProtectedRoute>}></Route>
        <Route path='/focusLogs/newSession' element={<ProtectedRoute> <FocusLogForm user={user} todolistId={todolistId} /> </ProtectedRoute>}></Route>
        <Route path='/focusLogs/:sessionId/currentSession' element={<ProtectedRoute> <FocusLogSession user={user} /> </ProtectedRoute>}></Route>
        <Route path='/focusLogs/:sessionId' element={<ProtectedRoute> <SessionDetail user={user} /> </ProtectedRoute>}></Route>

        <Route path='/toDoLists' element={<ProtectedRoute> <ToDoListForm user={user} setTodolistId={setTodolistId} /> </ProtectedRoute>}></Route>
        <Route path='/toDoLists/:toDoListId' element={<ProtectedRoute> <ToDoListDetail user={user} /> </ProtectedRoute>}></Route>
      </Routes>
    </Router>
  )
}

export default App
