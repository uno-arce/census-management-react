import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useUserAuthStore = create((set) => ({
    username: '',
    password: '',
    totalHistory: 0,
    historyLogs: [],
    isAuthenticated: false,
    isFormDisabled: false,
    isUserAuthLoading: true,
    isHistoryLoading: false,
    isUserTester: false,

    historyParams: {
        rows: 10,
        group: 1,
        searchColumn: 'lastName',
        search: '',
        sortColumn: 'updatedAt',
        order: 'desc'
    },

    actions: {
        setUsername: (username) => set({ username }),
        setPassword: (password) => set({ password }),
        setHistoryLogs: (logs) => set({ historyLogs: logs }),
        setTotalHistory: (total) => set({ totalHistory: total }),
        setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
        setIsFormDisabled: (disabled) => set({ isFormDisabled: disabled }),
        setIsUserAuthLoading: (loading) => set({ isUserAuthLoading: loading }),
        setIsHistoryLoading: (loading) => set({ isHistoryLoading: loading }),
        setIsUserTester: (isTester) => set({ isUserTester: isTester }),
        setHistoryParams: (newParams) => set((state) => ({
            historyParams: { ...state.historyParams, ...newParams }
        })),
        resetUserAuthState: () => set({ username: '', password: '', isFormDisabled: false })
    }
}))

export const useUserAuthData = () => useUserAuthStore(useShallow((state) => ({
    username: state.username,
    password: state.password,
    historyLogs: state.historyLogs,
    totalHistory: state.totalHistory,
    historyParams: state.historyParams,
    isAuthenticated: state.isAuthenticated,
    isFormDisabled: state.isFormDisabled,
    isUserAuthLoading: state.isUserAuthLoading,
    isHistoryLoading: state.isHistoryLoading,
    isLoginButtonDisabled: !state.username || !state.password
})))

export const useUserAuthActions = () => useUserAuthStore((state) => state.actions)

export default useUserAuthStore