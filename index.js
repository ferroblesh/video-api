const express = require('express');
const app = express();

const { config } = require('./config/index');
const authApi = require('./routes/auth');

const moviesApi = require('./routes/movies.js');
const userMoviesApi = require('./routes/userMovies');
const { logErrors, errorHandler, wrapError } = require('./utils/middleware/errorsHandler');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());

app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

authApi(app);
moviesApi(app);
userMoviesApi(app);

app.use(notFoundHandler);

app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log('Running on port: ' + config.port);
});