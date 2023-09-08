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
    userKeysInterchange: async function (userCred) {
        return await axios.post('/user/userKeysInterchange', userCred);
    },
    version: async function () {
        return await axios.get('/version');
    },
};
