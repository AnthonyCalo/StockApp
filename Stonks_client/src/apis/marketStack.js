import axios from 'axios';
const { REACT_APP_MY_ENV } = process.env;

export default axios.create({
    baseURL: 'http://api.marketstack.com/v1/',
    params: {
        access_key: process.env.MARKETSTACK
    }
})


