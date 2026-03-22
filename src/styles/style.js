// Buttons
export const buttonStyle = (isDisabled) => {
	const enabled = 'cursor-pointer'
	const disabled = 'cursor-default'
	return isDisabled ? `${disabled}` : `${enabled}`
}

// Alert 
export const alertStyle = (status) => {
	const alertPosition = 'fixed z-11 inset-0 flex flex-col justify-center items-center'
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

// Modal
export const modalStyle = (variant, isOpen) => {
	const overlay = `fixed inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-body transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
	const container = `bg-component-surface border border-base-light/20 rounded-md shadow-2xl w-full max-w-md overflow-hidden transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`
	const contentSection = 'p-6 flex flex-col items-center text-center'
	const footerSection = 'flex items-center gap-2 p-4 bg-base-light/5 border-t border-base-light/10'
	const cancelButton = 'flex-1 py-3 text-sm font-medium text-base-light hover:text-base bg-base-light/5 hover:bg-base-light/10 rounded-sm transition-all'

	const variantStyles = {
		danger: 'bg-red-500/10 text-red-500',
		success: 'bg-green-500/10 text-green-500',
		primary: 'bg-accent/10 text-accent'
	}

	const iconCircle = `w-12 h-12 rounded-full flex items-center justify-center mb-4 ${variantStyles[variant] || variantStyles.primary}`

	return {
		overlay,
		container,
		contentSection,
		footerSection,
		iconCircle,
		cancelButton
	}
}

// History
export const historyStyle = (action) => {
    const header = 'sticky top-0 bg-component-surface border-b border-base-light/20 z-10'
    const badgeBase = 'px-2 py-1 rounded-md text-[10px] font-bold uppercase'
    
    const variants = {
        created: 'text-green-500 bg-green-500/10',
        updated: 'text-amber-500 bg-amber-500/10',
        deleted: 'text-red-500 bg-red-500/10'
    }

    const actionBadge = `${badgeBase} ${variants[action?.toLowerCase()] || 'text-base-light bg-base-light/10'}`

    return {
        header,
        actionBadge
    }
}