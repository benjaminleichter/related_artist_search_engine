import { RequestHelpers } from 'static/js/RequestHelpers';

const searchArtistByName = (artistName) => RequestHelpers.makeGetRequest(`/search_artist_by_name/${ artistName }`)
    .then((response) => {
        const artistDataById = RequestHelpers.getArtistsDataByIdFromArists(response.artists);
        return Promise.resolve(artistDataById);
    })
    .catch((error) => Promise.reject(error));

const searchRelatedArtistsByGenre = (artistNameToExclude, genre) => RequestHelpers.makeGetRequest(`/search_related_artists_by_genre/${ artistNameToExclude }/${ genre }`)
    .then((response) => {
        const artistDataById = RequestHelpers.getArtistsDataByIdFromArists(response.artists);
        return Promise.resolve(artistDataById);
    })
    .catch((error) => Promise.reject(error));

export const ApiManager = {
    searchArtistByName,
    searchRelatedArtistsByGenre
}
