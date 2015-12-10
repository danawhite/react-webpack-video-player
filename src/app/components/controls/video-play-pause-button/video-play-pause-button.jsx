import React, {Component} from 'react';

export default class VideoPlayPauseButton extends Component {
    constructor(props) {
        super(props);
        this.togglePlayback = this.togglePlayback.bind(this);
        this.styles = {
            playPauseButton: {
                position: 'relative',
                height: 50,
                width: 50,
                right: 100,
                margin: 'auto',
                borderRadius: 7,
                cursor: 'pointer',
                outline: 'none'
            },
            iconPause: {},
            iconPlay: {}
        }
    }
    togglePlayback() {
        this.props.onTogglePlayback()
    }
    render() {
        //var icon = this.props.playing ? (<i style={this.styles.iconPause}></i>) : (<i style={this.styles.iconPlay}></i>);
        var icon = this.props.playing ? 'Pause' : 'Play';

        return (
            <button className="video-play-pause-button"
                    onClick={this.togglePlayback}
                    style={this.styles.playPauseButton}>
                {icon}
            </button>
        )
    }
}