import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import VideoPlayPauseButton from './components/controls/video-play-pause-button/video-play-pause-button';
import VideoTimeIndicator from './components/controls/video-time-indicator/video-time-indicator';
import VideoFullscreenToggleButton from './components/controls/video-fullscreen-toggle-button/video-fullscreen-toggle-button';
import VideoVolumeButton from './components/controls/video-volume-button/video-volume-button';
import VideoProgresBar from './components/controls/video-progress-bar/video-progress-bar';

export default class Video extends Component{
    constructor() {
        this.state = {
            playing: false,
            percentPlayed: 0,
            percentBuffered: 0,
            duration: 0,
            currentTime: 0,
            muted: false,
            volumeLevel: 0.5,
            fullScreen: false
        };

        this.onVolumeChange = this.onVolumeChange.bind(this);
        this.videoEnded = this.videoEnded.bind(this);
        this.togglePlayback = this.togglePlayback.bind(this);
        this.updateDuration = this.updateDuration.toggle(this);
    }
    componentDidMount() {
        // autoplay?
    }
    videoEnded() {
        this.setState({
            percentPlayed: 100,
            playing: false
        })
    }
    togglePlayback() {
        this.setState({
            playing: !this.state.playing,
        }, function() {
            if(this.state.playing) {
                this.refs.video.getDOMNode().play();
            } else {
                this.refs.video.getDOMNode().pause();
            }
        });
    }
    toggleFullscreen() {
        this.setState({
            fullScreen: this.state.fullScreen
        }, () => {
            if(this.state.fullScreen) {
                var element = document.documentElement;
                if(element.requestFullscreen){
                    this.ReactDOM.findDOMNode().requestFullscreen();
                }
                else if(element.msRequestFullscreen){
                    this.ReactDOM.findDOMNode().msRequestFullscreen();
                }
                else if(element.mozRequestFullscreen){
                    this.ReactDOM.findDOMNode().mozRequestFullscreen();
                }
                else if(element.webkitRequestFullscreen){
                    this.ReactDOM.findDOMNode().webkitRequestFullscreen();
                }
            }else{
                if(document.exitFullscreen){
                    document.exitFullscreen();
                }
                else if(document.msExitFullscreen){
                    document.msExitFullscreen();
                }
                else if(document.mozCancelFullscreen){
                    document.mozCancelFullscreen();
                }
                else if(document.webkitCancelFullscreen){
                    document.webkitCancelFullscreen();
                }
            }
        })
    }
    updateBufferBar(buffered){
        this.setState({percentBuffered: buffered});
    }
    updateProgressBar(times){
        var percentPlayed = Math.floor((100 / times.duration) * times.currentTime);
        this.setState({
            currentTime: times.currentTime,
            percentPlayed: percentPlayed,
            duration: times.duration
        });
    }
    seekVideo(evt){
        var progress_barElm = evt.target;
        if(progress_barElm.className != 'progress_bar_ref'){
            progress_barElm = evt.target.parentElement;
        };
        var progBarDims = progress_barElm.getBoundingClientRect();
        var clickPos = evt.clientX - progBarDims.left + 5;	// 5 correction factor
        var ratio = (progBarDims.width < this.state.duration) ? (progBarDims.width / this.state.duration) : (this.state.duration / progBarDims.width);
        var seekPos = (clickPos * ratio);
        this.video.currentTime = seekPos;
    }
    render() {
        return (
            <div className="video-player">
                <Video url={}
                       poster={}
                       currentTimeChanged={this.updateProgressBar}
                       bufferChanged={this.updateBufferBar}/>
                <div class="video-controls">
                    <VideoVolumeButton onChange={this.props.onVolumeChange}
                                       muted={this.state.muted}/>
                    <VideoPlayPauseButton onTogglePlayback={this.togglePlayback}/>
                    <VideoFullscreenToggleButton onToggleFullscreen={this.toggleFullscreen}/>
                    <VideoTimeIndicator/>
                    <VideoProgresBar percentPlayed={this.state.percentPlayed}
                                     percentBuffered={this.state.percentBuffered}
                                     onProgessClick={this.seekVideo}/>
                </div>
            </div>
        )
    }
}




