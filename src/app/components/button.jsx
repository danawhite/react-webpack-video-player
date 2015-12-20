import React, { PropTypes } from 'react';
import radium from 'radium';
import Icon from '@grove/react-font-awesome';

// Some styling for the button
const button = {
    backgroundColor: 'green',
    color: 'white',
    padding: '5px 10px',
    fontSize: 20,
};

// Optional styling to the icon
const icon = {
    transition: 'transform 200ms',
    transform: 'rotateY(180deg)',
    // radium provides hover states and vendor prefixes
    ':hover': {
        transform: 'rotateY(180deg) scale(1.5)'
    },
};

const Button = React.createClass({
    propTypes: {
        style: PropTypes.object,
        iconStyle: PropTypes.object,
    },

    render() {
        const { style, iconStyle } = this.props;
        return (
            <button style={[button, style]}>
                Click me!
                <Icon name='clock-o' style={[icon, iconStyle]} />
            </button>
        );
    }
});

export default radium(Button);