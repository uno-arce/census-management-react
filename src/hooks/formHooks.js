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

	const handleFormSubmit = async (event, call) => {
		event.preventDefault()

		await call()
	}

	return {
		validateTextLength,
		handleFormSubmit,
		currentFormStep: formData.currentFormStep
	}
}

export default useForm