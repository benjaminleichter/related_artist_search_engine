export const ActionTypes = {
    SET_IS_LOADING: 'SET_IS_LOADING',
    SET_SEARCH_BAR_VALUE: 'SET_SEARCH_BAR_VALUE',
    SET_SEARCH_TERM: 'SET_SEARCH_TERM',
    SET_ARTIST_DATA_BY_ID: 'SET_ARTIST_DATA_BY_ID',
    SET_SELECTED_ARTIST_ID: 'SET_SELECTED_ARTIST_ID',
    SET_SELECTED_ARTIST_RELATED_ARTISTS_BY_ID: 'SET_SELECTED_ARTIST_RELATED_ARTISTS_BY_ID'
}

const setSearchBarValue = (value) => ({
    payload: {
        value,
    },
    type: ActionTypes.SET_SEARCH_BAR_VALUE,
});

const setSearchTerm = (searchTerm) => ({
    payload: {
        searchTerm,
    },
    type: ActionTypes.SET_SEARCH_TERM,
})

const setArtistDataById = (artistDataById) => ({
    payload: {
        artistDataById,
    },
    type: ActionTypes.SET_ARTIST_DATA_BY_ID
});

const setIsLoading = (isLoading) => ({
    payload: {
        isLoading,
    },
    type: ActionTypes.SET_IS_LOADING
});

const setSelectedArtistId = (selectedArtistId) => ({
    payload: {
        selectedArtistId
    },
    type: ActionTypes.SET_SELECTED_ARTIST_ID
});

const setSelectedArtistRelatedArtistDataById = (relatedArtistDataById) => ({
    payload: {
        relatedArtistDataById
    },
    type: ActionTypes.SET_SELECTED_ARTIST_RELATED_ARTISTS_BY_ID
})

export const actions = {
    setSearchBarValue,
    setSearchTerm,
    setArtistDataById,
    setIsLoading,
    setSelectedArtistId,
    setSelectedArtistRelatedArtistDataById
}
