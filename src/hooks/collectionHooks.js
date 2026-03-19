import { useCollectionData, useCollectionActions } from '../stores/componentStore'

const useCollection = () => {
    const { 
        isCollectionOpen, 
        collectionSelectedIndex, 
        collectionSelectedGroup, 
        selectedIds 
    } = useCollectionData()
    const { 
        setIsCollectionOpen, 
        setCollectionSelectedIndex, 
        setCollectionItem, 
        setCollectionSelectedGroup,
        setSelectedIds 
    } = useCollectionActions()

    const handleOpenCollectionView = (item, index, isSelectable) => {
        if(!isSelectable) return
        setCollectionSelectedIndex(index)
        setCollectionItem(item)
        setIsCollectionOpen(true)
    }
    
    const toggleSelect = (id) => {
        const newSelected = selectedIds.includes(id)
            ? selectedIds.filter(item => item !== id)
            : [...selectedIds, id]
        setSelectedIds(newSelected)
    }

    const toggleSelectAll = (records) => {
        if (selectedIds.length === records.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(records.map(r => r.id))
        }
    }

    const clearSelection = () => setSelectedIds([])


    const handlePreviousCollectionGroup = () => {
        if(collectionSelectedGroup === 1) return
        setCollectionSelectedGroup(collectionSelectedGroup - 1)
        setCollectionSelectedIndex(0)
    }

    const handleNextCollectionGroup = (collection) => {
        const nextCollectionGroupLength = Object.keys(collection[collectionSelectedGroup + 1]).length
        if(nextCollectionGroupLength === 0) return
        setCollectionSelectedGroup(collectionSelectedGroup + 1)
        setCollectionSelectedIndex(0)
    }

    return {
        handleOpenCollectionView,
        handlePreviousCollectionGroup,
        handleNextCollectionGroup,
        toggleSelect,
        toggleSelectAll,
        clearSelection,
        isCollectionOpen,
        collectionSelectedIndex,
        collectionSelectedGroup,
        selectedIds
    }
}

export default useCollection