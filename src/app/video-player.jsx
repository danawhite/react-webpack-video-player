import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import Video from './components/video/video.jsx';
import VideoPlayPauseButton from './components/controls/video-play-pause-button/video-play-pause-button';
import VideoTimeIndicator from './components/controls/video-time-indicator/video-time-indicator';
import VideoFullscreenToggleButton from './components/controls/video-fullscreen-toggle-button/video-fullscreen-toggle-button';
import VideoVolumeButton from './components/controls/video-volume-button/video-volume-button';
import VideoProgressBar from './components/controls/video-progress-bar/video-progress-bar';

export default class VideoPlayer extends Component{
    // replaces componentWillMount lifecycle method
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            percentPlayed: 0,
            percentBuffered: 0,
            duration: 0,
            currentTime: 0,
            muted: false,
            volumeLevel: 0.5,
            muteValue: 0,
            fullScreen: false,
            autoPlay: false
        };

        this.styles = {
            controls: {
                position: 'absolute',
                display: 'flex',
                top: 0,
                right: 10,
                bottom: 10,
                left: 10,
                flex: 1,
                flexDirection: 'column',
                alignItems: 'stretch',
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
        if(this.autoPlay()) {

        }
        console.log(this);

    }
    autoPlay() {
        return ReactDOM.findDOMNode(this.video).autoPlay = true;
    }
    videoEnded() {
        this.setState({
            percentPlayed: 100,
            playing: false
        })
    }
    togglePlayback() {
        this.setState({
            playing: !this.state.playing
        }, function() {
            this.video.toggleVideo(this.state.playing)
            this.updateProgressBar({currentTime: this.video.currentTime, duration: this.state.duration});
        })
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
    updateProgressBar(times){
        let percentPlayed = Math.floor((100 / times.duration) * times.currentTime);
        this.setState({
            currentTime: times.currentTime,
            percentPlayed: percentPlayed,
            duration: times.duration
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
        }, function(){
            this.video.muteVolume(this.state.muted);
            this.updateSliderPosition();
        });
    }
    updateSliderPosition() {
        this.muteButton.slider.value = (this.state.muted) ? 0 : this.state.volumeLevel * 100;
    }
    handleVolumeChange(value){
        this.setState({volumeLevel: value / 100}, function(){
            this.video.setVolume(this.state.volumeLevel);
        });
    }
    render() {
        return (
            <div className="video-player">
                <Video ref={(ref) => this.video = ref}
                       url={this.props.options.url}
                       poster={this.props.options.poster}
                       currentTimeChanged={this.updateProgressBar}
                       bufferChanged={this.updateBufferBar}
                       durationChanged={this.updateDuration}
                       updatePlaybackStatus={this.videoEnded}/>
                <div className="video-controls" ref={(ref) => { this.controls = ref }} style={this.styles.controls}>
                    <VideoPlayPauseButton onTogglePlayback={this.togglePlayback}
                                          playing={this.state.playing}/>
                    <VideoVolumeButton ref={(ref) => this.muteButton = ref}
                                       muted={this.state.muted}
                                       volumeLevel={this.state.volumeLevel}
                                       toggleVolume={this.toggleMute}
                                       volumeChanged={this.handleVolumeChange}/>

                    <VideoFullscreenToggleButton onToggleFullscreen={this.toggleFullscreen}/>
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



