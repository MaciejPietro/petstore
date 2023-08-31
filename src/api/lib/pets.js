import apiClient from '../apiClient'

export const fetchPets = (status) => {
    if(!status) {
        console.error('Please, provide pet status in order to retrive pets list!')
        return;
    }
    return apiClient.get(`/pet/findByStatus?status=${status}&petPage=10`)
}


export const purchasePet = (data) => {
    if(!data) {
        console.error('Please, provide data of pet order!')
        return;
    }
    return apiClient.post('/store/order', data)
}