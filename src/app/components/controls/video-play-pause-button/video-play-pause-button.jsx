import React, {Component} from 'react';

export default class VideoPlayPauseButton extends Component {
    constructor(props) {
        super(props);
        this.togglePlayback = this.togglePlayback.bind(this);
    }
    togglePlayback() {
        this.props.onTogglePlayback()
    }
    render() {
        //var icon = this.state.playing ? (<i className="icon-pause"></i>) : (<i className="icon-play"></i>);
        var icon = this.props.playing ? 'Pause' : 'Play';

        return (
            <button className="video-play-pause-button" onClick={this.togglePlayback}>
                {icon}
            </button>
        )
    }
}