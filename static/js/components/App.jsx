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

        const relatedArtistElements = Object.keys(selectedArtistRelatedArtistDataById).map((artistId) => {
            const currentArtist = selectedArtistRelatedArtistDataById[artistId];
            return (
                <div key={ artistId }>
                    { currentArtist.name }
                </div>
            );
        });

        const artistElements = Object.keys(artistDataById).map((artistId) => {
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

        let resultsElement;
        if (artistElements.length > 0) {
            resultsElement = artistElements;
        } else {
            resultsElement = (
                <div>
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
                        <div>
                            <h1>Welcome to ACME's <strong>Related Artist Search Engine</strong></h1>
                            <p><strong>Search</strong> for an artist</p>
                            <p><strong>Click</strong> on their image</p>
                            <p><strong>Discover</strong> new artists</p>
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
        })
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
