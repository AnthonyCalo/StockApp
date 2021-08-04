import axios from 'axios';

export default axios.create({
    baseURL: 'https://www.alphavantage.co/query?',
    params: {
        apikey: 'R8H9S7FO2IZN4Q0J'
    }
})
