import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useUserAuthStore = create((set) => ({
    username: '',
    password: '',
    oldPassword: '',
    newPassword: '',
    totalHistory: 0,
    historyLogs: [],

    isAuthenticated: false,
    isFormDisabled: false,
    isNewPasswordLengthCorrect: false,
    isNewPasswordComplexityCorrect: false,
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
        setOldPassword: (oldPassword) => set({ oldPassword }),
        setNewPassword: (newPassword) => set({ newPassword }),
        setIsNewPasswordLengthCorrect: (isCorrect) => set({ isNewPasswordLengthCorrect: isCorrect }),
        setIsNewPasswordComplexityCorrect: (isCorrect) => set({ isNewPasswordComplexityCorrect: isCorrect }),
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
        resetUserAuthState: () => set({ 
            username: '', 
            password: '', 
            oldPassword: '', 
            newPassword: '', 
            isNewPasswordLengthCorrect: false,
            isNewPasswordComplexityCorrect: false,
            isFormDisabled: false 
        })
    }
}))

export const useUserAuthData = () => useUserAuthStore(useShallow((state) => ({
    username: state.username,
    password: state.password,
    oldPassword: state.oldPassword,
    newPassword: state.newPassword,
    historyLogs: state.historyLogs,
    totalHistory: state.totalHistory,
    historyParams: state.historyParams,
    isAuthenticated: state.isAuthenticated,
    isFormDisabled: state.isFormDisabled,
    isNewPasswordLengthCorrect: state.isNewPasswordLengthCorrect,
    isNewPasswordComplexityCorrect: state.isNewPasswordComplexityCorrect,
    isUpdatePasswordDisabled: !state.oldPassword || !state.isNewPasswordLengthCorrect || !state.isNewPasswordComplexityCorrect,
    isUserAuthLoading: state.isUserAuthLoading,
    isHistoryLoading: state.isHistoryLoading,
    isLoginButtonDisabled: !state.username || !state.password
})))

export const useUserAuthActions = () => useUserAuthStore((state) => state.actions)

export default useUserAuthStore