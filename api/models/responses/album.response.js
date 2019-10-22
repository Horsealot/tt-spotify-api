const ArtistResponse = require('./artist.response');

class AlbumResponse {
    constructor(album) {
        this.artists = album.artists ? album.artists.map((artist) => new ArtistResponse(artist)) : [];
        this.name = album.name;
        this.images = album.images;
        this.type = album.type;
        this.album_type = album.album_type;
        this.url = album.external_urls ? album.external_urls.spotify : null;
    }
}

module.exports = AlbumResponse;
