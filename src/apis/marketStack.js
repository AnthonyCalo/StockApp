import axios from 'axios';

export default axios.create({
    baseURL: 'http://api.marketstack.com/v1/',
    params: {
        access_key: '93b63d59bca8ab7741d814c721bf0b3b'
    }
})


