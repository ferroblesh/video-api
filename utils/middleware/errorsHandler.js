const { config } = require('../../config');
const boom = require('@hapi/boom');

function withErrorStack(error, stack) {
    if(config.dev) {
        return { ...error, stack }
    }
}

function logErrors(error, req, res, next ) {
    next(error);
}

function wrapError(err,req, res, next) {
    if(!err.isBoom) {
        next(boom.badImplementation(err));
    }
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next ) {
    const {output: { statusCode, payload}} = error;
    res.status(statusCode);
    res.json(withErrorStack(payload, error.stack));
}

module.exports = {
    logErrors,
    wrapError,
    errorHandler
};