require('dotenv').config(); // read .env files
const {getLatestData} = require('./lib/spacex-service')
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Express Error Handler
const errorHandler = (err, req, res) => {
  if(err.response){
    // The request was made and the server responded with a status code that falls out of the range of 2xx
    res.status(403).send({ title: 'Server responded with an error', message: err.message});
  } else if (err.request) {
    // The request was made but no response was received
    res.status(503).send({ title: 'Unable to communicate with server', message: err.message});
  } else {
    // Something happened in setting up the request that triggered an Error
    res.status(500).send({ title: 'An unexpected error occured', message: err.message});
  }
};

// Fetch Latest Launch Stats
app.get('/launches/latest', async (req,res) => {
  try {
    const data = await getLatestData();
    res.setHeader('Content-type','application/json');
    res.send(data);
  } catch (error) {
    errorHandler(error, req,res);
  }
});

// Redirect all traffic to index.html to remove "cannot get xyz" errors
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Listen for HTTP requests on port 3000
app.listen(port, () => {
  console.log('listening on %d', port);
  console.log("Online. Press control+c to take offline")
});










// place at bottom of file  -  This is working!!!
//const test = async() => {
//  const data = await getLatestData();
//  console.log("Data Testing: ", data.data);
//}
//test();