import React from 'react'

export default function Placeholder({ isLoading, isEmpty, skeletonNumbers, structure, emptyView, children }) {
    const skeleton = [...Array(skeletonNumbers)].map((_, index) => (
        <div key={index} className={`${structure.skeleton} animate-pulse`} />
    ))

    if (isLoading) {
        return structure.parent === 'tbody' ? (
            <tbody><tr><td colSpan="12" className="p-0">{skeleton}</td></tr></tbody>
        ) : (
            <div className={structure.parent}>{skeleton}</div>
        )
    }

    if (isEmpty) {
        return emptyView ? (
            structure.parent === 'tbody' ? <tbody>{emptyView}</tbody> : <div>{emptyView}</div>
        ) : null
    }

    return <>{children}</>
}