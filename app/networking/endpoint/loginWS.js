import axios from '../Api'

export default LoginWS = {
    login: async function (userCred) {
        return await axios.post('/login',
            userCred
        );
    },
    prueba: async function () {
        return await axios.get('/login');
    },
};
