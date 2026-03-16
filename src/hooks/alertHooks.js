import { useEffect } from 'react'
import { useAlertData, useAlertActions } from '../stores/componentStore'

const useAlert = () => {
	const alertData = useAlertData()
	const actionsAlert = useAlertActions()

	useEffect(() => {
		let timer

		if(alertData.isAlertOpen) {
			timer = setTimeout(() => {
				actionsAlert.setIsAlertOpen(false)
				actionsAlert.setAlertStatus(null)
			}, 2500)
		}

		return () => {
			if(timer) {
				clearTimeout(timer)
			}
		}
	}, [alertData.isAlertOpen, actionsAlert.setIsAlertOpen])

	const closeAlert = () => {
		actionsAlert.setIsAlertOpen(false)
		actionsAlert.setAlertStatus(null)
	}

	const handleAlertPath = () => {
		const alertPath = {
			loading: 'M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480.5-80Q398-80 325-111.5Z',
			success: 'M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z',
			failed: 'M240-840h400v520L360-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 1.5-15t4.5-15l120-282q9-20 30-34t44-14Zm480 520v-520h160v520H720Z'
		}

		return alertPath[alertData.alertStatus]
	}

	return {
		closeAlert,
		handleAlertPath,
		isAlertOpen: alertData.isAlertOpen,
		alertStatus: alertData.alertStatus,
		alertMessage: alertData.alertMessage
	}
}

export default useAlert