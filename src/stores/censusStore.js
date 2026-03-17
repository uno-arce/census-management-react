import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'

const useCensusStore = create(
    persist(
        (set) => ({
            records: [],
            totalRecords: 0,
            rowsPerPage: 10,
            currentPage: 1,
            searchQuery: '',
            searchColumn: 'lastName',
            sortColumn: 'updatedAt',
            sortOrder: 'desc',

            actions: {
                setRecords: (records) => set({ records }),
                setTotalRecords: (total) => set({ totalRecords: total }),
                setCurrentPage: (page) => set({ currentPage: page }),
                setSearchQuery: (query) => set({ searchQuery: query }),
                setSort: (column, order) => set({ sortColumn: column, sortOrder: order }),
                resetCensusState: () => set({ records: [], currentPage: 1, searchQuery: '' })
            }
        }),
        {
            name: 'census-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ 
                records: state.records,
                totalRecords: state.totalRecords,
                currentPage: state.currentPage,
                searchQuery: state.searchQuery,
                sortColumn: state.sortColumn,
                sortOrder: state.sortOrder
            }),
        }
    )
)

export const useCensusData = () => useCensusStore(useShallow((state) => ({
    records: state.records,
    totalRecords: state.records.length,
    rowsPerPage: state.rowsPerPage,
    currentPage: state.currentPage,
    searchQuery: state.searchQuery,
    searchColumn: state.searchColumn,
    sortColumn: state.sortColumn,
    sortOrder: state.sortOrder
})))

export const useCensusActions = () => useCensusStore((state) => state.actions)

export default useCensusStore