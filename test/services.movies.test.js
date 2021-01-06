const assert = require('assert');
const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');
const { moviesMock } = require('../utils/mocks/movies');
const proxyquire = require('proxyquire');

describe('services-movies', () => {
    const MoviesService = proxyquire('../service/movies', {
        '../lib/mongo': MongoLibMock
    })
    const moviesService = new MoviesService();
    describe('when getMovies method is called', async () => {
        it('should call the getall MongoLib method', async () => {
            await moviesService.getMovies({});
            assert.strictEqual(getAllStub.called,true);
        })

        it('should return an array of movies', async () => {
            const result = await moviesService.getMovies({});
            const expected = moviesMock;
            assert.deepEqual(result,expected);
        })
    })
})