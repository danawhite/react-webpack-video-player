// __tests__/video-volume-button.jsx

jest.dontMock('../app/components/controls/video-volume-button/video-volume-button');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const VideoVolumeButton = require('../app/components/controls/video-volume-button/video-volume-button').default;

describe('VideoVolumeButton', () => {

    it('mutes volume when clicked', () => {
        var muted = false;
        var toggle = () => { muted = true };
        var changeVolume = () => true;
        // render a VideoVolumeButton
        var volumeButton = TestUtils.renderIntoDocument(
            <VideoVolumeButton muted="false"
                               volumeLevel="7"
                               toggleVolume={toggle}
                               volumeChanged={changeVolume}
            />
        );

        // Simulate volume change.
        TestUtils.Simulate.click(
            // mute button
            TestUtils.findRenderedDOMComponentWithTag(volumeButton, 'button')
        );

        expect(muted).toEqual(true);
    })
});