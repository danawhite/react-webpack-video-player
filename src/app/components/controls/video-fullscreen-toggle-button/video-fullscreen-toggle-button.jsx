import React, {Component} from 'react';

export default class VideoFullscreenToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.requestFullscreen = this.requestFullscreen.bind(this);
    }
    requestFullscreen() {
        this.props.onToggleFullscreen()
    }
    render() {
        return (
            <button className="video-fullscreen-toggle-button" onClick={this.requestFullscreen}>
                <i className="icon-fullscreen"></i>Fullscreen
            </button>
        )
    }
}