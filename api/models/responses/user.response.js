const ArtistResponse = require('./artist.response');
const TrackResponse = require('./track.response');

class UserResponse {
    constructor(user) {
        this.last_updated_date = user.last_updated_at;
        this.artists = user.artists ? user.artists.map((artist) => new ArtistResponse(artist)) : [];
        this.tracks = user.tracks ? user.tracks.map((track) => new TrackResponse(track)) : [];
    }
}

module.exports = UserResponse;
