import React, {Component} from 'react';
import toVideoDuration from '../../../util/video-time-converter';

export default class VideoTimeIndicator extends React.Component {
    constructor(props) {
        super(props);
        console.log(toVideoDuration(this.props.currentTime));
        this.currentTime = toVideoDuration(this.props.currentTime);
        this.duration = toVideoDuration(this.props.duration);
        this.styles = {
            button: {
                //backgroundColor: 'indigo'
            }
        }
    }
    render() {
        return (
            <div className="video-time-indicator-time" style={this.styles.button}>
                <span className="video-time-indicator-current-time">{toVideoDuration(this.props.currentTime)}</span>/
                <span className="video-time-indicator-duration">{toVideoDuration(this.props.duration)}</span>
            </div>
        )
    }
}