import axios from '../api'

export default userWS = {
    login: async function (userCred) {
        return await axios.post('/user/login', userCred);
    },
    bioLogin: async function (userCred) {
        return await axios.post('/user/bioLogin', userCred);
    },
    register: async function (userCred) {
        return await axios.post('/user/register', userCred);
    },
    userFPK: async function (userCred) {
        return await axios.post('/user/userFPK', userCred);
    },
    BPK: async function () {
        return await axios.get('/user/BPK');
    },
    version: async function () {
        return await axios.get('/version');
    },
};
