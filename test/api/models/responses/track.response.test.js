process.env.NODE_ENV = 'test';

require('module-alias/register');
require('dotenv').config({path: '.env.test'});

//Require the dev-dependencies
const chai = require('chai');
const expect = chai.expect;

const TrackResponse = require('@models/responses/track.response');

describe('Track Response', () => {

    it('should return the right object', (done) => {
        const trackResponse = new TrackResponse({
            created_at: new Date(),
            expired_at: new Date(),
            source: 'private_source',
            public_source: 'public_source'
        });
        expect(trackResponse).to.be.an('object');
        expect(trackResponse).to.have.property('artists');
        expect(trackResponse).to.have.property('album');
        expect(trackResponse).to.have.property('name');
        expect(trackResponse).to.have.property('url');
        done();
    });
});
