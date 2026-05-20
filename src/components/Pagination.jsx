import React from 'react'
import usePagination from '../hooks/paginationHooks'

export default function Pagination({ currentPage, totalPages, onPageChange, isLoading }) {
    const { getPaginationRange } = usePagination(currentPage, totalPages)
    const pages = getPaginationRange()

    if (totalPages <= 1) return null

    return (
        <div className='flex items-center gap-1 sm:gap-2 max-sm:w-full justify-center select-none'>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className='px-3 py-2 text-sm font-medium rounded-md border border-base-light/20 bg-component-surface hover:bg-base-light/10 text-base disabled:opacity-40 disabled:hover:bg-component-surface transition-colors'
            >
                Prev
            </button>

            {pages.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`dots-${index}`} className="px-3 py-2 text-sm text-base-light">
                            ...
                        </span>
                    )
                }

                return (
                    <button
                        key={`page-${page}`}
                        onClick={() => onPageChange(page)}
                        disabled={isLoading}
                        className={`px-3.5 py-2 text-sm font-semibold rounded-md border transition-all ${
                            currentPage === page
                                ? 'bg-accent border-accent text-white shadow-sm'
                                : 'border-base-light/20 bg-component-surface hover:bg-base-light/10 text-base-light'
                        }`}
                    >
                        {page}
                    </button>
                )
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || isLoading}
                className='px-3 py-2 text-sm font-medium rounded-md border border-base-light/20 bg-component-surface hover:bg-base-light/10 text-base disabled:opacity-40 disabled:hover:bg-component-surface transition-colors'
            >
                Next
            </button>
        </div>
    )
}