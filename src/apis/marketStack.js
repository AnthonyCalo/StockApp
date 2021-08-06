import axios from 'axios';

export default axios.create({
    baseURL: 'http://api.marketstack.com/v1/',
    params: {
        access_key: 'c2119850fee432aed35180c116717945'
    }
})


