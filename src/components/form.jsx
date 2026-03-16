import React from 'react';
import useForm from '../hooks/formHooks'

export default function Form({ inputs, call, id, isDisabled, isStepForm, formValidator, structure, children }) {
	const { currentFormStep, handleFormSubmit } = useForm()

	const formInputs = inputs.map(field => {
		return (
			(currentFormStep == field.name || !isStepForm) &&
			<div
				className='flex flex-col gap-2'
				key={field.name}
			>
				<input
				name={field.name}
				type={field.type || 'text'}
				onChange={event => {
					field.updateState(event.target.value)
					field.validateState && field.validateState(event.target.value)
				}}
				value={field.value}
				disabled={isDisabled}
				placeholder={field.name}
				className={`input`}
				/>
				{formValidator && formValidator(field.name)}
			</div>
		)
	})

	return (
		<form
			id={id}
			onSubmit={event => handleFormSubmit(event, call)}
			className={structure}
		>
			{formInputs}
			{children}
		</form>
	)

}