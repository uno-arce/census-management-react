import React from 'react'
import Search from '../components/search'
import Collection from '../components/collection'
import Placeholder from '../components/Placeholder'
import Button from '../components/Button'
import useHistory from '../hooks/historyHooks'
import { historyStyle } from '../styles/style'

export default function History() {
    const { 
        historyLogs, totalHistory, tableHeaders, isLoading, currentPage, rowsPerPage, 
        searchQuery, searchColumn, sortColumn, sortOrder, 
        handleSort, setHistoryParams 
    } = useHistory()
    
    const styles = historyStyle()
    const totalPages = Math.ceil(totalHistory / rowsPerPage)

    const filterIcon = <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"/></svg>
    const historyIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L240-480l56-56 128 128 360-360 56 56-416 416Z"/></svg>

    return (
        <div className='flex relative overflow-hidden min-h-screen bg-background text-base font-body'>
            <main className="px-16 flex flex-col gap-2 flex-1">
                <div className='flex justify-between items-end border-t border-base-light/20 pt-8'>
                    <div>
                        <h2 className='text-xl text-base font-medium'>Activity Logs</h2>
                        <p className='text-base-light text-sm'>History of changes and actions performed</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-2 bg-component-surface border border-base-light/20 rounded-md pl-3 pr-1 py-1'>
                            <div className='flex items-center gap-2 text-base-light border-r border-base-light/20 pr-2 mr-1'>
                                {filterIcon}
                                <select 
                                    value={searchColumn}
                                    onChange={(e) => setHistoryParams({ searchColumn: e.target.value, group: 1 })}
                                    className='bg-transparent outline-none text-xs font-medium cursor-pointer uppercase'
                                >
                                    {tableHeaders.map(col => (
                                        <option key={col.value} value={col.value}>{col.label}</option>
                                    ))}
                                </select>
                            </div>
                            <Search 
                                value={searchQuery} 
                                onChange={(e) => setHistoryParams({ search: e.target.value, group: 1 })}
                                placeholder={`Search logs...`}
                            />
                        </div>

                        <div className='flex items-center gap-2 bg-component-surface border border-base-light/20 rounded-md px-3 h-[42px] text-sm'>
                            <label className='text-base-light font-normal whitespace-nowrap'>Rows:</label>
                            <select 
                                value={rowsPerPage} 
                                onChange={(e) => setHistoryParams({ rows: Number(e.target.value), group: 1 })}
                                className='bg-transparent outline-none font-bold text-accent cursor-pointer'
                            >
                                {[10, 15, 20, 25].map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className='mt-4 h-[582px] overflow-auto rounded-sm border border-base-light/20 shadow-sm bg-component-surface'>
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                {tableHeaders.map((header) => {
                                    const isCurrentCol = sortColumn === header.value;
                                    return (
                                        <th 
                                            key={header.value} 
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
                                    )
                                })}
                            </tr>
                        </thead>
                        <Placeholder
                            isLoading={isLoading}
                            isEmpty={historyLogs.length === 0}
                            skeletonNumbers={rowsPerPage}
                            structure={{
                                parent: "tbody",
                                skeleton: "h-[52px] w-full border-b border-base-light/10 bg-base-light/15 my-2"
                            }}
                            emptyView={
                                <tr>
                                    <td colSpan="3" className="text-center py-20 text-base-light opacity-50">
                                        No history logs found matching your criteria.
                                    </td>
                                </tr>
                            }
                        >
                            <tbody>
                                <Collection
                                    items={historyLogs}
                                    structure="contents"
                                    renderItem={(item) => (
                                        <>
                                            <td>
                                                <span className={historyStyle(item.status).actionBadge}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="text-base-light text-xs font-mono">
                                                {new Date(item.updatedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                            <td className="font-medium text-base-light">
                                                {item.fullName}
                                            </td>
                                        </>
                                    )}
                                />
                            </tbody>
                        </Placeholder>
                    </table>
                </div>

                <div className='flex justify-between items-center py-8'>
                    <div className='flex items-center gap-3'>
                        <div className='text-accent'>{historyIcon}</div>
                        <h2 className='text-accent text-4xl font-display font-bold'>
                            {(totalHistory || 0).toLocaleString()} Logs
                        </h2>
                    </div>

                    <div className='flex items-center gap-4'>
                        <Button
                            name='Previous'
                            variant='button-accent px-4 py-2'
                            call={() => setHistoryParams({ group: currentPage - 1 })}
                            isDisabled={currentPage === 1 || isLoading}
                        />

                        <div className='text-sm text-base-light font-body'>
                            Page {currentPage} of {totalPages || 1}
                        </div>

                        <Button
                            name='Next'
                            variant='button-accent px-4 py-2'
                            call={() => setHistoryParams({ group: currentPage + 1 })}
                            isDisabled={currentPage >= totalPages || isLoading}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}