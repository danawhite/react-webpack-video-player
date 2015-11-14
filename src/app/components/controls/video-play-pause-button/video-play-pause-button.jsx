import React, {Component} from 'react';

export default class VideoPlayPauseButton extends Component {
    constructor(props) {
        super(props);
        this.togglePlayback = this.togglePlayback.bind(this);
        this.state = {
            playing: false
        }
    }
    togglePlayback() {
        this.props.onTogglePlayback()
    }
    render() {
        var icon = this.state.playing ? (<i className="icon-pause"></i>) : (<i className="icon-play"></i>);

        return (
            <button className="video-play-pause-button" onClick={this.togglePlayback}>
                {icon} Play
            </button>
        )
    }
}