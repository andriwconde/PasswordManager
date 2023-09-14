import axios from '../api'

export default userWS = {
    addAccount: async function (account) {
        return await axios.post('/account/add', account);
    },
    getAccounts: async function (accounts){
        return await axios.post('/account/getAccounts', accounts)
    },
    updateAccount: async function (account){
        return await axios.post('/account/update', account)
    },
    deleteAccount: async function (account_id){
        return await axios.post('/account/delete', account_id)
    },
    deleteManyAccounts: async function (accountsArray){
        return await axios.post('/account/deleteMany', accountsArray)
    }
};