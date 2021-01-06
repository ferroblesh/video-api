const assert = require('assert');
const buildMessage = require('../utils/buildMessages');

describe.only('utils - buildMessages', () => {
    describe('when receives an entity and an action', () => {
        it('should return the respective message', () => {
            const result = buildMessage('movies','create');
            const expected = 'movies created';
            assert.strictEqual(result,expected);
        })
    });
    describe('when receives an entity and an action and it is a list', () => {
        it('should return the respective message with the entity in plural', () => {
            const result = buildMessage('movie','list');
            const expected = 'movies listed';
            assert.strictEqual(result,expected);
        })
    })
})