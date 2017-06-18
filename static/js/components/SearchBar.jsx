import React from 'react';
import PropTypes from 'prop-types';

import 'static/scss/SearchBar.scss';

export class SearchBar extends React.Component {
    constructor() {
        super();

        this.handleEnterPress = this.handleEnterPress.bind(this);
    }
    render() {
        const {
            onChange,
            placeholder,
            value
        } = this.props;
        return (
            <input
                className="search-bar"
                type="text"
                onKeyDown={ this.handleEnterPress }
                onChange={ onChange }
                value={ value }
                placeholder={ placeholder }
            />
        );
    }
    handleEnterPress (event) {
        const enterKeyValue = 13;
        if (event.keyCode === enterKeyValue) {
            this.props.onEnterPress();
        }
    }
}

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
    onEnterPress: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
}
