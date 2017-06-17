import { ActionTypes } from './actions';
const initialState = {
    artistDataById: {},
    isLoading: false,
    searchBarValue: '',
    searchTerm: '',
    selectedArtistId: '',
    selectedArtistRelatedArtistDataById: {}
}

const reduceSetSearchBarValue = (state, action) => {
    const updates = {
        searchBarValue: action.payload.value,
    };
    return Object.assign({}, state, updates)
}

const reduceSetArtistDataById = (state, action) => {
    const updates = {
        artistDataById: action.payload.artistDataById,
    };
    return Object.assign({}, state, updates);
}

const reduceSetSearchTerm = (state, action) => {
    const updates = {
        searchTerm: action.payload.searchTerm,
    };
    return Object.assign({}, state, updates);
}

const reduceSetIsLoading = (state, action) => {
    const updates = {
        isLoading: action.payload.isLoading
    };
    return Object.assign({}, state, updates);
}

const reduceSetSelectedArtistId = (state, action) => {
    const updates = {
        selectedArtistId: action.payload.selectedArtistId
    };
    return Object.assign({}, state, updates);
}

const reduceSetSelectedArtistRelatedArtistDataById = (state, action) => {
    const updates = {
        selectedArtistRelatedArtistDataById: action.payload.relatedArtistDataById
    };
    return Object.assign({}, state, updates);
}

export const RootReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.SET_SEARCH_BAR_VALUE:
            return reduceSetSearchBarValue(state, action);
        case ActionTypes.SET_SEARCH_TERM:
            return reduceSetSearchTerm(state, action);
        case ActionTypes.SET_ARTIST_DATA_BY_ID:
            return reduceSetArtistDataById(state, action);
        case ActionTypes.SET_IS_LOADING:
            return reduceSetIsLoading(state, action);
        case ActionTypes.SET_SELECTED_ARTIST_ID:
            return reduceSetSelectedArtistId(state, action);
        case ActionTypes.SET_SELECTED_ARTIST_RELATED_ARTISTS_BY_ID:
            return reduceSetSelectedArtistRelatedArtistDataById(state, action);
        default:
            return state;
    }
}
