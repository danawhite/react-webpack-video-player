jest.dontMock('../app/components/controls/video-fullscreen-toggle-button/video-fullscreen-toggle-button');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const VideoFullscreenToggleButton = require('../app/components/controls/video-fullscreen-toggle-button/video-fullscreen-toggle-button').default;

describe('VideoFullscreenToggleButton', () => {
   it('should set fullscreen to true on click', () => {
       let isFullscreen = false;
       let toggleFullscreen = () => {
           isFullscreen = !isFullscreen
       };
       let fullscreenButton = TestUtils.renderIntoDocument(
           <VideoFullscreenToggleButton onToggleFullscreen={toggleFullscreen}/>
       );

       TestUtils.Simulate.click(
           TestUtils.findRenderedDOMComponentWithTag(fullscreenButton, 'button')
       );

       expect(isFullscreen).toEqual(true);
   })
});