require('dotenv').config();

let Weather = {
    apikey: process.env.API_KEY || ""
};

module.exports = Weather;
