const axios = require('axios');

const spacexapi = axios.create({
    baseURL: 'https://api.spacexdata.com/v3/',
    params: {
        
    },
    timeout: process.env.TIMEOUT || 5000,
});

//generic get request function

const get = async (url) => {
    const response = await spacexapi.get(url);
    const { data } = response;
    if (data.success) {
        return data;
    }
    throw new Error(data.error.type);
};

module.exports = {
    getLatestData: () => get(`/launches/latest`),
}