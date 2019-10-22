process.env.NODE_ENV = 'test';

require('module-alias/register');
require('dotenv').config({path: '.env.test'});

//Require the dev-dependencies
const chai = require('chai');
const expect = chai.expect;

const ArtistResponse = require('@models/responses/artist.response');

describe('Track Response', () => {

    it('should return the right object', (done) => {
        const artistResponse = new ArtistResponse({
            created_at: new Date(),
            expired_at: new Date(),
            source: 'private_source',
            public_source: 'public_source',
            genres: ['ROCK']
        });
        expect(artistResponse).to.be.an('object');
        expect(artistResponse).to.have.property('name');
        expect(artistResponse).to.have.property('type');
        expect(artistResponse).to.have.property('images');
        expect(artistResponse).to.have.property('genres');
        expect(artistResponse).to.have.property('url');
        done();
    });
});
