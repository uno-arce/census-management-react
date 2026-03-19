import { useCollectionActions } from '../stores/componentStore'

const useResidentSidebar = () => {
    const { setIsCollectionOpen } = useCollectionActions()

    const closeSidebar = () => setIsCollectionOpen(false)

    return {
        closeSidebar
    }
}

export default useResidentSidebar