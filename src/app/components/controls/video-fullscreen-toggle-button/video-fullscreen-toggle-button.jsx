import React, {Component} from 'react';
import FS from 'fs';
import Icon from '@grove/react-font-awesome';

export default class VideoFullscreenToggleButton extends React.Component {
    constructor(props) {
        super(props);
        console.log(FS);
        this.requestFullscreen = this.requestFullscreen.bind(this);
        this.styles = {
            toggleFullscreenButton: {
                position: 'absolute',
                top: 20,
                right: 20,
                height: 30,
                cursor: 'pointer',
                outline: 'none',
                backgroundColor: 'transparent',
                border: 'none'
            },
            icon: {
                fontSize: 36,
                color: 'white'
            }
        }
    }
    requestFullscreen() {
        this.props.onToggleFullscreen()
    }
    render() {
        return (
            <button onClick={this.requestFullscreen} style={this.styles.toggleFullscreenButton}>
                <Icon name="expand" style={this.styles.icon}/>
            </button>
        )
    }
}