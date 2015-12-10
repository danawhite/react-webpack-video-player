jest.dontMock('../app/components/controls/video-progress-bar/video-progress-bar');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const VideoProgressBar = require('../app/components/controls/video-progress-bar/video-progress-bar').default;

describe('VideoProgressBar', () => {
    it('should set fullscreen to true on click', () => {
        let percentPlayed = 0;
        let onProgressClick = () => {
            percentPlayed = 20
        };
        let videoProgressBar = TestUtils.renderIntoDocument(
            <VideoProgressBar percentPlayed={percentPlayed}
                              onProgressClick={onProgressClick}
            />
        );

        TestUtils.Simulate.click(
            TestUtils.findRenderedDOMComponentWithClass(videoProgressBar, 'video-progress-bar')
        );

        expect(percentPlayed).toEqual(20);
    })
});