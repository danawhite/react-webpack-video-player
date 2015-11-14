require('./app.css');

import React from 'react';
import ReactDOM from 'react-dom';

import VideoPlayer from './video-player.jsx';

main();

function main() {
    const player = document.createElement('div');

    document.body.appendChild(player);

    ReactDOM.render(<VideoPlayer/>, player);
}
