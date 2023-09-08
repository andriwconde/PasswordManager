import axios from 'axios';
import config from '../config/config';

axios.defaults.baseURL = config.baseURL;
axios.defaults.timeout = config.timeout;

export const  setClientToken = (token)=> {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export default axios;