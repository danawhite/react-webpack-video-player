import React, {Component} from 'react';
import toVideoDuration from '../../../util/video-time-converter';

export default class VideoTimeIndicator extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.styles = {
            time: {
                fontSize: 16,
                position: 'relative',
                bottom: 60,
                height: 5,
                color: 'white',
                backgroundColor: '#333'
            }
        };
    }
    render() {
        return (
            <div className="video-time-indicator-time">
                <span className="video-time-indicator-current-time"
                      style={this.styles.time}>{toVideoDuration(this.props.currentTime)}/</span>
                <span className="video-time-indicator-duration"
                      style={this.styles.time}>{toVideoDuration(this.props.duration)}</span>
            </div>
        )
    }
}