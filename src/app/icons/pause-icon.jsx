import React from 'react';
import Icon from 'react-icon';

export default class PauseIcon extends React.Component{
    constructor(props) {
        super(props);
        this.styles = {
            icon: {
                position: 'relative',
                height: 20,
                width: 30
            },
            container: {
                height: 100,
                width: 100
            }
        }
    }
    render() {
        return (
        <Icon className=""glyph="clock" style={this.styles.icon}/>
        )
    }
};