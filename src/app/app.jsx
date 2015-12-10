import React from 'react';
import ReactDOM from 'react-dom';

import VideoPlayer from './video-player';

main();

function main() {
    const container = document.getElementById('video-stage');

    document.body.appendChild(container);

    let videoStage = document.getElementById('video-stage');
    let videoOptions = {
        url: './src/app/assets/video/SampleVideo_1080x720_50mb.mp4',
        //poster: './src/app/assets/video/SampleVideo_1080x720_50mb.png'
    };

    // returns a reference to component's backing instance (in this case <VideoPlayer/>)
    ReactDOM.render(<VideoPlayer options={videoOptions}/>, videoStage);
}
