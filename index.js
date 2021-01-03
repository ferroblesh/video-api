const express = require('express');
const app = express();

const { config } = require('./config/index');

const moviesApi = require('./routes/movies.js');

app.use(express.json());

moviesApi(app);

app.listen(config.port, () => {
    console.log('Running on port: ' + config.port);
});