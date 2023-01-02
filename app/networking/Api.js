import axios from 'axios';
import config from '../config/config';

axios.defaults.baseURL = config.baseURL;
axios.defaults.timeout = config.timeout;
axios.defaults.headers.common = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export function setClientToken(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
export default axios;