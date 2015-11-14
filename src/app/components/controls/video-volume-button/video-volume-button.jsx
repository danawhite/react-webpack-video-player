import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class VideoVolumeButton extends Component{
    constructor() {
        this.toggleVolume = this.toggleVolume.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
    }
    toggleVolume() {
        this.props.toggleVolume(this.props.muted);
    }
    changeVolume() {
        this.props.changeVolume(e.target.volume)
    }
    render() {
        let volumeLevel = this.props.volumeLevel, level;

        if (volumeLevel <= 0){
            level = 'muted';
        }else if (volumeLevel > 0 && volumeLevel <= 0.33){
            level = 'low';
        }else if (volumeLevel > 0.33 && volumeLevel <= 0.66){
            level = 'medium';
        }else{
            level = 'high';
        }
        return (
            <div className="volume">
                <button onClick={this.toggleVolume}>
                    <i className={sound_levels[level]}></i>
                </button>
                <input className="volume_slider" type="range" min="0" max="100" onInput={this.changeVolume} />
            </div>
        );
    }
}