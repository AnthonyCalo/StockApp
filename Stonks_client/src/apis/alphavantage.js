import axios from 'axios';

export default axios.create({
    baseURL: 'https://www.alphavantage.co/query?',
    params: {
        apikey: process.env.alphakey
    }
})
