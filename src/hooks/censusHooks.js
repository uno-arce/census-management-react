import { useEffect, useCallback, useRef } from 'react'
import { useCensusData, useCensusActions } from '../stores/censusStore'
import { useAlertActions } from '../stores/componentStore'
import censusRecord from '../services/censusRecord'

const useCensus = () => {
    const data = useCensusData()
    const actions = useCensusActions()
    const actionsAlert = useAlertActions()
    const debounceTimer = useRef(null)

    const fetchTotalRecords = useCallback(async () => {
        const response = await censusRecord.getTotalRecords()
        if (response?.status === 200) {
            actions.setTotalRecords(response.data.total)
        }
    }, [actions])

    const fetchRecords = useCallback(async () => {
        const params = {
            rows: data.rowsPerPage,
            group: data.currentPage,
            sortColumn: data.sortColumn,
            order: data.sortOrder,
            searchColumn: data.searchColumn,
            search: data.searchQuery
        }

        const response = await censusRecord.getRecords(params)
        if (response?.status === 200) {
            actions.setRecords(response.data)
        }
    }, [
        data.rowsPerPage, data.currentPage, data.sortColumn, 
        data.sortOrder, data.searchColumn, data.searchQuery, actions
    ])

    const handleUpdate = async (id, updatedData) => {
        actionsAlert.setIsAlertOpen(true)
        actionsAlert.setAlertStatus('loading')
        actionsAlert.setAlertMessage('Updating record...')

        const response = await censusRecord.updateRecord(id, updatedData)

        if (response?.status === 200) {
            actionsAlert.setAlertStatus('success')
            actionsAlert.setAlertMessage(response.data.message)
            fetchRecords()
            return response.data
        } else {
            actionsAlert.setAlertStatus('failed')
            actionsAlert.setAlertMessage(response?.data?.error || 'Update failed')
            return null
        }
    }

    const handleDelete = async (ids) => {
        actionsAlert.setIsAlertOpen(true)
        actionsAlert.setAlertStatus('loading')
        actionsAlert.setAlertMessage('Deleting records...')

        const response = await censusRecord.deleteRecords(ids)
        if (response?.status === 200) {
            actionsAlert.setAlertStatus('success')
            actionsAlert.setAlertMessage('Deleted successfully')
            fetchRecords()
            fetchTotalRecords()
        }
    }

    useEffect(() => {
        if (data.totalRecords === 0) {
            fetchTotalRecords()
        }
    }, [])

    useEffect(() => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current)

            const delay = data.searchQuery ? 500 : 0

            debounceTimer.current = setTimeout(() => {
                fetchRecords()
            }, delay)

            return () => clearTimeout(debounceTimer.current)
        }, [data.currentPage, data.searchQuery, data.sortColumn, data.sortOrder, fetchRecords])

    return {
        ...data,
        handleUpdate,
        handleDelete,
        refresh: fetchRecords
    }
}

export default useCensus