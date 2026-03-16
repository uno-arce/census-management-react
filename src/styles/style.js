
// Buttons
export const buttonStyle = (isDisabled) => {
	const enabled = 'cursor-pointer'
	const disabled = 'cursor-default'
	return isDisabled ? `${disabled}` : `${enabled}`
}

// Alert 
export const alertStyle = (status) => {
	const alertPosition = 'fixed z-10 inset-0 flex flex-col justify-center items-center'
	const alertGroup = 'absolute top-0 flex min-h-fit min-w-fit p-4 mt-4 gap-4 bg-base rounded-sm'
	const alertIcon = `fill-base-light ${status === 'loading' ? 'animate-spin' : null}`
	const alertDescription = 'text-left text-base-light'
	return {
		alertPosition,
		alertGroup,
		alertIcon,
		alertDescription
	}
}

// Menu
export const menuStyle = (isActive) => {
	const menuCategoryName = `max-md:text-2xl text-4xl text-left whitespace-nowrap cursor-pointer select-none hover:text-accent
		${isActive ? 'text-accent' : 'text-base-light'}`

	return{
		menuCategoryName
	}
}