require(`dotenv`).config(); //reading the dotenv file (mostly for keys and stuff)
const express = require(`express`);

const app = express();
const port = process.env.PORT || 3000

//Setting public folder as root folder
app.use(express.static(`public`));