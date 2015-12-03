import React, {Component} from 'react';

Number.prototype.toVideoDuration = () => {
    var hours, minutes, seconds, group;
    group = []

    hours = Math.floor(this /  3600);
    minutes = Math.floor(this % 3600 / 60);
    seconds = Math.floor(this % 3600 % 60);

    if (hours > 0) { group.push((hours > 9) ? hours : "0" + hours); }
    group.push((minutes > 9) ? minutes : "0" + minutes);
    group.push((seconds > 9) ? seconds : "0" + seconds);

    return group.join(":");
};

export default class VideoTimeIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.currentTime = (this.props.currentTime).toVideoDuration();
        this.duration = this.props.duration.toVideoDuration();
        this.styles = {
            button: {
                //backgroundColor: 'indigo'
            }
        }
    }
    render() {
        return (
            <div className="video-time-indicator-time" style={this.styles.button}>
                <span className="video-time-indicator-current-time">{this.props.currentTime}</span>/
                <span className="video-time-indicator-duration">{this.props.duration}</span>
            </div>
        )
    }
}