import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Perf from 'react-addons-perf';

import Video from './components/video/video.jsx';
import VideoPlayPauseButton from './components/controls/video-play-pause-button/video-play-pause-button';
import VideoTimeIndicator from './components/controls/video-time-indicator/video-time-indicator';
import VideoFullscreenToggleButton from './components/controls/video-fullscreen-toggle-button/video-fullscreen-toggle-button';
import VideoVolumeButton from './components/controls/video-volume-button/video-volume-button';
import VideoProgressBar from './components/controls/video-progress-bar/video-progress-bar';

export default class VideoPlayer extends Component{
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            percentPlayed: 0,
            percentBuffered: 0,
            duration: 0,
            currentTime: 0,
            muted: false,
            currentVolumeLevel: 0.5,
            previousVolume: 0,
            soundLevel: 'volume-up',
            muteValue: 0,
            fullScreen: false,
            autoPlay: false
        };

        this.styles = {
            videoPlayer: {
               display: 'flex'
            },
            controls: {
                position: 'absolute',
                display: 'flex',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                flex: 1,
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'flex-end',
                pointerEvents: 'fill'
            }
        };

        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.videoEnded = this.videoEnded.bind(this);
        this.togglePlayback = this.togglePlayback.bind(this);
        this.updateProgressBar = this.updateProgressBar.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.updateDuration = this.updateDuration.bind(this);
        this.autoPlay = this.autoPlay.bind(this);
        this.seekVideo = this.seekVideo.bind(this);
        this.updateBufferBar = this.updateBufferBar.bind(this);
    }
    componentDidMount() {
        if(!this.state.autoPlay) {
            console.log('autoPlay is not enabled');
        }
        console.log(this);

    }
    autoPlay() {
        return ReactDOM.findDOMNode(this.video).autoPlay = true;
    }
    onVideoClick() {
        console.log('click');
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
            //currentTime: this.video.currentTime,
            //duration: this.video.duration
        }, () => {
            this.updateProgressBar({
                currentTime: this.video.currentTime,
                duration: this.state.duration
            });
            this.video.toggleVideo(this.state.playing);
        })
    }
    updateProgressBar(times){
        let percentPlayed = Math.floor((100 / times.duration) * times.currentTime);
        this.setState({
            currentTime: times.currentTime,
            percentPlayed: percentPlayed,
            duration: times.duration
        });
    }
    toggleFullscreen() {
        this.setState({
            fullScreen: !this.state.fullScreen
        }, () => {
            if(this.state.fullScreen) {
                var element = document.documentElement;
                if(element.requestFullscreen){
                    ReactDOM.findDOMNode(this.video).requestFullscreen();
                }
                else if(element.msRequestFullscreen){
                    ReactDOM.findDOMNode(this.video).msRequestFullscreen();
                }
                else if(element.mozRequestFullscreen){
                    ReactDOM.findDOMNode(this.video).mozRequestFullscreen();
                }
                else if(element.webkitRequestFullscreen){
                    ReactDOM.findDOMNode(this.video).webkitRequestFullscreen();
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
        if(buffered){
            console.log(`buffered: ${buffered}`);
        }
        this.setState({
            percentBuffered: buffered
        });
    }
    updateDuration(duration) {
        this.setState({ duration });
    }
    seekVideo(event){
        let progressBarElement = event.target;
        if(progressBarElement.className != 'progress-bar-ref'){
            progressBarElement = event.target.parentElement;
        }
        let progressBarDims = progressBarElement.getBoundingClientRect();
        let clickPos = event.clientX - progressBarDims.left + 5;	// 5 correction factor
        let ratio = (progressBarDims.width < this.state.duration) ? (progressBarDims.width / this.state.duration) : (this.state.duration / progressBarDims.width);
        let seekPos = (clickPos * ratio);
        this.setState({
            percentPlayed: (Math.floor(seekPos)/this.state.duration) * 100,
            currentTime: seekPos
        }, () => {
            let video = ReactDOM.findDOMNode(this.video);
            video.currentTime = seekPos;
        });
    }
    toggleMute(){
        this.setState({
            muted: !this.state.muted
        }, () => {
            console.log(this.state.muted);
            if(this.state.muted) {
                this.setState({
                    previousVolumeLevel: this.state.currentVolumeLevel,
                    currentVolumeLevel: 0
                }, () => {
                    this.handleVolumeChange(this.state.currentVolumeLevel);
                    this.updateSliderPosition(this.state.muted);
                    console.log(this.state);
                });
            } else {
                this.handleVolumeChange(this.state.currentVolumeLevel);
                this.setState({
                    currentVolumeLevel: this.state.previousVolumeLevel,
                    previousVolumeLevel: 0
                }, () => {
                    this.handleVolumeChange(this.state.currentVolumeLevel * 100);
                    this.updateSliderPosition(this.state.muted);
                    console.log(this.state);
                    })
            }
        });
    }
    updateSliderPosition(muted) {
        console.log(this.state);
        console.log(muted);
        this.muteButton.slider.value = (muted) ? 0 : this.state.currentVolumeLevel * 100;
    }
    handleVolumeChange(value){
        console.log(value);
        this.setState({currentVolumeLevel: value / 100}, () => {
            this.video.setVolume(this.state.currentVolumeLevel);
        });
    }
    render() {
        return (
            <div style={this.styles.videoPlayer}>
                <Video ref={(ref) => this.video = ref}
                       url={this.props.options.url}
                       poster={this.props.options.poster}
                       onVideoClick={this.togglePlayback}
                       currentTimeChanged={this.updateProgressBar}
                       bufferChanged={this.updateBufferBar}
                       durationChanged={this.updateDuration}
                       updatePlaybackStatus={this.videoEnded}/>
                <div ref={(ref) => { this.controls = ref }}
                     style={this.styles.controls}>
                        <VideoFullscreenToggleButton onToggleFullscreen={this.toggleFullscreen}/>
                        <VideoPlayPauseButton onTogglePlayback={this.togglePlayback}
                                              playing={this.state.playing}/>
                        <VideoVolumeButton ref={(ref) => this.muteButton = ref}
                                           muted={this.state.muted}
                                           currentVolumeLevel={this.state.currentVolumeLevel}
                                           toggleVolume={this.toggleMute}
                                           volumeChanged={this.handleVolumeChange}/>
                        <VideoTimeIndicator currentTime={this.state.currentTime}
                                            duration={this.state.duration}/>
                        <VideoProgressBar percentPlayed={this.state.percentPlayed}
                                          percentBuffered={this.state.percentBuffered}
                                          onProgressClick={this.seekVideo}/>
                </div>
            </div>
        )
    }
}



