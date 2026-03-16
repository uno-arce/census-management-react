import { useEffect } from 'react'
import { useFormData, useFormActions } from '../stores/componentStore'

const useForm = () => {
	const formData = useFormData()
	const actionsForm = useFormActions()

	const validateTextLength = (input, min, max) => {
		if(input.length >= min && input.length <= max) {
			return true
		}

		return false
	}

	const validateTextCase = (input) => {
		const hasUpperCase = /[A-Z]/.test(input)
		const hasLowerCase = /[a-z]/.test(input)
		return hasUpperCase && hasLowerCase
	}
	
	const validateMixedCharacters = (input) => {
		const hasLetter =  /[a-zA-Z]/.test(input)
		const hasNumber = /[0-9]/.test(input)
		const hasSymbol = /[^a-zA-Z0-9]/.test(input)
		const isNotOnlyNumbers = !/^[0-9]+$/.test(input)
		const isNotOnlySymbols = !/^[^a-zA-Z0-9]+$/.test(input)

		return (hasLetter || hasNumber || hasSymbol) && isNotOnlyNumbers && isNotOnlySymbols
	}

	const validateEmailFormat = (input) => {
		const isEmailLikeFormat = /^[^\s@]+@[^\s@]+\.(com)$/i.test(input)

		return isEmailLikeFormat
	}

	const validatePassword = (input) => {
		const hasLetter = /[a-zA-Z]/.test(input)
		const hasNumber = /[0-9]/.test(input)
		const hasSymbol = /[^a-zA-Z0-9]/.test(input)
		const isNotOnlyNumbers = !/^[0-9]+$/.test(input)
		const isNotOnlySymbols = !/^[^a-zA-Z0-9]+$/.test(input)

		return (hasLetter && hasNumber && hasSymbol) && isNotOnlyNumbers && isNotOnlySymbols
	}

	const validateUniqueness = async (value, call) => {
		await call(value)
	}

	const handleFormSubmit = async (event, call) => {
		event.preventDefault()

		await call()
	}

	return {
		validateTextLength,
		validateTextCase,
		validateMixedCharacters,
		validateEmailFormat,
		validatePassword,
		validateUniqueness,
		handleFormSubmit,
		currentFormStep: formData.currentFormStep
	}
}

export default useForm