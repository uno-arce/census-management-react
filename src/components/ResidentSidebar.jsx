import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from './button'
import Modal from './modal'
import useResidentSidebar from '../hooks/sidebarHooks'
import useModal from '../hooks/modalHooks'
import useCensus from '../hooks/censusHooks'

export default function ResidentSidebar({ isOpen, data, onUpdate, onDelete }) {
    const { closeSidebar } = useResidentSidebar()
    const { openModal } = useModal()
    const { handlePrepareUpdate } = useCensus(false)
    
    if (!data) return null

    const trashIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
        </svg>
    )

    return (
        <>
            <aside className={`fixed top-0 right-0 h-full w-[400px] bg-component-surface border-l border-base-light/20 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-8 h-full flex flex-col font-body">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-display font-bold text-accent">Resident Profile</h3>
                        <button onClick={closeSidebar} className="text-base-light hover:text-base">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                        <section>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-base-light font-bold mb-1">Full Name</p>
                            <p className="text-sm font-medium text-base">{data.firstName} {data.lastName}</p>
                        </section>

                        <div className="grid grid-cols-2 gap-4">
                            <section>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-base-light font-bold mb-1">Sex</p>
                                <p className="text-sm">{data.sex}</p>
                            </section>
                            <section>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-base-light font-bold mb-1">Status</p>
                                <p className="text-sm">{data.civilStatus}</p>
                            </section>
                        </div>

                        <section>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-base-light font-bold mb-1">Address</p>
                            <p className="text-sm leading-relaxed">{data.blkLotStr}, {data.sudbZnPrk}</p>
                        </section>

                        <section>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-base-light font-bold mb-1">Occupation</p>
                            <p className="text-sm">{data.occupation || 'Unspecified'}</p>
                        </section>
                    </div>

                    <div className="pt-8 border-t border-base-light/20 flex flex-col gap-3">
                        <NavLink 
                            to={`/update-record/${data.id}`}
                            onClick={() => {
                                handlePrepareUpdate(data)
                                closeSidebar()      
                            }}
                            className="button-primary text-center w-full py-4"
                        >
                            Update Resident
                        </NavLink>
                        <Button 
                        	name='Delete Record'
                            variant="w-full py-3 text-red-400 border border-red-500/10 hover:bg-red-500/5 rounded-sm text-sm font-medium transition-all"
                            call={() => openModal({
                                title: "Delete Record?",
                                description: <>Are you sure you want to delete <b>{data.firstName} {data.lastName}</b>?</>,
                                variant: "danger",
                                confirmText: "Delete",
                                icon: trashIcon,
                                onConfirm: async () => {
                                    await onDelete([data.id])
                                    closeSidebar()    
                                }
                            })}
                        >
                        </Button>
                    </div>
                </div>
            </aside>
            <Modal />
        </>
    )
}