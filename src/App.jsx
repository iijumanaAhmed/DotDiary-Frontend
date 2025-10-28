import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router'

import FocusLogsIndex from './components/FocusLogsIndex/FocusLogsIndex'
import FocusLogSession from './components/FocusLogSession/FocusLogSession'

function App() {
  async function makeRequest() {
    const response = await axios.get('http://127.0.0.1:8000/api/')
    console.log(response)
  }
  makeRequest()

  return (
    <Router>
      <Routes>
        <Route path='/focusLogs' element={<FocusLogsIndex />}></Route>
        <Route path='/focusLogs/newSession' element={<FocusLogSession />}></Route>
      </Routes>
    </Router>
  )
}

export default App
