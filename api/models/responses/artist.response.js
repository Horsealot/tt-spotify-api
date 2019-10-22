class ArtistResponse {
    constructor(artist) {
        this.name = artist.name;
        this.type = artist.type;
        this.images = artist.images;
        this.genres = artist.genres;
        this.url = artist.external_urls ? artist.external_urls.spotify : null;
    }
}

module.exports = ArtistResponse;
