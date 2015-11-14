import React, {Component} from 'react';

export default class VideoTimeIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.currentTime = this.props.currentTime;
        this.duration = this.props.duration;
    }
    render() {
        return (
            <div className="video-time-indicator-time">
                <span className="video-time-indicator-current-time">{this.currentTime}</span>/
                <span className="video-time-indicator-duration">{this.duration}</span>
            </div>
        )
    }
}