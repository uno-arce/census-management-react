import { useCollectionData, useCollectionActions } from '../stores/componentStore'

const useCollection = () => {
	const collectionData = useCollectionData()
	const actionsCollection = useCollectionActions()

	let collectionSelectedGroup = collectionData.collectionSelectedGroup

	const handleOpenCollectionView = (item, index, isSelectable) => {
		if(!isSelectable) {
			return
		}

		actionsCollection.setCollectionSelectedIndex(index)
		actionsCollection.setCollectionItem(item)
		actionsCollection.setIsCollectionOpen(true)
	}

	const handlePreviousCollectionGroup = () => {
		if(collectionSelectedGroup == 1) {
			return
		}

		actionsCollection.setCollectionSelectedGroup(collectionSelectedGroup - 1)
		actionsCollection.setCollectionSelectedIndex(0)
	}

	const handleNextCollectionGroup = (collection) => {
		const nextCollectionGroupLength = Object.keys(collection[collectionSelectedGroup + 1]).length
		if(nextCollectionGroupLength === 0) {
			return
		}

		actionsCollection.setCollectionSelectedGroup(collectionSelectedGroup + 1)
		actionsCollection.setCollectionSelectedIndex(0)
	}

	return {
		handleOpenCollectionView,
		handlePreviousCollectionGroup,
		handleNextCollectionGroup,
		isCollectionOpen: collectionData.isCollectionOpen,
		collectionSelectedIndex: collectionData.collectionSelectedIndex,
		collectionSelectedGroup: collectionData.collectionSelectedGroup
	}
}

export default useCollection