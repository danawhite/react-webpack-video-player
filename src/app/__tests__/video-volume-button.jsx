// __tests/video-volume-button.jsx

jest.dontMock('../app/components/controls/video-volume-button/video-volume-button');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const VideoVolumeButton = require('../app/components/controls/video-volume-button/video-volume-button');

describe('VideoVolumeButton', () => {

    it('changes volume level when clicked', () => {
        // render a VideoVolumeButton
        var volumeButton = TestUtils.renderIntoDocument(
            <VideoVolumeButton ref={(ref) => this.muteButton = ref}
                               muted={this.state.muted}
                               volumeLevel={this.state.volumeLevel}
                               toggleVolume={this.toggleMute}
                               volumeChanged={this.handleVolumeChange}/>
        );

        var buttonNode = ReactDOM.findDOMNode(volumeButton);

        expect(buttonNode).not.toBeDefined();
    })
});