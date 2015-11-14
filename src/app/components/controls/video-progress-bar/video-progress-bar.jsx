import React, {Component} from 'react';

export default class VideoProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var playedStyle = {width: `${this.props.percentPlayed}%`};
        var bufferedStyle = {width: `${this.props.percentBuffered}%`};

        return (
            <div className="progress-bar progres-bar-ref" onClick={this.props.onProgressClick}>
                <div className="playback-percent" style={playedStyle}><span></span></div>
                <div className="buffer-percent" style={bufferedStyle}><span></span></div>
            </div>
        )
    }
}