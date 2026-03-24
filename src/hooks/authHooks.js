import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useUserAuthData, useUserAuthActions } from '../stores/userAuthStore'
import { useAlertData, useFormActions, useAlertActions, useSidebarActions } from '../stores/componentStore'
import userAuth from '../services/userAuth'
import useForm from './formHooks'

const useAuth = () => {
	const navigate = useNavigate()
	const userAuthData = useUserAuthData()
	const alertData = useAlertData()
	const actionsUserAuth = useUserAuthActions()
	const actionsForm = useFormActions()
	const actionsAlert = useAlertActions()
    const actionsSidebar = useSidebarActions()
	const { validateTextLength, validatePasswordComplexity } = useForm()

	useEffect(() => {
       if(userAuthData.isUserAuthLoading) {
       	const token = localStorage.getItem('token')
       	
       	if (token) {
       	    actionsUserAuth.setIsAuthenticated(true)
       	} else {
       	    actionsUserAuth.setIsAuthenticated(false)
       	}
       	
       	actionsUserAuth.setIsUserAuthLoading(false)
       }
    }, [])

    useEffect(() => {
        return () => {
            actionsUserAuth.resetUserAuthState()
            actionsAlert.setIsAlertOpen(false)
        }
    }, [])

	const loginInputs = [
        {
            name: 'Username',
            value: userAuthData.username,
            updateState: (val) => actionsUserAuth.setUsername(val)
        },
        {
            name: 'Password',
            value: userAuthData.password,
            type: 'password',
            updateState: (val) => actionsUserAuth.setPassword(val)
        }
    ]

    const login = async () => {
        actionsUserAuth.setIsFormDisabled(true)
        actionsAlert.setIsAlertOpen(true)
        actionsAlert.setAlertStatus('loading')
        actionsAlert.setAlertMessage('Logging In...')

        const response = await userAuth.login(userAuthData.username, userAuthData.password)

        if (response?.status === 200) {
        	localStorage.setItem('token', response.data.token)

        	actionsUserAuth.setIsAuthenticated(true)
            actionsAlert.setIsAlertOpen(false)
            actionsUserAuth.resetUserAuthState()
            navigate('/dashboard', { replace: true })
        } else {
            actionsUserAuth.setIsFormDisabled(false)
            actionsAlert.setAlertStatus('failed')
            actionsAlert.setAlertMessage(response?.data?.error || 'Invalid Credentials')
        }
    }

	const handleUserTester = (event) => {
		const isUserTester = event.target.checked
		actionsUserAuth.setIsUserTester(isUserTester)
		
		if(isUserTester) {
			actionsUserAuth.setUsername('admin.census')
			actionsUserAuth.setPassword('admin@123')
		} else {
			actionsUserAuth.setUsername('')
			actionsUserAuth.setPassword('')
		}
	}

	const changePasswordInputs = [
        {
            name: 'Current Password',
            value: userAuthData.oldPassword,
            type: 'password',
            updateState: (val) => actionsUserAuth.setOldPassword(val),
        },
        {
            name: 'New Password',
            value: userAuthData.newPassword,
            type: 'password',
            updateState: (val) => actionsUserAuth.setNewPassword(val),
            validateState: (val) => {
                const isLengthCorrect = validateTextLength(val, 7, 30) 
                const isComplexityCorrect = validatePasswordComplexity(val)

                actionsUserAuth.setIsNewPasswordLengthCorrect(isLengthCorrect)
                actionsUserAuth.setIsNewPasswordComplexityCorrect(isComplexityCorrect)
            }
        }
    ]

    const changePassword = async () => {
        actionsAlert.setIsAlertOpen(true)
        actionsAlert.setAlertStatus('loading')
        actionsAlert.setAlertMessage('Updating password...')

        const response = await userAuth.changePassword(
            userAuthData.oldPassword, 
            userAuthData.newPassword
        )

        if (response?.status === 200) {
            actionsAlert.setAlertStatus('success')
            actionsAlert.setAlertMessage('Password Updated Successfully')
            actionsUserAuth.setOldPassword('')
            actionsUserAuth.setNewPassword('')
        } else {
            actionsAlert.setAlertStatus('failed')
            actionsAlert.setAlertMessage(response?.data?.error || 'Update failed')
        }
    }

	const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('census-storage')
        actionsUserAuth.setIsAuthenticated(false)
        actionsSidebar.setIsSidebarOpen(false)
        navigate('/login', { replace: true })
    }

	return {
		...userAuthData,
		loginInputs,
		changePasswordInputs,
		login,
		logout,
		changePassword,
		handleUserTester,
		isFormDisabled: userAuthData.isFormDisabled,
		isLoginButtonDisabled: userAuthData.isLoginButtonDisabled,
		isAuthenticated: userAuthData.isAuthenticated
	}
}

export default useAuth