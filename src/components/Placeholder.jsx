import React from 'react'

export default function Placeholder({ isLoading, isEmpty, skeletonNumbers, structure, emptyView, children}) {
	const skeleton = [...Array(skeletonNumbers)].map((_, index) => (
		<div key={index} className={`${structure.skeleton} animate-pulse`}/>
	))

	return (
		<div>
			{isLoading ? (
				<div
					key='skeleton'
					className={structure.parent}>
					{skeleton}
				</div>
			) : isEmpty ? (
				emptyView ? (
					<div
						key='empty'
						className='relative z-1'>
						{emptyView}
					</div>
				) : null
			) : (
				<div>
					{children}
				</div>
			)}
		</div>
	)
}