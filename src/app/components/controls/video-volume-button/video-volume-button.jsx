import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Icon from '@grove/react-font-awesome';

export default class VideoVolumeButton extends Component{
    constructor(props) {
        super(props);
        this.toggleVolume = this.toggleVolume.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.styles = {
            muteButton: {
                borderRadius: 7,
                cursor: 'pointer',
                outline: 'none',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: 18
            },
            slider: {
                backgroundColor: 'indigo'
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
                fontSize: 36
            }
        };
        this.soundLevels = {
            'muted': 'volume-off',
            'low': 'volume-down',
            'medium': 'volume-down',
            'high': 'volume-up'
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
        let volumeLevel = this.props.currentVolumeLevel;
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
            <div>
                <button ref={(ref) => this.button = ref}
                        onClick={this.toggleVolume}
                        style={this.styles.muteButton}>
                    <Icon ref={(ref) => this.icon = ref}
                          name={this.soundLevels[level]}></Icon>
                </button>
                <input ref={(ref) => this.slider = ref}
                       style={this.styles.slider}
                       type="range"
                       min="0" max="100"
                       onInput={this.changeVolume}
                />
            </div>
        );
    }
}