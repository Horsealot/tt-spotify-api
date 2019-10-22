const validator = require('@api/utils/validator');

const IndexController = require('@api/controllers/index.ctrl');
const postUserValidator = require('@models/validators/postUser.validator');
const ArtistResponse = require('@models/responses/artist.response');
const TrackResponse = require('@models/responses/track.response');

module.exports = (router) => {
    router.post('/users', validator(postUserValidator, 'body'), (req, res, next) => {
        IndexController.linkUser(req.body.user_id, req.body.authorization_code).then((user) => {
            res.send({
                artists: user.artists.map((artist) => new ArtistResponse(artist)),
                tracks: user.tracks.map((track) => new TrackResponse(track))
            });
        }).catch((err) => {
            res.status(503).send({error: err.message});
        });
    });
    router.delete('/users/:id', IndexController.delinkUser);
    router.get('/users/:id', (req, res, next) => {
        IndexController.getUserTops(req.params.id).then((user) => {
            res.send({
                artists: user.artists.map((artist) => new ArtistResponse(artist)),
                tracks: user.tracks.map((track) => new TrackResponse(track))
            });
        }).catch((err) => {
            res.status(503).send({error: err.message});
        });
    });

};
