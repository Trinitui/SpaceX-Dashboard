require('dotenv').config(); // read .env files
const { getLatestData } = require('./lib/spacex-service')
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

//trying to remove get issues
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Listen for HTTP requests on port 3000
app.listen(port, () => {
  console.log('listening on %d', port);
  console.log("Online. Press control+c to take offline")
});

// place at bottom of file
const test = async() => {
  const data = await getLatestData();
  console.log(data);
}
test();