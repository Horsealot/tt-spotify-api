process.env.NODE_ENV = 'test';

require('module-alias/register');
require('dotenv').config({path: '.env.test'});

//Require the dev-dependencies
const chai = require('chai');
const expect = chai.expect;

const UserResponse = require('@models/responses/user.response');

describe('User Response', () => {
    //
    // it('should return the right object', (done) => {
    //     const artistResponse = new ArtistResponse({
    //         created_at: new Date(),
    //         expired_at: new Date(),
    //         source: 'private_source',
    //         public_source: 'public_source',
    //     });
    //     expect(artistResponse).to.be.an('object');
    //     expect(artistResponse).to.have.property('name');
    //     expect(artistResponse).to.have.property('type');
    //     expect(artistResponse).to.have.property('images');
    //     expect(artistResponse).to.have.property('genre');
    //     expect(artistResponse).to.have.property('url');
    //     done();
    // });
});
