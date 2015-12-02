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
        this.setVolume = this.setVolume.bind(this);
    }
    componentDidMount() {
        //console.log(this.props);
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
        //console.log(time);
        this.props.currentTimeChanged(time)
    }
    updateDuration(duration) {
        //console.log(`duration: ${duration}`);
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
    setVolume(volume) {
        this.video.volume = volume;
    }
    componentDidMount() {
        console.log('componentDidMount');
        // TODO remove magic strings
        this.video.addEventListener('loadedmetadata', (event) => {
            console.log(event);
        } );

        this.video.addEventListener('ended', (event) => {
            console.log('ended');
            this.updatePlaybackStatus(event.target.ended);
        });

        this.video.addEventListener('durationchange', (event) => {
            this.updateDuration(event.target.duration);
        });

        this.video.addEventListener('timeupdate', (event) => {
            console.log(event.target.currentTime);
            this.updateCurrentTime({
                currentTime: event.target.currentTime,
                duration: event.target.duration
            })
        });

        this.video.addEventListener('seeked', (event) => {
            console.log(event);
        });

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
                   poster={this.props.poster}
                   >
            </video>
        )
    }
}