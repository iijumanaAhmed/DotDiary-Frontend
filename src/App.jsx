import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router'

import FocusLogsIndex from './components/FocusLogsIndex/FocusLogsIndex'

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
      </Routes>
    </Router>
  )
}

export default App
