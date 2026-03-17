import instance from './instance'

const censusRecord = {
    getRecords: (params) => {
        return instance.get('records/get-records', { params })
            .then(res => res)
            .catch(err => err.response)
    },
    getTotalRecords: () => {
        return instance.get('records/get-total-records')
            .then(res => res)
            .catch(err => err.response)
    },
    createRecords: (records) => {
        return instance.post('records/create-records', { records })
            .then(res => res)
            .catch(err => err.response)
    },
    updateRecord: (id, data) => {
        return instance.put(`records/update-record/${id}`, {
            lastName: data.lastName,
            firstName: data.firstName,
            blkLotStr: data.blkLotStr,
            sudbZnPrk: data.sudbZnPrk,
            birthPlace: data.birthPlace,
            birthDate: data.birthDate,
            sex: data.sex,
            civilStatus: data.civilStatus,
            citizenship: data.citizenship,
            occupation: data.occupation,
            status: data.status
        })
            .then(res => res)
            .catch(err => err.response)
    },
    deleteRecords: (ids) => {
        return instance.put('records/delete-records', { ids })
            .then(res => res)
            .catch(err => err.response)
    }
}

export default censusRecord