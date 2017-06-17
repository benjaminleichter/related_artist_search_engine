import { RequestHelpers } from 'static/js/RequestHelpers';

const searchArtistByName = (artistName) => RequestHelpers.makeGetRequest(`/search_artist_by_name/${ artistName }`)
    .then((response) => {
        const artists = response.artists;
        const artistDataById = {};

        artists.items.forEach((artistInfo) => {
            artistDataById[artistInfo.id] = RequestHelpers.deserializeArtistInfo(artistInfo);
        });

        return Promise.resolve(artistDataById);
    })
    .catch((error) => Promise.reject(error));

const searchRelatedArtistsByGenre = (artistNameToExclude, genre) => RequestHelpers.makeGetRequest(`/search_related_artists_by_genre/${ artistNameToExclude }/${ genre }`)
    .then((response) => {
        const artists = response.artists;
        const artistDataById = {};

        artists.items.forEach((artistInfo) => {
            artistDataById[artistInfo.id] = RequestHelpers.deserializeArtistInfo(artistInfo);
        });

        return Promise.resolve(artistDataById);
    })
    .catch((error) => Promise.reject(error));

export const ApiManager = {
    searchArtistByName,
    searchRelatedArtistsByGenre
}
