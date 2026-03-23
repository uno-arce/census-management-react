import { useEffect } from 'react'
import { useFormData, useFormActions } from '../stores/componentStore'

const useForm = () => {
	const formData = useFormData()
	const actionsForm = useFormActions()

	const validateTextLength = (input, min, max) => {
        return input.length >= min && input.length <= max
    }

    const validatePasswordComplexity = (input) => {
        const hasNumber = /\d/.test(input)
        const hasSymbol = /[^\w\s]/.test(input)
        return hasNumber && hasSymbol
    }

	const handleFormSubmit = async (event, call) => {
		event.preventDefault()

		await call()
	}

	return {
		validateTextLength,
		validatePasswordComplexity,
		handleFormSubmit,
		currentFormStep: formData.currentFormStep
	}
}

export default useForm