import React, {Component} from 'react';

export default class VideoFullscreenToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.requestFullscreen = this.requestFullscreen.bind(this);
        this.styles = {
            toggleFullscreenButton: {
                position: 'absolute',
                //color: '#ffdd00',
                top: 20,
                right: 150,
                fontSize: 12,
                height: 30,
                cursor: 'pointer',
                outline: 'none'
            }
        }
    }
    requestFullscreen() {
        this.props.onToggleFullscreen()
    }
    render() {
        return (
            <button onClick={this.requestFullscreen} style={this.styles.toggleFullscreenButton}>
                <i className="icon-fullscreen"></i>Fullscreen
            </button>
        )
    }
}