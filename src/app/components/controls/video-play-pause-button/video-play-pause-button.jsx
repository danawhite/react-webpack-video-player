import React, {Component} from 'react';

export default class VideoPlayPauseButton extends Component {
    constructor(props) {
        super(props);
        this.togglePlayback = this.togglePlayback.bind(this);
        this.styles = {
            play: {
                position: 'relative',
                height: 20,
                alighSelf: 'stretch',
                right: 250,
                margin: 'auto'
            }
        }
    }
    togglePlayback() {
        this.props.onTogglePlayback()
    }
    render() {
        //var icon = this.state.playing ? (<i className="icon-pause"></i>) : (<i className="icon-play"></i>);
        var icon = this.props.playing ? 'Pause' : 'Play';

        return (
            <button className="video-play-pause-button" onClick={this.togglePlayback} style={this.styles.play}>
                {icon}
            </button>
        )
    }
}