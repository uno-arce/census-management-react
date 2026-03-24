import React from 'react';
import { NavLink } from 'react-router-dom'
import Form from '../components/form'
import Button from '../components/button'
import Alert from '../components/alert'
import Notice from '../components/notice'
import useAuth from '../hooks/authHooks'
import useForm from '../hooks/formHooks'


export default function Login() {
	const { login, loginInputs, isLoginButtonDisabled, isFormDisabled, isUserTester, handleUserTester } = useAuth()

	return(
		<div className='flex flex-col items-center justify-center min-h-dvh bg-background p-4'>
            <div className='flex flex-col items-center mb-16'>
                <img 
			        src="/city-logo.png" 
			        alt="City Logo" 
			        className="w-28 h-28 mb-4 object-contain"
			    />
                <h1 className='text-accent font-display font-black tracking-tight leading-none'>SAMPALOC IV</h1>
                <p className='text-base-light text-sm font-display tracking-widest uppercase mt-1'>Census Management System</p>
            </div>

            <div className='w-full max-w-[350px] flex flex-col'>
                <h2 className='text-xl text-base font-semibold self-start mb-4'>Sign in your account</h2>
       
                <Form 
                    id='loginForm'
                    inputs={loginInputs}
                    call={login}
                    isDisabled={isFormDisabled}
                    structure='flex flex-col gap-4 overflow-hidden 0'
                >
                    <Alert />
                </Form>

                <Button 
                    name='Sign In' 
                    form='loginForm'
                    isDisabled={isLoginButtonDisabled}
                    variant='button-primary w-full py-3 my-4'
                />

                <Notice message={
                	<div className='flex justify-between items-center'>
                		<p>Sign in as User Tester</p>
                		<input type='checkbox' 
                			checked={isUserTester} 
                			onChange={handleUserTester} 
                			className='appearance-none h-4 w-4 bg-base-light/40 border border-base-light/40 rounded-xs checked:bg-base/40'/>
                	</div>
                } />
            </div>
        </div>
	)
}