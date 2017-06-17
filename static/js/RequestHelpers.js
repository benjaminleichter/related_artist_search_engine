const makeGetRequest = (url) => {
    return new Promise((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = (event) => {
            const request = event.target;
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                     resolve(request.response);
                } else {
                    reject(new Error(`${ request.status }: ${ request.statusText }`));
                }
            }
        }

        xmlhttp.open('GET', url);
        xmlhttp.responseType = 'json';
        xmlhttp.send(null);
    })
};

const deserializeArtistInfo = (artistInfo) => ({
    imagePath: ((artistInfo.images[0] || {}).url || null),
    name: artistInfo.name,
    popularity: artistInfo.popularity,
    genres: artistInfo.genres
});

export const RequestHelpers = {
    deserializeArtistInfo,
    makeGetRequest,
}