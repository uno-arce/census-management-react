import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/authHooks'

const ProtectedRoute = ({ children }) => {
	const {isUserAuthLoading, isAuthenticated} = useAuth()

	if(isUserAuthLoading) {
		return <div className='flex animate-pulse'></div>
	}

	if(!isAuthenticated) {
		return <Navigate to='/login' replace/>
	}

	return children
}

export default ProtectedRoute