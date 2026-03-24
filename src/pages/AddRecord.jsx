import React from 'react'
import useCensus from '../hooks/censusHooks'
import Form from '../components/form'
import Alert from '../components/alert'
import Button from '../components/button'

export default function AddRecord() {
    const { newRecord, setNewRecord, handleCreateRecords, residentInputs, completedSteps, steps } = useCensus(false)

    return (
        <div className='overflow-hidden min-h-screen bg-background px-16 pb-8 font-body'>
            <header className='text-center mb-12 border-t border-base-light/20 pt-8'>
                <h1 className='text-3xl font-display font-bold'>Adding Form</h1>
                <p className='text-base-light max-w-2xl mx-auto mt-2 text-sm'>
                    Make sure all the information provided in this RBI Form is legitimate.
                </p>
            </header>

            <main className='max-w-6xl mx-auto flex flex-col md:flex-row gap-12'>
                <div className='flex-1 bg-component-surface p-8 rounded-sm border border-base-light/10 shadow-sm'>
                    <h2 className='text-xl font-bold mb-6'>Resident Information</h2>
                    
                    <Form 
                        inputs={residentInputs} 
                        call={handleCreateRecords}
                        structure="grid grid-cols-2 gap-6"
                    >
                    </Form>
                </div>

                <aside className='w-full md:w-80 flex flex-col gap-6'>
                    <div className='bg-component-surface border border-base-light/10 rounded-sm p-6 shadow-sm'>
                        <div className='flex justify-between items-center mb-8'>
                            <h3 className='text-accent font-bold text-lg'>Your Progress</h3>
                            <span className='bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center font-bold'>
                                {completedSteps}
                            </span>
                        </div>

                        <div className='flex flex-col gap-8 relative'>
                            {steps.map((step) => (
                                <div key={step.id} className='flex items-center gap-4 relative z-10'>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step.isComplete ? 'bg-orange-400 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                        {step.id}
                                    </div>
                                    <span className={`text-sm ${step.isComplete ? 'text-base font-bold' : 'text-base-light'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                            <div className='absolute left-5 top-0 bottom-0 w-[2px] bg-gray-100 -z-0'></div>
                        </div>

                        <div className='mt-10 pt-6 border-t border-base-light/10'>
                            <Button 
                                call={handleCreateRecords}
                                isDisabled={completedSteps < 3}
                                variant={`w-full py-4 rounded-md font-bold transition-all ${completedSteps === 3 ? 'button-primary' : 'bg-blue-300 cursor-not-allowed text-white'}`}
                            >
                                Add resident to database
                            </Button>
                        </div>
                    </div>
                </aside>
            </main>
            <Alert />
        </div>
    )
}