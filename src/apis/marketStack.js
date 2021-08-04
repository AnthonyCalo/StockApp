import axios from 'axios';

export default axios.create({
    baseURL: 'http://api.marketstack.com/v1/',
    params: {
        access_key: 'a5187679a96922dd7fe65e02ab83dd8e'
    }
})


