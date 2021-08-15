import axios from 'axios';

export default axios.create({
    baseURL: 'http://api.marketstack.com/v1/',
    params: {
        access_key: "3dca23006a7d0a844a751f682623250f"
    }
})


