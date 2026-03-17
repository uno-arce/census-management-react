import React from 'react'
import Search from '../components/search'
import Collection from '../components/collection'
import Button from '../components/button'
import Alert from '../components/alert'
import useCensus from '../hooks/censusHooks'
import { useCensusActions } from '../stores/censusStore'
import { useCollectionActions } from '../stores/componentStore'

export default function Dashboard() {
    const { records, totalRecords, searchQuery } = useCensus()
    const { setSearchQuery } = useCensusActions()
    const { setCollectionItem, setIsCollectionOpen } = useCollectionActions()

    const openRecord = (item, index) => {
        setCollectionItem(item)
        setIsCollectionOpen(true)
    }

    const groupsIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M411-480q-28 0-46-21t-13-49l12-72q8-43 40.5-70.5T480-720q44 0 76.5 27.5T597-622l12 72q5 28-13 49t-46 21H411Zm24-80h91l-8-49q-2-14-13-22.5t-25-8.5q-14 0-24.5 8.5T443-609l-8 49ZM124-441q-23 1-39.5-9T63-481q-2-9-1-18t5-17q0 1-1-4-2-2-10-24-2-12 3-23t13-19l2-2q2-19 15.5-32t33.5-13q3 0 19 4l3-1q5-5 13-7.5t17-2.5q11 0 19.5 3.5T208-626q1 0 1.5.5t1.5.5q14 1 24.5 8.5T251-596q2 7 1.5 13.5T250-570q0 1 1 4 7 7 11 15.5t4 17.5q0 4-6 21-1 2 0 4l2 16q0 21-17.5 36T202-441h-78Zm676 1q-33 0-56.5-23.5T720-520q0-12 3.5-22.5T733-563l-28-25q-10-8-3.5-20t18.5-12h80q33 0 56.5 23.5T880-540v20q0 33-23.5 56.5T800-440ZM0-240v-63q0-44 44.5-70.5T160-400q13 0 25 .5t23 2.5q-14 20-21 43t-7 49v65H0Zm240 0v-65q0-65 66.5-105T480-450q108 0 174 40t66 105v65H240Zm560-160q72 0 116 26.5t44 70.5v63H780v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5Zm-320 30q-57 0-102 15t-53 35h311q-9-20-53.5-35T480-370Zm0 50Zm1-280Z"/></svg>
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>

    return (
        <div className='flex flex-col min-h-screen bg-background text-base font-body'>
            <main className='px-16 flex flex-col gap-6'>
                <div className='flex justify-between items-end border-t border-base-light/20 pt-8'>
                    <div>
                        <h2 className='text-xl text-base font-medium'>Barangay Residents</h2>
                        <p className='text-base-light text-sm'>List of residents in Barangay Sampaloc IV</p>
                    </div>
                    <Search 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search'
                    />
                </div>

                <div className='mt-4 overflow-x-auto rounded-sm border border-base-light/20 shadow-sm bg-component-surface'>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Block / Lot / Street</th>
                                <th>Subd. / Zone / Purok</th>
                                <th>Place of Birth</th>
                                <th>Date of Birth</th>
                                <th>Sex</th>
                                <th>Civil Status</th>
                                <th>Citizenship</th>
                                <th>Occupation</th>
                            </tr>
                        </thead>
                        <Collection 
                            items={records}
                            openCollection={openRecord}
                            structure='tbody'
                            renderItem={(item) => (
                                <>
                                    <td>{item.id}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.blkLotStr}</td>
                                    <td>{item.sudbZnPrk}</td>
                                    <td>{item.birthPlace}</td>
                                    <td>
                                        {new Date(item.birthDate).toLocaleDateString('en-US', { 
                                            month: 'long', 
                                            day: 'numeric', 
                                            year: 'numeric' 
                                        })}
                                    </td>
                                    <td>{item.sex}</td>
                                    <td>{item.civilStatus}</td>
                                    <td>{item.citizenship}</td>
                                    <td>{item.occupation}</td>
                                </>
                            )}
                        />
                    </table>
                </div>

                <div className='flex justify-between items-center py-8 mt-auto'>
                    <div className='flex items-center gap-3'>
                        <div className='text-accent'>{groupsIcon}</div>
                        <h2 className='text-accent text-4xl font-display font-bold'>
                            {totalRecords.toLocaleString()} Residents
                        </h2>
                    </div>

                    <Button 
                        name='Add a Resident'
                        variant='button-primary flex items-center gap-2 px-8 py-4'
                    >
                        {addIcon}
                    </Button>
                </div>
            </main>
            <Alert />
        </div>
    )
}