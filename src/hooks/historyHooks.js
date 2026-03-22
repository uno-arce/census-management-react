import { useEffect, useCallback } from 'react'
import { useUserAuthData, useUserAuthActions } from '../stores/userAuthStore'
import userAuth from '../services/userAuth'

const useHistory = () => {
    const { historyLogs, totalHistory, historyParams, isAuthenticated, isHistoryLoading } = useUserAuthData()
    const { setHistoryLogs, setTotalHistory, setHistoryParams, setIsHistoryLoading } = useUserAuthActions()

    const fetchHistory = useCallback(async () => {
        if (!isAuthenticated) return
        setIsHistoryLoading(true)
        try {
            const response = await userAuth.getHistory(historyParams)
            if (response?.status === 200) {
                setHistoryLogs(response.data.formattedHistory || [])
                setTotalHistory(response.data.total || 0) 
            }
        } catch (error) {
            console.error("History fetch error:", error)
        } finally {
            setIsHistoryLoading(false)
        }
    }, [isAuthenticated, historyParams, setHistoryLogs, setTotalHistory, setIsHistoryLoading])

    useEffect(() => {
        fetchHistory()
    }, [fetchHistory])

    const tableHeaders = [
        { label: 'Action Done', value: 'status' },
        { label: 'Date', value: 'updatedAt' },
        { label: 'Full Name', value: 'lastName' }
    ]

    const handleSort = (column) => {
        const isAsc = historyParams.sortColumn === column && historyParams.order === 'asc'
        setHistoryParams({
            sortColumn: column,
            order: isAsc ? 'desc' : 'asc'
        })
    }

    return {
        historyLogs,
        totalHistory,
        tableHeaders,
        isLoading: isHistoryLoading,
        currentPage: historyParams.group,
        rowsPerPage: historyParams.rows,
        searchQuery: historyParams.search,
        searchColumn: historyParams.searchColumn,
        sortColumn: historyParams.sortColumn,
        sortOrder: historyParams.order,
        handleSort,
        setHistoryParams
    }
}

export default useHistory