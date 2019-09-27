const SpotifyWebApi = require('spotify-web-api-node');
const Logger = require('@api/utils/logger');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
if (!clientId) throw new Error("Missing env variable SPOTIFY_CLIENT_ID");
if (!clientSecret) throw new Error("Missing env variable SPOTIFY_CLIENT_SECRET");

const self = {
    getAccessAndRefreshTokens: async (code) => {
        const spotifyApi = new SpotifyWebApi({
            clientId,
            clientSecret,
            redirectUri: 'http://localhost'
        });
        try {
            const spotifyData = await spotifyApi.authorizationCodeGrant(code);
            return {
                access_token: spotifyData.body['access_token'],
                refresh_token: spotifyData.body['refresh_token']
            };
        } catch(err) {
            Logger.error(`spotify.js\tError while getting user tokens {${err.message}}`);
            throw err;
        }
    },
    getUserTops: async (refresh_token) => {
        const spotifyApi = new SpotifyWebApi({
            clientId,
            clientSecret,
            redirectUri: 'http://localhost'
        });
        spotifyApi.setRefreshToken(refresh_token);
        try {
            const freshAccessToken = await spotifyApi.refreshAccessToken();
            const userTopArtists = await spotifyApi.getMyTopArtists();
            const userTopTracks = await spotifyApi.getMyTopTracks();
            spotifyApi.setAccessToken(freshAccessToken.body['access_token']);
            return {
                artists: userTopArtists.body.items,
                tracks: userTopTracks.body.items
            };
        } catch(err) {
            Logger.error(`spotify.js\tError while getting user tops {${err}\t${err.message}}`);
            throw err;
        }
    }
};

module.exports = self;
