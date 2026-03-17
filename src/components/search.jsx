import React from 'react'

export default function Search({ value, onChange, placeholder }) {
    return (
        <div className='relative w-full max-w-[400px]'>
            <input
                type='text'
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className='w-full bg-component-surface text-sm border border-base-light/20 rounded-lg px-4 py-2 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all'
            />
        </div>
    )
}