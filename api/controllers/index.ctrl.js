const mongoose = require('mongoose');
const SpotifyUserModel = mongoose.model('SpotifyUser');
const Logger = require('@logger');

const SpotifyService = require('@api/services/spotify');

const self = {
    linkUser: async(userId, code) => {
        let existingUser = await SpotifyUserModel.findOne({_userId: userId});
        if(existingUser) {
            Logger.debug(`index.ctrl.js\t User {${userId}} already linked, replacing his spotify account`);
        } else {
            existingUser = new SpotifyUserModel({_userId: userId});
        }
        const spotifyTokens = await SpotifyService.getAccessAndRefreshTokens(code);
        const userTops = await SpotifyService.getUserTops(spotifyTokens.refresh_token);
        existingUser.access_token = spotifyTokens.access_token;
        existingUser.refresh_token = spotifyTokens.refresh_token;
        existingUser.tracks = userTops.tracks;
        existingUser.artists = userTops.artists;
        return await existingUser.save();
    },
    delinkUser: async (req, res) => {
        let existingUser = await SpotifyUserModel.findOne({_userId: req.params.id});
        if (!existingUser) {
            return res.status(404).send('User not found');
        }
        existingUser.access_token = null;
        existingUser.refresh_token = null;
        existingUser.tracks = [];
        existingUser.artists = [];
        await existingUser.save();
        return res.send();
    },
    getUserTops: async(userId) => {
        let user = await SpotifyUserModel.findOne({_userId: userId});
        if(!user) {
            Logger.error(`index.ctrl.js\t User {${userId}} not found`);
            throw new Error("User not found");
        }
        const userTops = await SpotifyService.getUserTops(user.refresh_token);
        user.tracks = userTops.tracks;
        user.artists = userTops.artists;
        return await user.save();
    },
};

module.exports = self;
