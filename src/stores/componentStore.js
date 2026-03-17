import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useComponentStore = create((set) => ({
	// Alert
	isAlertOpen: false,
	alertStatus: null,
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

	// Sidebar
	isSidebarOpen: false,
	actionsSidebar: {
		setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
	},

	// ThemeToggle
	isDarkMode: localStorage.getItem('theme') === 'dark',
	actionsThemeToggle: {
		setIsDarkMode: (mode) => {
			set({ isDarkMode: mode });
			localStorage.setItem('theme', mode ? 'dark' : 'light');
			if (mode) document.documentElement.classList.add('dark');
			else document.documentElement.classList.remove('dark');
		},
	},

	// Search
	isSearchActive: false,
	actionsSearch: {
		setIsSearchActive: (isActive) => set({ isSearchActive: isActive }),
	}
}))

export default useComponentStore

// Alert Selectors
export const useAlertData = () => useComponentStore(useShallow((state) => ({
	isAlertOpen: state.isAlertOpen,
	alertStatus: state.alertStatus,
	alertMessage: state.alertMessage
})))
export const useAlertActions = () => useComponentStore((state) => state.actionsAlert)

// Collection Selectors
export const useCollectionData = () => useComponentStore(useShallow((state) => ({
	collectionItem: state.collectionItem,
	collectionSelectedGroup: state.collectionSelectedGroup,
	collectionSelectedIndex: state.collectionSelectedIndex,
	isCollectionOpen: state.isCollectionOpen
})))
export const useCollectionActions = () => useComponentStore((state) => state.actionsCollection)

// Form Selectors
export const useFormData = () => useComponentStore(useShallow((state) => ({
	currentFormStep: state.currentFormStep
})))
export const useFormActions = () => useComponentStore((state) => state.actionsForm)

// Menu Selectors
export const useMenuData = () => useComponentStore(useShallow((state) => ({
	selectedMenuCategory: state.selectedMenuCategory,
	selectedMenuLabel: state.selectedMenuLabel
})))
export const useMenuActions = () => useComponentStore((state) => state.actionsMenu)

// Sidebar Selectors
export const useSidebarData = () => useComponentStore(useShallow((state) => ({
	isSidebarOpen: state.isSidebarOpen
})))
export const useSidebarActions = () => useComponentStore((state) => state.actionsSidebar)

// ThemeToggle Selectors
export const useThemeToggleData = () => useComponentStore(useShallow((state) => ({
	isDarkMode: state.isDarkMode
})))
export const useThemeToggleActions = () => useComponentStore((state) => state.actionsThemeToggle)

// Search Selectors
export const useSearchData = () => useComponentStore(useShallow((state) => ({
	isSearchActive: state.isSearchActive
})))
export const useSearchActions = () => useComponentStore((state) => state.actionsSearch)