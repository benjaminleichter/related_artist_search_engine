import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'static/js/components/Button';
import { SearchBar } from 'static/js/components/SearchBar';

import 'static/scss/Header.scss';

export class Header extends React.Component {
    render() {
        const {
            search,
            searchBarValue,
            setSearchBarValue,
        } = this.props;
        return (
            <div className="header">
                <SearchBar
                    onChange={ setSearchBarValue }
                    onEnterPress={ search }
                    value={ searchBarValue }
                />
                <Button
                    onClick={ search }
                    text="Search Artists"
                />
            </div>
        )
    }
}

Header.propTypes = {
    setSearchBarValue: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    searchBarValue: PropTypes.string.isRequired
}
