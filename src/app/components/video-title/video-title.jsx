import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class VideoTitle extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <p>{this.props.title}</p>
    }
}

VideoTitle.propTypes = { title: React.PropTypes.string };