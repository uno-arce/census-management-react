import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedLayout from './components/ProtectedLayout'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import ChangePassword from './pages/ChangePassword'
import UpdateRecord from './pages/UpdateRecord'
import AddRecord from './pages/AddRecord'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PublicRoute><Login/></PublicRoute>} />
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />

        <Route 
            element={
                <ProtectedRoute>
                    <ProtectedLayout />
                </ProtectedRoute>
            }
        >
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/history' element={<History />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/update-record/:recordId' element={<UpdateRecord />} />
          <Route path='/add-record' element={<AddRecord />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App