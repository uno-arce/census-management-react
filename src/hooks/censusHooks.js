import { useEffect, useCallback, useRef } from 'react'
import { useCensusData, useCensusActions } from '../stores/censusStore'
import { useAlertActions } from '../stores/componentStore'
import censusRecord from '../services/censusRecord'

const useCensus = (enabled = true) => {
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
        actions.setIsLoading(true)
        const params = {
            rows: data.rowsPerPage,
            group: data.currentPage,
            sortColumn: data.sortColumn,
            order: data.sortOrder,
            searchColumn: data.searchColumn,
            search: data.searchQuery
        }

        try {
            const response = await censusRecord.getRecords(params)
            if (response?.status === 200) {
                actions.setRecords(response.data)
            }
        } finally {
            actions.setIsLoading(false)
        }
    }, [
        data.rowsPerPage, data.currentPage, data.sortColumn, 
        data.sortOrder, data.searchColumn, data.searchQuery, actions
    ])

    useEffect(() => {
        if (data.totalRecords === 0) {
            fetchTotalRecords()
            actions.resetNewRecord()
        }
    }, [enabled])

    useEffect(() => {
        if (!enabled) return
            
        if (debounceTimer.current) clearTimeout(debounceTimer.current)
            const delay = data.searchQuery ? 500 : 0

            debounceTimer.current = setTimeout(() => {
            fetchRecords()
        }, delay)

        return () => clearTimeout(debounceTimer.current)
    }, [data.currentPage, data.searchQuery, data.sortColumn, data.sortOrder, fetchRecords])


    const handleUpdate = async (id, updatedData) => {
        actionsAlert.setIsAlertOpen(true)
        actionsAlert.setAlertStatus('loading')
        actionsAlert.setAlertMessage('Updating record...')

        const response = await censusRecord.updateRecord(id, updatedData)

        if (response?.status === 200) {
            actionsAlert.setAlertStatus('success')
            actionsAlert.setAlertMessage(response.data.message)
            fetchRecords()
        } else {
            actionsAlert.setAlertStatus('failed')
            actionsAlert.setAlertMessage(response?.data?.error || 'Update failed')
            return null
        }
    }

    const handlePrepareUpdate = (record) => {
        actions.setEditRecord(record)
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

    const tableHeaders = [
        { label: 'ID', value: 'id' },
        { label: 'Last Name', value: 'lastName' },
        { label: 'First Name', value: 'firstName' },
        { label: 'Block / Lot / Street', value: 'blkLotStr' },
        { label: 'Subd. / Zone / Purok', value: 'sudbZnPrk' },
        { label: 'Place of Birth', value: 'birthPlace' },
        { label: 'Date of Birth', value: 'birthDate' },
        { label: 'Sex', value: 'sex' },
        { label: 'Civil Status', value: 'civilStatus' },
        { label: 'Citizenship', value: 'citizenship' },
        { label: 'Occupation', value: 'occupation' },
    ]

    const handleSort = (columnValue) => {
        if (data.sortColumn === columnValue && data.sortOrder === 'desc') {
            actions.setSort('updatedAt', 'desc')
        } 
        else if (data.sortColumn === columnValue && data.sortOrder === 'asc') {
            actions.setSort(columnValue, 'desc')
        } 
        else {
            actions.setSort(columnValue, 'asc')
        }
    }

    const handleCreateRecords = async () => {
    actionsAlert.setIsAlertOpen(true)
    actionsAlert.setAlertStatus('loading')
    actionsAlert.setAlertMessage('Adding resident...')

    const { firstName, lastName, middleName, suffix, ...restOfRecord } = data.newRecord

    const fullNameParts = [middleName, lastName, suffix].filter(Boolean)
    const formattedLastName = fullNameParts.join(' ')

    const recordToSubmit = {
        firstName,
        lastName: formattedLastName,
        ...restOfRecord
    }

    const response = await censusRecord.createRecords([recordToSubmit])

    if (response?.status === 200) {
        actionsAlert.setAlertStatus('success')
        actionsAlert.setAlertMessage(response.data.message)
        actions.resetNewRecord()
        fetchTotalRecords()
    } else {
        actionsAlert.setAlertStatus('failed')
        actionsAlert.setAlertMessage(response?.data?.error || 'Failed to add record')
    }
}

    const isStep1Complete = data.newRecord.firstName && data.newRecord.lastName
    const isStep2Complete = data.newRecord.blkLotStr && data.newRecord.birthPlace && data.newRecord.birthDate
    const isStep3Complete = data.newRecord.sex && data.newRecord.civilStatus && data.newRecord.citizenship

    const steps = [
        { id: 1, label: 'Resident Name', isComplete: isStep1Complete },
        { id: 2, label: 'Resident Address', isComplete: isStep2Complete },
        { id: 3, label: 'Resident Status', isComplete: isStep3Complete }
    ]
    const completedSteps = steps.filter(s => s.isComplete).length

    const residentInputs = [
        { name: 'First Name', value: data.newRecord.firstName, updateState: (val) => actions.setNewRecord('firstName', val) },
        { name: 'Last Name', value: data.newRecord.lastName, updateState: (val) => actions.setNewRecord('lastName', val) },
        { name: 'Middle Name', value: data.newRecord.middleName, updateState: (val) => actions.setNewRecord('middleName', val) },
        { name: 'Suffix', value: data.newRecord.suffix, updateState: (val) => actions.setNewRecord('suffix', val), placeholder: 'Jr. / Sr. / III' },
        { name: 'Address', value: data.newRecord.blkLotStr, updateState: (val) => actions.setNewRecord('blkLotStr', val), placeholder: '123 Main St.', fullWidth: true },
        { name: 'Address 2', value: data.newRecord.sudbZnPrk, updateState: (val) => actions.setNewRecord('sudbZnPrk', val), placeholder: 'Subdivision / Zone / Sitio / Purok', fullWidth: true },
        { name: 'Place of Birth', value: data.newRecord.birthPlace, updateState: (val) => actions.setNewRecord('birthPlace', val), placeholder: 'Province, City', fullWidth: true },
        { name: 'Date of Birth', value: data.newRecord.birthDate, type: 'date', updateState: (val) => actions.setNewRecord('birthDate', val) },
        { name: 'Sex', value: data.newRecord.sex, type: 'select', options: ['Male', 'Female'], updateState: (val) => actions.setNewRecord('sex', val) },
        { name: 'Civil Status', value: data.newRecord.civilStatus, type: 'select', options: ['Single', 'Married', 'Widowed', 'Separated'], updateState: (val) => actions.setNewRecord('civilStatus', val) },
        { name: 'Citizenship', value: data.newRecord.citizenship, updateState: (val) => actions.setNewRecord('citizenship', val) },
        { name: 'Occupation', value: data.newRecord.occupation, updateState: (val) => actions.setNewRecord('occupation', val), fullWidth: true },
    ]

    const updateInputs = [

        { name: 'First Name', value: data.editRecord.firstName, updateState: (val) => actions.updateEditRecord('firstName', val) },
        { name: 'Last Name', value: data.editRecord.lastName, updateState: (val) => actions.updateEditRecord('lastName', val) },
        { name: 'Middle Name', value: data.editRecord.middleName, updateState: (val) => actions.updateEditRecord('middleName', val) },
        { name: 'Suffix', value: data.editRecord.suffix, updateState: (val) => actions.updateEditRecord('suffix', val) },
        { name: 'Address', value: data.editRecord.blkLotStr, updateState: (val) => actions.updateEditRecord('blkLotStr', val), fullWidth: true },
        { name: 'Address 2', value: data.editRecord.sudbZnPrk, updateState: (val) => actions.updateEditRecord('sudbZnPrk', val), fullWidth: true },
        { name: 'Place of Birth', value: data.editRecord.birthPlace, updateState: (val) => actions.updateEditRecord('birthPlace', val), fullWidth: true },
        { name: 'Date of Birth', value: data.editRecord.birthDate, type: 'date', updateState: (val) => actions.updateEditRecord('birthDate', val) },
        { name: 'Sex', value: data.editRecord.sex, type: 'select', options: ['Male', 'Female'], updateState: (val) => actions.updateEditRecord('sex', val) },
        { name: 'Civil Status', value: data.editRecord.civilStatus, type: 'select', options: ['Single', 'Married', 'Widowed', 'Separated'], updateState: (val) => actions.updateEditRecord('civilStatus', val) },
        { name: 'Citizenship', value: data.editRecord.citizenship, updateState: (val) => actions.updateEditRecord('citizenship', val) },
        { name: 'Occupation', value: data.editRecord.occupation, updateState: (val) => actions.updateEditRecord('occupation', val), fullWidth: true },
    ]


    return {
        ...data,
        handleUpdate,
        handlePrepareUpdate,
        handleDelete,
        handleCreateRecords,
        tableHeaders,
        handleSort,
        steps,
        completedSteps,
        residentInputs,
        updateInputs,
        setNewRecord: actions.setNewRecord,
        resetNewRecord: actions.resetNewRecord,
        refresh: fetchRecords,
    }
}

export default useCensus