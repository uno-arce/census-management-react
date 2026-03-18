import React from 'react'
import Button from '../components/button'
import { NavLink } from 'react-router-dom'
import { useUserAuthData } from '../stores/userAuthStore'
import { useSidebarActions } from '../stores/componentStore'

export default function Navbar() {
    const { username } = useUserAuthData()
    const { setIsSidebarOpen } = useSidebarActions()

    const dashboardIcon = <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Z"/></svg>
    const historyIcon = <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q82 0 155.5 35T760-706v-94h80v240H600v-80h110q-41-56-101-88t-129-32q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200q105 0 183.5-68T756-440h82q-8 139-105.5 229.5T480-120Zm50-360H340v-80h110v-160h80v240Z"/></svg>

    return (
        <nav className='flex items-center justify-between px-16 py-6 bg-background'>
            <div className='flex flex-col'>
                <div className='flex items-center gap-2'>
                    <h1 className='text-accent text-3xl font-display font-bold leading-none'>RBI</h1>
                    <span className='text-base text-2xl font-light'>by household</span>
                </div>
                <p className='text-base-light text-sm'>Record of Barangay Inhabitants</p>
            </div>

            <div className='flex items-center gap-12'>
                <div className='flex bg-base-light/5 p-1 rounded-lg'>
                    <NavLink 
                        to='/dashboard' 
                        className={({isActive}) => `flex items-center gap-2 px-6 py-2 rounded-md text-sm font-semibold transition-all ${isActive ? 'bg-interactive text-white shadow-md' : 'text-base hover:bg-base-light/10'}`}
                    >
                        {dashboardIcon} Dashboard
                    </NavLink>
                    <NavLink 
                        to='/history' 
                        className={({isActive}) => `flex items-center gap-2 px-6 py-2 rounded-md text-sm font-semibold transition-all ${isActive ? 'bg-interactive text-white' : 'text-base hover:bg-base-light/10'}`}
                    >
                        {historyIcon} History
                    </NavLink>
                </div>

                <div className='flex items-center gap-4 text-right'>
                    <div className='flex flex-col'>
                        <span className='text-base font-medium'>Hi, {username || 'Gloria'}</span>
                        <span className='text-base-light text-sm'>Admin</span>
                    </div>
                    <Button 
                        call={() => setIsSidebarOpen(true)}
                        variant='h-12 w-12 rounded-full bg-interactive border-2 border-white shadow-sm flex items-center justify-center text-white text-lg font-bold'>
                        {username?.charAt(0).toUpperCase() || 'G'}
                    </Button>
                </div>
            </div>
        </nav>
    )
}