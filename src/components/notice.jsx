import React from 'react'

export default function Notice({ message }) {
	return (
		<div className='bg-base-light/40 text-base text-sm p-[0.5rem] rounded-sm'>
			{message}
		</div>
	)
}