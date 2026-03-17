import React from 'react'
import useCollection from '../hooks/collectionHooks'

export default function Collection({ items = [], isSelectable, openCollection, isOpen, renderItem, structure, children}) {
    const { collectionSelectedIndex } = useCollection()

    const dataCollection = items.map((item, index) => {
        return(
            <tr 
                className={`border-b border-base-light/5 hover:bg-accent/5 transition-colors cursor-pointer ${collectionSelectedIndex === index ? 'bg-accent/10' : ''}`}
                key={item.id || index}
                onClick={() => openCollection && openCollection(item, index, isSelectable)} 
            >
                {renderItem(item, index)}
            </tr>
        )
    })

    const StructureComponent = structure || 'div'

    return(
        <StructureComponent>
            {dataCollection}
            {isOpen && children}
        </StructureComponent>
    )
}