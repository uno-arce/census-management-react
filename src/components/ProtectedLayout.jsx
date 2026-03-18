import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './sidebar'

export default function ProtectedLayout() {
    return (
        <div className='flex flex-col h-screen overflow-y-auto'>
            <Navbar/>
            <main className='flex-1'>
                <Outlet/>
                <footer className='w-full border-t border-base-light/20 py-6 text-center mt-auto'>
                    <p className='text-base-light/60 text-xs tracking-widest uppercase'>
                        © 2021 - 2023 Barangay Sampaloc IV
                    </p>
                </footer>
            </main>
            <Sidebar/>
        </div>
    )
}