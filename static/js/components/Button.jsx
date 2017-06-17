import React from 'react';
import PropTypes from 'prop-types';

import 'static/scss/Button.scss';

export class Button extends React.Component {
    render() {
        const {
            onClick,
            text
        } = this.props;
        return (
            <div className="button" onClick={ onClick }>{ text }</div>
        )
    }

}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
}