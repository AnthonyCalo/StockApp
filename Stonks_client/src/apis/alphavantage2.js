import axios from 'axios';
const { REACT_APP_ALPHA_TWO } = process.env;


export default axios.create({
    baseURL: 'https://www.alphavantage.co/query?',
    params: {
        apikey: {REACT_APP_ALPHA_TWO}
    }
})


