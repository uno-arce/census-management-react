import React from 'react'
import useCollection from '../hooks/collectionHooks'

export default function Collection({ items = [], isSelectable, openCollection, isOpen, renderItem, structure, children}) {
    const { collectionSelectedIndex } = useCollection()

    const ItemWrapper = structure === 'tbody' || structure === 'contents' ? 'tr' : 'div'

    const dataCollection = items.map((item, index) => {
        return(
            <ItemWrapper 
                className={`border-b border-base-light/5 hover:bg-accent/5 transition-colors cursor-pointer ${collectionSelectedIndex === index ? 'bg-accent/10' : ''}`}
                key={item.id || index}
                onClick={() => openCollection && openCollection(item, index, isSelectable)} 
            >
                {renderItem(item, index)}
            </ItemWrapper>
        )
    })

    const StructureComponent = structure === 'tbody' ? 'tbody' : (structure === 'contents' ? React.Fragment : 'div')

    return(
        <StructureComponent>
            {dataCollection}
            {isOpen && children}
        </StructureComponent>
    )
}