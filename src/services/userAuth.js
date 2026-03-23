import instance from './instance'

const userAuth = {
	login: (username, password) => {
		return instance.post('users/login', {
			username: username,
			password: password
		}).then(response => {
			return response
		}).catch(error => {
			return error.response.data.error
		})
	},

	logout: () => {
		return instance.post('users/logout')
		.then(response => {
			return response
		})
		.catch(error => {
			return error.response.data.error
		})
	},

	changePassword: (oldPassword, newPassword) => {
        return instance.put('users/change-password', {
            oldPassword: oldPassword,
            newPassword: newPassword
        })
        .then(response => response)
        .catch(error => {
            return error.response
        })
    },

	getHistory: (params) => {
		return instance.get('users/get-history', { params })
		.then(response => {
			return response
		})
		.catch(error => {
			return error.response.data.error
		})
	}
}

export default userAuth