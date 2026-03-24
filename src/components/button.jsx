import React from 'react';
import { buttonStyle } from '../styles/style'

export default function Button({name, id, call, isDisabled, variant, children, ...props}) {
	const buttonClasses = buttonStyle(isDisabled)

	return(
		<button 
			className={`${buttonClasses} ${variant || ''}`} 
			type='submit' 
			disabled={isDisabled} 
			onClick={call}
			{...props}
		>
			{name} {children}
		</button>
	)
}