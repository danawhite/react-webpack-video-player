jest.dontMock('../app/components/controls/video-time-indicator/video-time-indicator');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const VideoTimeIndicator = require('../app/components/controls/video-time-indicator/video-time-indicator').default;

describe('VideoTimeIndicator', () => {
    let currentTime = 60;
    let duration = 0;
    let videoTimeIndicator;

    beforeEach(() => {
        videoTimeIndicator = TestUtils.renderIntoDocument(
            <VideoTimeIndicator currentTime={currentTime} duration={duration}/>
        );
    });

    it('should increase current time upon change', () => {
        let currentTimeSpan = TestUtils.findRenderedDOMComponentWithClass(videoTimeIndicator,
            'video-time-indicator-current-time');

        TestUtils.Simulate.change(
            currentTimeSpan, { target: { value: currentTime} }
        );

        expect(currentTimeSpan.value).toBeDefined();
    });
});