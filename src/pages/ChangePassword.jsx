import React from 'react'
import useAuth from '../hooks/authHooks'
import Form from '../components/form'
import Button from '../components/button'
import Alert from '../components/alert'

export default function ChangePassword() {
    const { 
        changePasswordInputs, 
        changePassword, 
        isNewPasswordLengthCorrect, 
        isNewPasswordComplexityCorrect,
        oldPassword,
        newPassword
    } = useAuth()

    const securityIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-127t68-205v-189l-240-90-240 90v189q0 111 68 205t172 127Z"/></svg>

    return (
        <div className='flex relative overflow-hidden min-h-screen bg-background text-base font-body'>
            <main className='px-16 flex flex-col gap-8 flex-1 transition-all duration-300'>
                
                <div className='flex justify-between items-end border-t border-base-light/20 pt-8'>
                    <div>
                        <h2 className='text-xl text-base font-medium'>Account Security</h2>
                        <p className='text-base-light text-sm'>Manage your authentication and password settings</p>
                    </div>
                </div>

                <div className='mt-4 flex flex-col md:flex-row gap-8 items-start w-full'>
                    
                    <div className='flex flex-col gap-4 w-full md:w-1/3 max-w-sm'>
                        <div className='flex items-center gap-2 text-accent mb-2'>
                            {securityIcon}
                            <h3 className='text-xl font-display font-bold text-accent'>Change Password</h3>
                        </div>
                        
                        <p className='text-sm text-base-light leading-relaxed'>
                            Ensure your account uses a long, random password to stay secure. 
                            Avoid reusing passwords from other sites or using easily guessable information.
                        </p>
                    </div>

                    <div className='flex-1 bg-component-surface p-8 rounded-sm border border-base-light/20 shadow-sm'>
                        
                        <div className='flex flex-col items-start w-full max-w-md'>
                            <Form 
                                inputs={changePasswordInputs} 
                                call={changePassword}
                                structure='flex flex-col gap-4 overflow-hidden 0 bg-component-surface w-full'
                                formValidator={(fieldName) => {
                                    if (fieldName === 'New Password' && newPassword.length > 0) {
                                        return (
                                            <div className="flex flex-col gap-1 mt-1 text-[10px] uppercase font-bold tracking-widest">
                                                <p className={isNewPasswordLengthCorrect ? 'text-green-500' : 'text-red-500'}>
                                                    {isNewPasswordLengthCorrect ? '✓' : '○'} At least 7 characters
                                                </p>
                                                <p className={isNewPasswordComplexityCorrect ? 'text-green-500' : 'text-red-500'}>
                                                    {isNewPasswordComplexityCorrect ? '✓' : '○'} One number & one symbol
                                                </p>
                                            </div>
                                        )
                                    }
                                }}
                            >
                                <div className='pt-6 border-t border-base-light/10 flex justify-start'>
                                    <Button 
                                        name="Update Password" 
                                        variant="button-accent px-12 py-3"
                                        isDisabled={!oldPassword || !isNewPasswordLengthCorrect || !isNewPasswordComplexityCorrect}
                                    />
                                </div>
                            </Form>
                        </div>
                    </div>

                </div>
            </main>

            <Alert />
        </div>
    )
}