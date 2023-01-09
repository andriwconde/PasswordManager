import axios from 'axios';
import config from '../config/config';

axios.defaults.baseURL = config.baseURL;
axios.defaults.timeout = config.timeout;


export default axios;