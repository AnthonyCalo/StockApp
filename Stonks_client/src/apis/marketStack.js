import axios from 'axios';
require('dotenv').config()

export default axios.create({
    baseURL: 'http://api.marketstack.com/v1/',
    params: {
        access_key: process.env.marketstack
    }
})


