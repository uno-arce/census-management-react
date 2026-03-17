import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './sidebar'
import Alert from './alert'

export default function ProtectedLayout() {
    return (
        <div>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
            <Sidebar/>
            <Alert />
        </div>
    )
}