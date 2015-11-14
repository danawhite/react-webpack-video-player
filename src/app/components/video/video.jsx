import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Video extends Component{
    constructor() {
        this.updateCurrentTime = this.updateCurrentTime.bind(this);
        this.updateDuration = this.updateDuration.bind(this);
        this.updatePlaybackStatus = this.updatePlaybackStatus.bind(this);
        this.updateBuffer = this.updateBuffer.bind(this);
    }
    updateCurrentTime(){
        this.props.currentTimeChanged()
    }
    updateDuration() {
        this.props.durationChanged();
    }
    updatePlaybackStatus() {
        this.props.playbackChanged();
    }
    updateBuffer() {
        this.props.bufferChanged()
    }
    componentDidMount() {
        // TODO remove magic strings
        this.video.addEventListener('ended', (e) => {
            this.updatePlaybackStatus(e.target.ended);
        });

        this.video.addEventListener('durationChange', (e) => {
            this.updateDuration(e.target.duration);
        });

        this.video.addEventListener('timeUpdate', (e) => {
            this.updateCurrentTime({
                currentTime: e.target.currentTime,
                duration: e.target.duration
            })
        });

        let bufferCheck = setInterval(() => {
            try{
                let percent = (this.video.buffered.end(0) / this.video.duration * 100);
                this.updateBuffer(percent);
                if(percent == 100) {
                    clearInterval(bufferCheck)
                }
            }
            catch(ex){
                percent = 0;
            }
        }, 500);
    }
    render() {
        return (
            <video src={this.props.url}
                   poster={this.props.poster}>
            </video>
        )
    }
}