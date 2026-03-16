import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useComponentStore = create((set) => ({
	// Alert
	alertMessage: false,
	alertMessage: null,
	alertMessage: null,
	actionsAlert: {
		setIsAlertOpen: (isOpen) => set({ isAlertOpen: isOpen }),
		setAlertStatus: (status) => set({ alertStatus: status }),
		setAlertMessage: (alertMessage) => set({ alertMessage: alertMessage }),
	},

	// Collection
	collectionItem: null,
	collectionSelectedGroup: 1,
	collectionSelectedIndex: 0,
	isCollectionOpen: false,
	actionsCollection: {
		setCollectionItem: (collectionItem) => set({ collectionItem: collectionItem }),
		setCollectionSelectedGroup: (selectedGroup) => set({collectionSelectedGroup: selectedGroup}),
		setCollectionSelectedIndex: (selectedIndex) => set({ collectionSelectedIndex: selectedIndex}),
		setIsCollectionOpen: (isOpen) => set({ isCollectionOpen: isOpen }),
	},

	// Form
	currentFormStep: 'Username',
	actionsForm: {
		setCurrentFormStep: (currentFormStep) => set({ currentFormStep: currentFormStep }),
	},

	// ThemeToggle
	isDarkMode: localStorage.getItem('theme') === 'dark',
	actionsThemeToggle: {
		setIsDarkMode: (mode) => set({ isDarkMode: mode }),
	}
}))

export default useComponentStore


// Custom Hooks utilizing useShallow to prevent unnecessary re-renders

// Alert
export const useAlertData = () => useComponentStore(useShallow((state) => {
	return {
		isAlertOpen: state.isAlertOpen,
		alertStatus: state.alertStatus,
		alertMessage: state.alertMessage
	}
}))
export const useAlertActions = () => useComponentStore((state) => state.actionsAlert)

// Collection
export const useCollectionData = () => useComponentStore(useShallow((state) => {
	return {
		collectionItem: state.collectionItem,
		collectionSelectedGroup: state.collectionSelectedGroup,
		collectionSelectedIndex: state.collectionSelectedIndex,
		isCollectionOpen: state.isCollectionOpen
	}
}))
export const useCollectionActions = () => useComponentStore((state) => state.actionsCollection)

// Form
export const useFormData = () => useComponentStore(useShallow((state) => {
	return {
		currentFormStep: state.currentFormStep
	}
}))
export const useFormActions = () => useComponentStore((state) => state.actionsForm)

// ThemeToggle
export const useThemeToggleData = () => useComponentStore(useShallow((state) => {
	return {
		isDarkMode: state.isDarkMode
	}
}))
export const useThemeToggleActions = () => useComponentStore((state) => state.actionsThemeToggle)