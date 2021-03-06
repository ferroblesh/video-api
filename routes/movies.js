const express = require('express');
const passport = require('passport');
const MoviesService = require('../service/movies');
const cacheResponse = require('../utils/cacheResponse');
const validateHandler = require('../utils/middleware/validationHandler');
const { 
    movieIdSchema, 
    createMovieSchema
} = require('../utils/schemas/movies');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

require('../utils/auth/strategies/jwt');

function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies', router);
    const moviesService = new MoviesService();

    router.get('/', passport.authenticate('jwt', { session: false}), async function(req,res,next) {
        cacheResponse(res,FIVE_MINUTES_IN_SECONDS);
        const { tags } = req.query;
        try {
            const movies = await moviesService.getMovies({ tags });
            res.status(200).json({
                data: movies,
                message: 'movies list'
            });
        } catch (error) {
            next(error);
        }
    });

    router.get('/:movieID', passport.authenticate('jwt', { session: false}), validateHandler({ movieID: movieIdSchema},'params'), async function(req,res,next) {
        cacheResponse(res,SIXTY_MINUTES_IN_SECONDS);
        const { movieID } = req.params;
        try {
            const movie = await moviesService.getMovie({movieID});
            res.status(200).json({
                data: movie,
                message: 'movie'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post('/', passport.authenticate('jwt', { session: false}), validateHandler(createMovieSchema), async function(req,res,next) {
        const { body: movie } = req;
        try {
            const createMovieId = await moviesService.createMovie({movie});
            res.status(201).json({
                data: createMovieId,
                message: 'movie created'
            });
        } catch (error) {
            next(error);
        }
    });

    router.put('/:movieId', passport.authenticate('jwt', { session: false}), validateHandler({ movieId: movieIdSchema},'params'), validateHandler(createMovieSchema), async function(req,res,next) {
        const { movieId } = req.params;
        const { body: movie } = req;
        try {
            const updatedMovieId = await moviesService.updateMovie({ movieId, movie});
            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated'
            });
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:movieId', passport.authenticate('jwt', { session: false}), validateHandler({ movieId: movieIdSchema},'params'), async function(req,res,next) {
        const { movieId } =req.params;
        try {
            const deletedMovieId = await moviesService.deleteMovie({movieId});
            res.status(200).json({
                data: deletedMovieId,
                message: 'movie deleted'
            });
        } catch (error) {
            next(error);
        }
    });
}

module.exports = moviesApi;