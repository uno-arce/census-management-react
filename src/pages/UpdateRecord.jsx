import React from 'react'
import useCensus from '../hooks/censusHooks'
import Form from '../components/form'
import Alert from '../components/alert'
import Button from '../components/button'

export default function UpdateRecord() {
    const { editRecord, handleUpdate, updateInputs } = useCensus(false)

    return (
        <div className='max-lg:px-4 overflow-hidden min-h-screen bg-background px-16 pb-8 font-body'>
            <header className='text-center mb-12 border-t border-base-light/20 pt-8'>
                <h1 className='text-3xl font-display font-bold'>Update Resident Record</h1>
                <p className='text-base-light max-w-2xl mx-auto mt-2 text-sm'>
                    Ensure all changes are verified against official documents before saving the updates to the database.
                </p>
            </header>

            <main className='max-w-6xl mx-auto flex flex-col md:flex-row gap-12'>
                <div className='flex-1 bg-component-surface p-8 rounded-sm border border-base-light/10 shadow-sm'>
                    <h2 className='text-xl font-bold mb-6 text-accent'>Resident Information</h2>
                    
                    <Form
                    	id='update-form'
                        inputs={updateInputs} 
                        call={() => handleUpdate(editRecord.id, editRecord)}
                        structure="grid grid-cols-2 gap-6"
                    />
                </div>

                <aside className='w-full md:w-80 flex flex-col gap-6'>
                    <div className='bg-component-surface border border-base-light/10 rounded-sm p-6 shadow-sm'>
                        <h3 className='text-accent font-bold text-lg mb-4'>Record Actions</h3>
                        <p className='text-xs text-base-light mb-6'>
                            Updating this record will affect the census data for <b>Barangay Sampaloc IV</b>.
                        </p>

                        <div className='pt-6 border-t border-base-light/10'>
                            <Button
                            	form='update-form'
                                variant="button-primary w-full py-4 rounded-md font-bold transition-all"
                            >
                                Save Changes
                            </Button>
                            
                            <p className='text-[10px] text-center text-base-light mt-4 italic'>
                                Last modified: {editRecord.updatedAt ? new Date(editRecord.updatedAt).toLocaleDateString() : 'Just now'}
                            </p>
                        </div>
                    </div>
                </aside>
            </main>
            <Alert />
        </div>
    )
}