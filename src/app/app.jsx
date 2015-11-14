require('./app.css');

import React from 'react';
import ReactDOM from 'react-dom';

import VideoPlayer from './video-player.jsx';

main();

function main() {
    const player = document.getElementById('video-stage');

    document.body.appendChild(player);

    let videoStage = document.getElementById('video-stage');
    let videoOptions = {
        url: 'http://videos.thisisepic.com/2b9c1bf3-e19b-4be5-9d36-246c5d3607d8/high.mp4',
        poster: 'http://thumbnails.thisisepic.com/b1ce00de-e687-4c1b-97ac-afa05a287327/large/frame_0005.png'
    };
    ReactDOM.render(<VideoPlayer options={videoOptions}/>, videoStage);

}
