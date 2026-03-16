import React from 'react'
import useAlert from '../hooks/alertHooks'
import { alertStyle } from '../styles/style'

export default function Alert() {
	const { alertStatus, alertMessage, handleAlertPath, isAlertOpen } = useAlert()

	const { alertPosition, alertGroup, alertIcon, alertDescription } = alertStyle(alertStatus)

	const alert = () => (
		<div className={alertPosition}>
			<div className={alertGroup}>
				<svg 
					className={alertIcon}
					xmlns="http://www.w3.org/2000/svg" 
					height="20px" 
					viewBox="0 -960 960 960" 
					width="20px" 
					fill="currentColor">
					<path d={handleAlertPath()}/>
				</svg>
				<label className={alertDescription}>{alertMessage}</label>
			</div>
		</div>
	)


	return(
		<>
			{isAlertOpen && alert()}
		</>
	)
}