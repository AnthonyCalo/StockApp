import axios from 'axios';

export default axios.create({
    baseURL: 'http://api.marketstack.com/v1/',
    params: {
        access_key: "5d251c0543eed60c5bf5053ec78eba33"
    }
})


