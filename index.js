const express = require('express');
const app = express();

const { config } = require('./config/index');

app.get('/', (req, res) => {
    res.send('Hi!');
})

app.get('/json', (req, res) => {
    res.json({ hello: 'world'});
})

app.listen(config.port, () => {
    console.log('Running on port: ' + config.port);
});