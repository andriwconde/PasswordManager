import axios from '../api'

export default userWS = {
    addAccount: async function (account) {
        return await axios.post('/account/add', account);
    },
    getAccounts: async function (user_id){
        return await axios.post('/account/getAccounts', user_id)
    }
};