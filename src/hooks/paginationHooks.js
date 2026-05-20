import { useMemo } from 'react'

const usePagination = (currentPage, totalPages) => {
    const getPaginationRange = useMemo(() => {
        return () => {
            const delta = 1
            const range = []
            const rangeWithDots = []
            let l

            for (let i = 1; i <= totalPages; i++) {
                if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                    range.push(i)
                }
            }

            for (let i of range) {
                if (l) {
                    if (i - l === 2) {
                        rangeWithDots.push(l + 1)
                    } else if (i - l > 2) {
                        rangeWithDots.push('...')
                    }
                }
                rangeWithDots.push(i)
                l = i
            }

            return rangeWithDots
        }
    }, [currentPage, totalPages])

    return { getPaginationRange }
}

export default usePagination