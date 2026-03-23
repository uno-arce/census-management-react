import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSidebarData, useSidebarActions } from '../stores/componentStore'
import useAuth from '../hooks/authHooks'
import ToggleTheme from './ToggleTheme'
import Button from './button'

export default function Sidebar() {
    const { isSidebarOpen } = useSidebarData()
    const { setIsSidebarOpen } = useSidebarActions()
    const { logout } = useAuth()

    return (
        <>
            {isSidebarOpen && (
                <div 
                    className='fixed inset-0 bg-base/20 backdrop-blur-sm z-40'
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className={`fixed top-0 right-0 h-full w-[350px] bg-component-surface shadow-2xl z-50 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} p-8 flex flex-col gap-8`}>
                <div className='flex justify-between items-center border-b border-base-light/10 pb-4'>
                    <h2 className='text-xl font-display'>Settings</h2>
                    <button onClick={() => setIsSidebarOpen(false)} className='text-2xl hover:text-accent'>&times;</button>
                </div>

                <div className='flex flex-col gap-2'>
                    <span className='text-xs font-bold uppercase tracking-widest text-base-light'>Appearance</span>
                    <div className='flex justify-between items-center bg-background p-4 rounded-md'>
                        <span className='text-sm'>Switch Theme</span>
                        <ToggleTheme />
                    </div>
                </div>

                <div className='flex flex-col gap-4 mt-4'>
                    <span className='text-xs font-bold uppercase tracking-widest text-base-light'>Account Security</span>
                    <NavLink 
                        to="/change-password" 
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) => 
                            `button-accent w-full justify-start flex items-center px-4 py-2 ${isActive ? 'opacity-100 ring-2 ring-accent/50' : 'opacity-80'}`
                        }
                    >
                        Change Password
                    </NavLink>
                </div>

                <div className='mt-auto pt-8 border-t border-base-light/10'>
                    <Button 
                        name='Logout Session'
                        variant='button-primary w-full bg-red-600 hover:bg-red-700'
                        call={logout}
                    />
                </div>
            </div>
        </>
    )
}