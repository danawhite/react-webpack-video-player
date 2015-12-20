jest.dontMock('../app/components/controls/video-play-pause-button/video-play-pause-button');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const VideoPlayPauseButton = require('../app/components/controls/video-play-pause-button/video-play-pause-button').default;

describe('VideoPlayPauseButton', () => {
    it('toggles playback state to Playing on click', () => {
        let playbackState = 'Pause';
        let togglePlayback = () => { playbackState = (playbackState === 'Playing') ? 'Pause' : 'Playing' };

        let playPauseButton = TestUtils.renderIntoDocument(
            <VideoPlayPauseButton playing="Pause"
                                  onTogglePlayback={togglePlayback}
            />
        );

        TestUtils.Simulate.click(
            TestUtils.findRenderedDOMComponentWithTag(playPauseButton, 'button')
        );

        expect(TestUtils.isCompositeComponent(playPauseButton)).toBeTruthy();

        expect(playbackState).toBe('Playing');
    })
});