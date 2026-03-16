import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useUserAuthStore = create((set) => ({
    username: '',
    password: '',
    isAuthenticated: false,
    isFormDisabled: false,
    isUserAuthLoading: true,
    isUserTester: false,

    actions: {
        setUsername: (username) => set({ username }),
        setPassword: (password) => set({ password }),
        setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
        setIsFormDisabled: (disabled) => set({ isFormDisabled: disabled }),
        setIsUserAuthLoading: (loading) => set({ isUserAuthLoading: loading }),
        setIsUserTester: (isTester) => set({ isUserTester: isTester }),
        resetUserAuthState: () => set({ username: '', password: '', isFormDisabled: false })
    }
}))

export const useUserAuthData = () => useUserAuthStore(useShallow((state) => ({
    username: state.username,
    password: state.password,
    isAuthenticated: state.isAuthenticated,
    isFormDisabled: state.isFormDisabled,
    isUserAuthLoading: state.isUserAuthLoading,
    isLoginButtonDisabled: !state.username || !state.password
})))

export const useUserAuthActions = () => useUserAuthStore((state) => state.actions)

export default useUserAuthStore