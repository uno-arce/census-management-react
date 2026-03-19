import { useModalData, useModalActions } from '../stores/componentStore'

const useModal = () => {
    const { isModalOpen, modalConfig } = useModalData()
    const { setIsModalOpen, setModalConfig } = useModalActions()

    const openModal = (config) => {
        setModalConfig(config)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleConfirm = async () => {
        await modalConfig.onConfirm()
        closeModal()
    }

    return {
        isModalOpen,
        modalConfig,
        openModal,
        closeModal,
        handleConfirm
    }
}

export default useModal