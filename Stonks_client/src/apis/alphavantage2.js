import axios from 'axios';
const { REACT_APP_MY_ENV } = process.env;


export default axios.create({
    baseURL: 'https://www.alphavantage.co/query?',
    params: {
        apikey: process.env.ALPHAKEY2
    }
})


