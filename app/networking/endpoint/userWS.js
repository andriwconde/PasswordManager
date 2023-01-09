import axios from '../Api'

export default userWS = {
    login: async function (userCred) {
        return await axios.post('/login', userCred);
    },
    register: async function (userCred) {
        return await axios.post('/register',userCred);
    },
    version: async function () {
        return await axios.get('/version');
    },
};
