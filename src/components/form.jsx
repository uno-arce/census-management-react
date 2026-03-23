import React from 'react';
import useForm from '../hooks/formHooks'

export default function Form({ inputs, call, id, isDisabled, isStepForm, formValidator, structure, children }) {
    const { currentFormStep, handleFormSubmit } = useForm()

    const formInputs = inputs.map(field => {
        const isVisible = (currentFormStep == field.name || !isStepForm)
        if (!isVisible) return null

        return (
            <div 
                className={`bg-inherit flex flex-col gap-2 ${field.fullWidth ? 'col-span-2' : ''}`} 
                key={field.name}
            >
                <label className='text-xs font-bold uppercase text-base-light'>{field.name}</label>
                
                {field.type === 'select' ? (
                    <select
                        className="input appearance-none"
                        value={field.value}
                        onChange={e => field.updateState(e.target.value)}
                        disabled={isDisabled}
                    >
                        <option value="">Select {field.name}</option>
                        {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                ) : (
                    <input
                        name={field.name}
                        type={field.type || 'text'}
                        onChange={event => {
                            field.updateState(event.target.value)
                            field.validateState && field.validateState(event.target.value)
                        }}
                        value={field.value}
                        disabled={isDisabled}
                        placeholder={field.placeholder || field.name}
                        className="input"
                    />
                )}
                {formValidator && formValidator(field.name)}
            </div>
        )
    })

    return (
        <form id={id} onSubmit={event => handleFormSubmit(event, call)} className={structure}>
            {formInputs}
            {children}
        </form>
    )
}