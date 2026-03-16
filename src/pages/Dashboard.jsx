import React from 'react'
import Button from '../components/button'
import useAuth from '../hooks/authHooks'

export default function Dashboard() {
	const { logout } = useAuth()
	return (
		<div className='grid'>
			Dashboard
			<Button
				name='Logout'
				call={logout}
			/>
		</div>
	)
}