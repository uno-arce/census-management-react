// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import ChangePassword from './pages/ChangePassword'
import UpdateRecord from './pages/UpdateRecord'
import AddRecord from './pages/AddRecord'
import './App.css'

// Routing
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>

        <Route
          path='/' 
          element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          }
        />

        <Route
          path='/login' 
          element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          }
        />

        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        />

        <Route
          path='/history'
          element={
            <ProtectedRoute>
              <History/>
            </ProtectedRoute>
          }
        />

        <Route
          path='/change-password'
          element={
            <ProtectedRoute>
              <ChangePassword/>
            </ProtectedRoute>
          }
        />

        <Route
          path='/update-record/:recordId'
          element={
            <ProtectedRoute>
              <UpdateRecord/>
            </ProtectedRoute>
          }
        />

        <Route
          path='/add-record'
          element={
            <ProtectedRoute>
              <AddRecord/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </ Router>
  )
}

export default App
