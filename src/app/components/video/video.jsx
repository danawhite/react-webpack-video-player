import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// input::-webkit-media-controls-play-button {
//display: none;
//}
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

        this.styles = {
            video: {
                objectFit: 'cover',
                flex: 1
            }
        }
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
        console.log(volume);
        this.video.volume = volume;
    }
    componentDidMount() {
        // TODO remove magic strings
        this.video.addEventListener('ended', (event) => {
            console.log('ended');
            this.updatePlaybackStatus(event.target.ended);
        });

        this.video.addEventListener('durationchange', (event) => {
            this.updateDuration(event.target.duration);
        });

        this.video.addEventListener('timeupdate', (event) => {
            this.updateCurrentTime({
                currentTime: event.target.currentTime,
                duration: event.target.duration
            })
        });

        this.video.addEventListener('seeking', () => {
            console.log('seeking');
        });

        this.video.addEventListener('pause', () => {
            console.log('paused');
        });

        this.video.addEventListener('play', () => {
            console.log('playing');
        });

        this.video.addEventListener('seeked', (event) => {
            console.log('seeked');
            this.updateCurrentTime({
                currentTime: event.target.currentTime,
                duration: event.target.duration
            })
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
                       onClick={this.toggleVideo}
                       src={this.props.url}
                       poster={this.props.poster}
                       style={this.styles.video}
                >
                </video>
        )
    }
}

Video.propTypes = {poster: React.PropTypes.string};
// add default image here
Video.defaultProps = {poster: './src/app/assets/video/SampleVideo_1080x720_50mb.png'};