import React from 'react'
import { NavLink } from 'react-router-dom';
import Search from '../components/search'
import Collection from '../components/collection'
import Button from '../components/button'
import Alert from '../components/alert'
import ResidentSidebar from '../components/ResidentSidebar'
import Modal from '../components/modal'
import Placeholder from '../components/Placeholder'
import Pagination from '../components/Pagination'
import useCensus from '../hooks/censusHooks'
import useCollection from '../hooks/collectionHooks'
import useModal from '../hooks/modalHooks'
import useResidentSidebar from '../hooks/sidebarHooks'
import { useCensusActions } from '../stores/censusStore'
import { useCollectionData, useModalActions } from '../stores/componentStore'

export default function Dashboard() {
    const { 
        records, totalRecords, searchQuery, searchColumn, 
        currentPage, rowsPerPage, sortOrder, sortColumn, tableHeaders, handleUpdate, handleDelete, handleSort, isLoading 
    } = useCensus()
    
    const { setSearchQuery, setSearchColumn, setCurrentPage, setRowsPerPage } = useCensusActions()
    
    const { 
        handleOpenCollectionView, 
        isCollectionOpen, 
        selectedIds, 
        toggleSelect, 
        toggleSelectAll, 
        clearSelection 
    } = useCollection()
    
    const { collectionItem } = useCollectionData()
    const { openModal } = useModal()
    const { setIsModalOpen, setModalConfig } = useModalActions()
    const { closeSidebar } = useResidentSidebar()

    const totalPages = Math.ceil(totalRecords / rowsPerPage)

    const groupsIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M411-480q-28 0-46-21t-13-49l12-72q8-43 40.5-70.5T480-720q44 0 76.5 27.5T597-622l12 72q5 28-13 49t-46 21H411Zm24-80h91l-8-49q-2-14-13-22.5t-25-8.5q-14 0-24.5 8.5T443-609l-8 49ZM124-441q-23 1-39.5-9T63-481q-2-9-1-18t5-17q0 1-1-4-2-2-10-24-2-12 3-23t13-19l2-2q2-19 15.5-32t33.5-13q3 0 19 4l3-1q5-5 13-7.5t17-2.5q11 0 19.5 3.5T208-626q1 0 1.5.5t1.5.5q14 1 24.5 8.5T251-596q2 7 1.5 13.5T250-570q0 1 1 4 7 7 11 15.5t4 17.5q0 4-6 21-1 2 0 4l2 16q0 21-17.5 36T202-441h-78Zm676 1q-33 0-56.5-23.5T720-520q0-12 3.5-22.5T733-563l-28-25q-10-8-3.5-20t18.5-12h80q33 0 56.5 23.5T880-540v20q0 33-23.5 56.5T800-440ZM0-240v-63q0-44 44.5-70.5T160-400q13 0 25 .5t23 2.5q-14 20-21 43t-7 49v65H0Zm240 0v-65q0-65 66.5-105T480-450q108 0 174 40t66 105v65H240Zm560-160q72 0 116 26.5t44 70.5v63H780v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5Zm-320 30q-57 0-102 15t-53 35h311q-9-20-53.5-35T480-370Zm0 50Zm1-280Z"/></svg>
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
    const filterIcon = <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"/></svg>
    const trashIcon = <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>

    return (
        <div className='flex relative overflow-x-hidden min-h-screen bg-background text-base font-body'>
            <main className={`max-lg:px-4 px-16 flex flex-col gap-2 flex-1 transition-all duration-300 w-full min-w-0 ${isCollectionOpen ? 'lg:mr-[400px]' : ''}`}>
                
                <div className='max-md:flex-col max-md:gap-4 max-md:items-stretch flex justify-between items-end border-t border-base-light/20 pt-8'>
                    <div>
                        <h2 className='text-xl text-base font-medium'>Barangay Residents</h2>
                        <p className='text-base-light text-sm'>List of residents in Barangay Sampaloc IV</p>
                    </div>

                    <div className='flex max-sm:flex-col items-center gap-2 max-sm:w-full'>
                        <div className='flex items-center gap-2 bg-component-surface border border-base-light/20 rounded-md pl-3 pr-1 py-1 max-sm:w-full max-sm:justify-between'>
                            <div className='flex items-center gap-2 text-base-light border-r border-base-light/20 pr-2 mr-1'>
                                {filterIcon}
                                <select 
                                    value={searchColumn}
                                    onChange={(e) => setSearchColumn(e.target.value)}
                                    className='bg-transparent outline-none text-xs font-medium cursor-pointer uppercase'
                                >
                                    {tableHeaders.map(col => (
                                        <option key={col.value} value={col.value}>{col.label}</option>
                                    ))}
                                </select>
                            </div>
                            <Search 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={`Search by ${searchColumn}...`}
                            />
                        </div>

                        <div className='flex items-center gap-2 bg-component-surface border border-base-light/20 rounded-md px-3 h-[42px] text-sm max-sm:w-full max-sm:justify-between'>
                            <label className='text-base-light font-normal whitespace-nowrap'>Rows:</label>
                            <select 
                                value={rowsPerPage} 
                                onChange={(e) => {
                                    setRowsPerPage(Number(e.target.value))
                                    setCurrentPage(1)
                                }}
                                className='bg-transparent outline-none font-bold text-accent cursor-pointer'
                            >
                                {[10, 15, 20, 25, 30].map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className='mt-4 max-h-[582px] w-full min-w-0 overflow-x-auto rounded-sm border border-base-light/20 shadow-sm bg-component-surface'>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="hidden sm:table-cell">
                                    <input 
                                        type="checkbox" 
                                        className="cursor-pointer accent-accent"
                                        disabled={isLoading}
                                        checked={records.length > 0 && selectedIds.length === records.length}
                                        onChange={() => toggleSelectAll(records)}
                                    />
                                </th>
                                {tableHeaders.map((header) => {
                                    const isCurrentCol = sortColumn === header.value;
                                    const isMobileVisible = ['lastName', 'firstName', 'blkLotStr', 'sudbZnPrk'].includes(header.value);
                                    
                                    return (
                                        <th 
                                            key={header.value}
                                            className={`cursor-pointer select-none group ${isMobileVisible ? '' : 'hidden sm:table-cell'}`}
                                            onClick={() => !isLoading && handleSort(header.value)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className={isCurrentCol ? 'text-accent font-bold' : 'text-base-light'}>
                                                    {header.label}
                                                </span>
                                                
                                                <div className="flex flex-col text-[8px] leading-[4px]">
                                                    <span className={`${isCurrentCol && sortOrder === 'asc' ? 'text-accent' : 'opacity-20'}`}>
                                                        ▲
                                                    </span>
                                                    <span className={`${isCurrentCol && sortOrder === 'desc' ? 'text-accent' : 'opacity-20'}`}>
                                                        ▼
                                                    </span>
                                                </div>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <Placeholder
                            isLoading={isLoading} 
                            isEmpty={records.length === 0} 
                            skeletonNumbers={rowsPerPage} 
                            structure={{
                                parent: "tbody",
                                skeleton: "h-[52px] w-full border-b border-base-light/10 bg-base-light/15 my-2" 
                            }}
                            emptyView={
                                <tr>
                                    <td colSpan="12" className="text-center py-20 text-base-light opacity-50">
                                        No residents found in Barangay Sampaloc IV
                                    </td>
                                </tr>
                            }
                        >
                            <tbody>
                                <Collection 
                                    items={records}
                                    openCollection={(item, index) => handleOpenCollectionView(item, index, true)}
                                    structure='contents'
                                    renderItem={(item) => (
                                        <>
                                            <td onClick={(e) => e.stopPropagation()} className="hidden sm:table-cell">
                                                <input 
                                                    type="checkbox" 
                                                    className="cursor-pointer accent-accent"
                                                    checked={selectedIds.includes(item.id)}
                                                    onChange={() => toggleSelect(item.id)}
                                                />
                                            </td>
                                            <td className="hidden sm:table-cell">{item.id}</td>
                                            <td className="whitespace-nowrap font-medium">{item.lastName}</td>
                                            <td className="whitespace-nowrap">{item.firstName}</td>
                                            <td className="max-w-[150px] truncate sm:whitespace-normal">{item.blkLotStr}</td>
                                            <td className="max-w-[120px] truncate sm:whitespace-normal">{item.sudbZnPrk}</td>
                                            <td className="hidden sm:table-cell">{item.birthPlace}</td>
                                            <td className="hidden sm:table-cell whitespace-nowrap">{new Date(item.birthDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                                            <td className="hidden sm:table-cell">{item.sex}</td>
                                            <td className="hidden sm:table-cell">{item.civilStatus}</td>
                                            <td className="hidden sm:table-cell">{item.citizenship}</td>
                                            <td className="hidden sm:table-cell">{item.occupation}</td>
                                        </>
                                    )}
                                />
                            </tbody>
                        </Placeholder>
                    </table>
                </div>

                <div className='flex max-md:flex-col max-md:gap-6 justify-between items-center pt-6 pb-8 w-full'>
                    <div className='flex items-center gap-3 max-md:justify-center'>
                        <div className='text-accent'>{groupsIcon}</div>
                        <h2 className='text-accent text-3xl sm:text-4xl font-display font-bold'>
                            {totalRecords.toLocaleString()} Residents
                        </h2>
                    </div>

                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={setCurrentPage} 
                        isLoading={isLoading} 
                    />

                    <div className='max-sm:w-full flex justify-end max-sm:justify-center'>
                        {selectedIds.length > 0 ? (
                            <Button 
                                name={`Delete ${selectedIds.length}`} 
                                variant="button-danger px-6 py-4 flex items-center gap-2 max-sm:w-full justify-center"
                                call={() => openModal({
                                    title: `Delete ${selectedIds.length} Residents`,
                                    description: `Are you sure you want to delete these ${selectedIds.length} records? This action cannot be undone.`,
                                    variant: 'danger',
                                    confirmText: 'Delete All',
                                    onConfirm: async () => {
                                        await handleDelete(selectedIds)
                                        clearSelection()
                                        closeSidebar()
                                    }
                                })}
                            >
                                {trashIcon}
                            </Button>
                        ) : (
                            <NavLink 
                                to="/add-record" 
                                className="button-primary flex items-center justify-center gap-2 px-8 py-4 no-underline max-sm:w-full"
                            >
                                <p>Add a Resident</p>
                                {addIcon}
                            </NavLink>
                        )}
                    </div>
                </div>
            </main>

            <ResidentSidebar 
                isOpen={isCollectionOpen} 
                data={collectionItem} 
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
            
            <Modal />
            <Alert/>
        </div>
    )
}