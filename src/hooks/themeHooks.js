import { useEffect } from 'react'
import { useThemeToggleData, useThemeToggleActions} from '../stores/componentStore'

const useTheme = () => {
	const themeToggleData = useThemeToggleData()
	const actionsThemeToggle = useThemeToggleActions()

	useEffect(() => {
		const root = window.document.documentElement

		if(themeToggleData.isDarkMode) {
			root.classList.add('dark')
		} else {
			root.classList.remove('dark')
		}
	}, [themeToggleData.isDarkMode])

	const handleLightTheme = () => {
		actionsThemeToggle.setIsDarkMode(false)
		localStorage.setItem('theme', 'light')
	}

	const handleDarkTheme = () => {
		actionsThemeToggle.setIsDarkMode(true)
		localStorage.setItem('theme', 'dark')
	}

	return {
		isDarkMode: themeToggleData.isDarkMode,
		handleLightTheme,
		handleDarkTheme
	}
}

export default useTheme