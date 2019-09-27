const ArtistResponse = require('./artist.response');
const AlbumResponse = require('./album.response');

class TrackResponse {
    constructor(track) {
        this.artists = track.artists ? track.artists.map((artist) => new ArtistResponse(artist)) : [];
        this.album = new AlbumResponse(track.album);
        this.name = track.name;
        this.url = track.external_urls ? track.external_urls.spotify : null;
    }
}

module.exports = TrackResponse;
