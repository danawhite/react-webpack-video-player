import React, {Component} from 'react';

export default class VideoProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.styles = {
            progress: {
                position: 'relative',
                bottom: 50,
                backgroundColor: 'gray',
                height: 5,
            }
        };

        this.handleProgressClick = this.handleProgressClick.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState){
        return this.props.percentPlayed !== nextProps.percentPlayed;
    }
    handleProgressClick(event) {
        this.props.onProgressClick(event);
    }
    render() {
        this.styles.played = {
            width: this.props.percentPlayed + '%',
            backgroundColor: '#ff0000',
            position: 'relative',
            height: 5,
            top: 0,
            bottom: 0
        };
        this.styles.buffered = {
            width: this.props.percentBuffered + '%',
            backgroundColor: 'green',
            position: 'relative',
            height: 5,
            top: 0,
            bottom: 0
        };
        return (
            <div className="video-progress-bar"
                 onClick ={this.handleProgressClick}
                 style={this.styles.progress}>
                <div className="playback-percent" style={this.styles.played}><span></span></div>
                <div className="buffer-percent" style={this.styles.buffered}><span></span></div>
            </div>
        )
    }
}