const axios = require('axios');

const spacexapi = axios.create({
    baseURL: 'https://api.spacexdata.com/v3/',
    params: {
        
    },
    timeout: process.env.TIMEOUT || 5000,
});

//generic get request function

// Generic GET request function
//const get = async (url) => {
//    const response = await spacexapi.get(url);
//    const { data } = response;
//    if (data.success) {
//     return data;
//    }
//    throw new Error("Uh oh!");
// };


module.exports = {
    getLatestData: () => 
      axios.get('https://api.spacexdata.com/v3/launches/latest')
      .then(response => {
        let responsedata = response;
        //console.log(responsedata);
        return responsedata;
      })
    
}