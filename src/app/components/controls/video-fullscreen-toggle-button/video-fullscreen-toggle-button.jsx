export default class VideoFullscreenToggleButton extends React.Component {
    constructor() {
        this.requestFullscreen = this.requestFullscreen.bind(this);
    }
    requestFullscreen() {
        this.props.onToggleFullscreen()
    }
    render() {
        return (
            <button className="video-fullscreen-toggle-button" onClick={this.requestFullscreen}>
                <i className="icon-fullscreen"></i>
            </button>
        )
    }
}