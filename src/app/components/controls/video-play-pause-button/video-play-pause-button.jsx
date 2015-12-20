import React, {Component} from 'react';
import Icon from '@grove/react-font-awesome';
import styles from './video-play-pause-button.styles'

export default class VideoPlayPauseButton extends Component {
    constructor(props) {
        super(props);
        this.togglePlayback = this.togglePlayback.bind(this);
        this.styles = styles;
    }
    togglePlayback() {
        this.props.onTogglePlayback()
    }
    render() {
        var icon = this.props.playing ? (<Icon name="pause" style={this.styles.iconPause}></Icon>) : (<Icon name="play" style={this.styles.iconPlay}></Icon>);

        return (
            <button className="video-play-pause-button"
                    onClick={this.togglePlayback}
                    style={this.styles.playPauseButton}>
                {icon}
            </button>
        )
    }
}