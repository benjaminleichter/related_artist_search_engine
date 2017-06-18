import React from 'react';
import PropTypes from 'prop-types';

import 'static/scss/ArtistPreview.scss';

export class ArtistPreview extends React.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.isSelected !== nextProps.isSelected;
    }
    render() {
        const {
            imagePath,
            name,
            popularity,
            onClick,
            isSelected
        } = this.props;

        const style = {}
        if (imagePath !== null) {
            style['backgroundImage'] = `url(${ imagePath })`;
        }
        const selectedClass = isSelected ? ' selected' : '';
        return (
            <div className={ `artist-preview${ selectedClass }` } onClick={ onClick }>
                <div className="inner">
                    <div className="artist-thumbnail" style={ style } />
                    <div className="artist-info">
                        <strong>{ name }</strong>
                        <p>Popularity: { popularity }%</p>
                    </div>
                </div>
                { this.props.children }
            </div>
        );
    }
}

ArtistPreview.propTypes = {
    onClick: PropTypes.func.isRequired,
    imagePath: PropTypes.string,
    isSelected: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    popularity: PropTypes.number.isRequired
}
