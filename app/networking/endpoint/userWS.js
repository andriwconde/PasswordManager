import axios from '../Api'

export default userWS = {
    login: async function (userCred) {
        return await axios.post('/user/login', userCred);
    },
    register: async function (userCred) {
        return await axios.post('/user/register',userCred);
    },
    version: async function () {
        return await axios.get('/version');
    },
};
