import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import VideoVolumeButton from './components/controls/video-volume-button/video-volume-button;
import VideoPlayPauseButton from './components/controls/video-play-pause-button/video-play-pause-button';
import VideoTimeIndicator from './components/video-time-indicator';
import VideoFullscreenButton from './components/controls/video-fullscreen-button/video-fullscreen-button';
import VideoVolumeButton from './components/controls/video-volume-button';

export default class Video extends Component{
    constructor() {
        this.playing = false;
        this.percentPlayed =  0;
        this.percentBuffered = 0;
        this.duration =  0;
        this.currentTime =  0;
        this.muted = false;
        this.volumeLevel = 0.5;
        this.fullScreen = false;
        this.onVolumeChange = this.onVolumeChange.bind(this);
    }
    render() {
        return (
            <div className="video-player">
                <Video/>
                <div class="video-controls">
                    <VideoVolumeButton onChange={this.props.onVolumeChange}/>
                    <VideoPlayPauseButton/>
                    <VideoFullscreenButton/>
                    <VideoTimeIndicator/>
                </div>
            </div>
        )
    }
}




