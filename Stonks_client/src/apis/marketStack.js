import axios from 'axios';
const { REACT_APP_MARKETSTACK } = process.env;

export default axios.create({
    baseURL: 'http://api.marketstack.com/v1/',
    params: {
        access_key: REACT_APP_MARKETSTACK
    }
})


