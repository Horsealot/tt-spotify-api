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
        existingUser.access_token = spotifyTokens.access_token;
        existingUser.refresh_token = spotifyTokens.refresh_token;
        await existingUser.save();
        return await SpotifyService.getUserTops(existingUser.refresh_token);
    },
    getUserTops: async(userId) => {
        let user = await SpotifyUserModel.findOne({_userId: userId});
        if(!user) {
            Logger.error(`index.ctrl.js\t User {${userId}} not found`);
            throw new Error("User not found");
        }
        return await SpotifyService.getUserTops(user.refresh_token);
    },
};

module.exports = self;
