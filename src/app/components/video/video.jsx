import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Video extends Component{
    constructor(props) {
        super(props);
        this.updateCurrentTime = this.updateCurrentTime.bind(this);
        this.updateDuration = this.updateDuration.bind(this);
        this.updatePlaybackStatus = this.updatePlaybackStatus.bind(this);
        this.updateBuffer = this.updateBuffer.bind(this);
        this.toggleVideo = this.toggleVideo.bind(this);
        this.muteVolume = this.muteVolume.bind(this);
    }
    toggleVideo(playing){
        if(playing) {
            this.video.play();
        }
        else {
            this.video.pause();
        }
    }
    updateCurrentTime(time){
        this.props.currentTimeChanged(time)
    }
    updateDuration(duration) {
        console.log(`duration: ${duration}`);
        this.props.durationChanged();
    }
    updatePlaybackStatus(status) {
        this.props.playbackChanged();
    }
    updateBuffer(buffered) {
        this.props.bufferChanged()
    }
    muteVolume(muted) {
        this.video.muted = muted;
    }
    componentDidMount() {
        console.log('componentDidMount');
        // TODO remove magic strings
        addEventListener('ended', (e) => {
            this.updatePlaybackStatus(e.target.ended);
        }, false);

        addEventListener('durationChange', (e) => {
            this.updateDuration(e.target.duration);
        }, false);

        addEventListener('timeUpdate', (e) => {
            this.updateCurrentTime({
                currentTime: e.target.currentTime,
                duration: e.target.duration
            })
        }, false);

        let bufferCheck = setInterval(() => {
            try{
                var percent = (this.video.buffered.end(0) / this.video.duration * 100);
                this.updateBuffer(percent);
            } catch(e){
                percent = 0;
            }
            this.updateBuffer(percent);
            if(percent == 100) {
                clearInterval(bufferCheck)
            }
        }, 500);
    }
    render() {
        return (
            <video ref={(ref) => this.video = ref}
                   src={this.props.url}
                   poster={this.props.poster}>
            </video>
        )
    }
}