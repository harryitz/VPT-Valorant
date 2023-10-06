const Client = require('./src/Discord');
const { getWelcomeCredit } = require('./src/utils/Calculator');

require('dotenv').config({
    path: __dirname + "/config/.env"
})
global.config = require('./config/config');

const client = new Client.Client();
client.login();
global.main = client;