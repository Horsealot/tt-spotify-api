process.env.NODE_ENV = 'test';

require('module-alias/register');
require('dotenv').config({path: '.env.test'});

//Require the dev-dependencies
const chai = require('chai');
const expect = chai.expect;

const AlbumResponse = require('@models/responses/album.response');

describe('Album Response', () => {

    it('should return the right object', (done) => {
        const albumResponse = new AlbumResponse({
            created_at: new Date(),
            expired_at: new Date(),
            source: 'private_source',
            public_source: 'public_source',
        });
        expect(albumResponse).to.be.an('object');
        expect(albumResponse).to.have.property('artists');
        expect(albumResponse).to.have.property('name');
        expect(albumResponse).to.have.property('images');
        expect(albumResponse).to.have.property('type');
        expect(albumResponse).to.have.property('album_type');
        expect(albumResponse).to.have.property('url');
        done();
    });
});
