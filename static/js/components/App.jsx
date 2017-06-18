import React from 'react';
import { connect } from 'react-redux';

import { ArtistPreview } from 'static/js/components/ArtistPreview';
import { Header } from 'static/js/components/Header';
import { LoadingCover } from 'static/js/components/LoadingCover';

import { actions } from 'static/js/actions';
import { ApiManager } from 'static/js/ApiManager';

import 'static/scss/App.scss';

class App extends React.Component {

    constructor() {
        super();

        this.handleSetSearchBarValue = this.handleSetSearchBarValue.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleArtistElementClick = this.handleArtistElementClick.bind(this);
    }

    render() {
        const {
            artistDataById,
            isLoading,
            searchBarValue,
            searchTerm,
            selectedArtistId,
            selectedArtistRelatedArtistDataById
        } = this.props;

        let relatedArtistElements;
        const relatedArtistIds = Object.keys(selectedArtistRelatedArtistDataById);
        if (relatedArtistIds.length > 0) {
            const relatedArtistRows = relatedArtistIds.map((artistId, index) => {
                const currentArtist = selectedArtistRelatedArtistDataById[artistId];
                return (
                    <div key={ artistId } className="related-artist">
                        { `${ index + 1 }) ${ currentArtist.name }` }
                    </div>
                );
            });
            relatedArtistElements = (
                <div className="related-artists">
                    <p className="title">Related Artists</p>
                    { relatedArtistRows }
                </div>
            )
        } else {
            relatedArtistElements = (
                <div className="no-related-artists">
                    <p>
                        There don't seem to be any related artists for the selected artist.
                    </p>
                </div>
            )
        }

        let resultsElement;
        const artistIds = Object.keys(artistDataById);
        if (artistIds.length > 0) {
            resultsElement = artistIds.map((artistId) => {
                const currentArtist = artistDataById[artistId];
                const handleOnClick = () => this.handleArtistElementClick(artistId);
                const isSelected = artistId === selectedArtistId;
                return (
                    <ArtistPreview
                        key={ artistId }
                        onClick={ handleOnClick }
                        imagePath={ currentArtist.imagePath }
                        isSelected={ isSelected }
                        name={ currentArtist.name }
                        popularity={ currentArtist.popularity }
                    >
                        { isSelected &&
                            relatedArtistElements
                        }
                    </ArtistPreview>
                );
            });
        } else {
            resultsElement = (
                <div className="no-artists-matching-search">
                    <p>
                        There are no artists matching your search! Check your spelling or search for another artist.
                    </p>
                </div>
            );
        }

        return (
            <div id="app">
                <Header
                    search={ this.handleSearch }
                    searchBarValue={ searchBarValue }
                    setSearchBarValue={ this.handleSetSearchBarValue }
                />
                <div className="body">
                    { isLoading &&
                        <LoadingCover />
                    }
                    { (searchTerm !== '') &&
                        resultsElement
                    }
                    { (searchTerm === '') &&
                        <div className="welcome">
                            <h1>Welcome to ACME's <strong>Related Artist Search Engine</strong>.</h1>
                            <p><strong>Search</strong> for an artist, <strong>Click</strong> on their image, <strong>Discover</strong> new artists</p>
                        </div>
                    }
                </div>
            </div>
        )
    }
    handleSetSearchBarValue(event) {
        this.props.dispatch(actions.setSearchBarValue(event.target.value));
    }
    handleSearch() {
        const value = this.props.searchBarValue;
        if (value !== this.props.searchTerm) {
            this.props.dispatch(actions.setIsLoading(true));
            new Promise((resolve, reject) => {
                if (value === '') {
                    this.props.dispatch(actions.setSelectedArtistId(''));
                    this.props.dispatch(actions.setArtistDataById({}));
                    this.props.dispatch(actions.setSelectedArtistRelatedArtistDataById({}));
                    resolve();
                } else {
                    ApiManager.searchArtistByName(value)
                    .then((artistDataById) => {
                        this.props.dispatch(actions.setArtistDataById(artistDataById));
                        resolve();
                    });
                }
            })
            .then(() => {
                this.props.dispatch(actions.setSearchTerm(value));
                this.props.dispatch(actions.setIsLoading(false));
            });
        }
    }
    handleArtistElementClick(artistId) {
        const currentArtist = this.props.artistDataById[artistId];
        const genre = currentArtist.genres[0];
        const artistName = currentArtist.name;

        if (artistId === this.props.selectedArtistId) {
            this.props.dispatch(actions.setSelectedArtistRelatedArtistDataById({}));
            this.props.dispatch(actions.setSelectedArtistId(''));
        } else {
            this.props.dispatch(actions.setIsLoading(true));
            new Promise((resolve, reject) => {
                ApiManager.searchRelatedArtistsByGenre(artistName, genre)
                .then((artistDataById) => {
                    this.props.dispatch(actions.setSelectedArtistRelatedArtistDataById(artistDataById));
                    resolve();
                })
            })
            .then(() => {
                this.props.dispatch(actions.setSelectedArtistId(artistId));
                this.props.dispatch(actions.setIsLoading(false));
            })
        }
    }
}
const mapStateToProps = (state) => {
    return {
        artistDataById: state.artistDataById,
        isLoading: state.isLoading,
        searchBarValue: state.searchBarValue,
        searchTerm: state.searchTerm,
        selectedArtistId: state.selectedArtistId,
        selectedArtistRelatedArtistDataById: state.selectedArtistRelatedArtistDataById
    }
};
export const ConnectedApp = connect(mapStateToProps)(App);
