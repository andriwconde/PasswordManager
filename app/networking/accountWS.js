import axios from '../api'

export default userWS = {
    addAccount: async function (account) {
        return await axios.post('/account/add', account);
    }
};