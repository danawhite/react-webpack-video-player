import React, {Component} from 'react';

export default class VideoFullscreenToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.requestFullscreen = this.requestFullscreen.bind(this);
        this.styles = {
            toggleFullscreenButton: {
                position: 'absolute',
                color: '#ffdd00',
                top: 10,
                right: 10,
                fontSize: 0.9,
                height: 30,
                //padding: 0 10px,
                cursor: 'pointer',
                outline: 'none'
            }
        }
    }
    requestFullscreen() {
        this.props.onToggleFullscreen()
    }
    render() {
        return (
            <button onClick={this.requestFullscreen} style={this.styles.toggleFullscreenButton}>
                <i className="icon-fullscreen"></i>Fullscreen
            </button>
        )
    }
}