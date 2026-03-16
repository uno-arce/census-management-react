import React from 'react'
import useCollection from '../hooks/collectionHooks'

export default function Collection({ items, isSelectable, openCollection, isOpen, renderItem, structure,children}) {

	const { collectionSelectedIndex } = useCollection()

	const dataCollection = items.map((item, index) => {
		return(
			<div 
				className={collectionSelectedIndex === index ? 'collection-item-active' : null }
				key={index}
				onClick={() => openCollection(item, index, isSelectable)} 
			>
				{renderItem(item, index)}
			</div>
		)
	})
	return(
		<div className={structure} {...motionProps}>
			{dataCollection}
			
			{isOpen && children}
		</div>
	)
}