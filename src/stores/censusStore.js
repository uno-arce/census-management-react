import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'

const useCensusStore = create(
    persist(
        (set) => ({
            records: [],
            isLoading: false,
            totalRecords: 0,
            rowsPerPage: 10,
            currentPage: 1,
            searchQuery: '',
            searchColumn: 'lastName',
            sortColumn: 'updatedAt',
            sortOrder: 'desc',
            newRecord: {
                firstName: '', lastName: '', middleName: '', suffix: '',
                blkLotStr: '', sudbZnPrk: '', birthPlace: '', birthDate: '',
                sex: '', civilStatus: '', citizenship: 'Filipino', occupation: ''
            },
            editRecord: {
                id: '', firstName: '', lastName: '', middleName: '', suffix: '',
                blkLotStr: '', sudbZnPrk: '', birthPlace: '', birthDate: '',
                sex: '', civilStatus: '', citizenship: 'Filipino', occupation: ''
            },

            actions: {
                setRecords: (records) => set({ records }),
                setIsLoading: (loading) => set({ isLoading: loading }),
                setTotalRecords: (total) => set({ totalRecords: total }),
                setCurrentPage: (page) => set({ currentPage: page }),
                setRowsPerPage: (rows) => set({ rowsPerPage: rows }),
                setSearchQuery: (query) => set({ searchQuery: query }),
                setSearchColumn: (column) => set({ searchColumn: column }), 
                setSort: (column, order) => set({ sortColumn: column, sortOrder: order, currentPage: 1 }),
                setEditRecord: (record) => {
                    const formattedDate = record.birthDate ? record.birthDate.split('T')[0] : ''
                    set({ editRecord: { ...record, id: record.id, birthDate: formattedDate } })
                },
                setNewRecord: (field, value) => set((state) => ({
                    newRecord: { ...state.newRecord, [field]: value }
                })),
                updateEditRecord: (field, value) => set((state) => ({
                    editRecord: { ...state.editRecord, [field]: value }
                })),
                resetNewRecord: () => set({ 
                    newRecord: {
                        firstName: '', lastName: '', middleName: '', suffix: '',
                        blkLotStr: '', sudbZnPrk: '', birthPlace: '', birthDate: '',
                        sex: '', civilStatus: '', citizenship: 'Filipino', occupation: ''
                    }
                }),
                resetEditRecord: () => set({ 
                    editRecord: {
                        id: '', firstName: '', lastName: '', middleName: '', suffix: '',
                        blkLotStr: '', sudbZnPrk: '', birthPlace: '', birthDate: '',
                        sex: '', civilStatus: '', citizenship: 'Filipino', occupation: ''
                    }
                }),
                resetCensusState: () => set({ 
                    records: [], 
                    currentPage: 1, 
                    searchQuery: '', 
                    rowsPerPage: 15 
                })
            }
        }),
        {
            name: 'census-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ 
                totalRecords: state.totalRecords,
                currentPage: state.currentPage,
                searchQuery: state.searchQuery,
                searchColumn: state.searchColumn,
                sortColumn: state.sortColumn,
                sortOrder: state.sortOrder,
                rowsPerPage: state.rowsPerPage,
                newRecord: state.newRecord,
                editRecord: state.editRecord
            }),
        }
    )
)

export const useCensusData = () => useCensusStore(useShallow((state) => ({
    records: state.records,
    isLoading: state.isLoading,
    totalRecords: state.totalRecords,
    rowsPerPage: state.rowsPerPage,
    currentPage: state.currentPage,
    searchQuery: state.searchQuery,
    searchColumn: state.searchColumn,
    sortColumn: state.sortColumn,
    sortOrder: state.sortOrder,
    newRecord: state.newRecord,
    editRecord: state.editRecord
})))

export const useCensusActions = () => useCensusStore((state) => state.actions)

export default useCensusStore