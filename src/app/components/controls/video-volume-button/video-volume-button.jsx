import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class VideoVolumeButton extends Component{
    constructor(props) {
        super(props);
        this.toggleVolume = this.toggleVolume.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.styles = {
            muteButton: {
                borderRadius: 7,
                cursor: 'pointer',
                outline: 'none'
            },
            iconVolumeOff: {
                backgroundColor: 'red'
            },
            iconVolumeDown: {
                backgroundColor: 'indigo'
            },
            iconVolumeDefault: {
                backgroundColor: 'indianred'
            },
            iconVolumeUp: {
                backgroundColor: 'cornsilk'
            }
        };
        this.sound_levels = {
            'muted': this.styles.iconVolumeOff,
            'low': this.styles.iconVolumeDown,
            'medium': this.styles.iconVolumeDefault,
            'high': this.styles.iconVolumeUp
        };
    }
    toggleVolume() {
        this.props.toggleVolume(this.props.muted);
    }
    changeVolume(event) {
        if(this.props.muted) {
            this.props.toggleVolume(this.props.muted);
        }
        this.props.volumeChanged(event.target.value)
    }

    render() {
        let volumeLevel = this.props.volumeLevel;
        let level;

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
            <div className="video-volume-button">
                <button onClick={this.toggleVolume} style={this.styles.muteButton}>
                    <i className={this.sound_levels[level]}></i>
                    Mute/Unmute
                </button>
                <input ref={(ref) => this.slider = ref}
                       className="volume_slider"
                       type="range"
                       min="0" max="100"
                       onInput={this.changeVolume}
                />
            </div>
        );
    }
}