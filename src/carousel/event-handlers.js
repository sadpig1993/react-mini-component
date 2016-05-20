'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';
import assign from 'object-assign';

var handlers = {
    swipeStart: function (e) {
        if (this.state.animating) {
            return;
        }
        if (e.touches !== undefined) {
            this.onInnerSliderEnter();
        }
        var touches, posX, posY;

        posX = (e.touches !== undefined) ? e.touches[0].pageX : e.clientX;
        posY = (e.touches !== undefined) ? e.touches[0].pageY : e.clientY;
        this.setState({
            dragging: true,
            touchObject: {
                startX: posX,
                startY: posY,
                curX: posX,
                curY: posY
            }
        });
    },
    swipeMove: function (e) {
        if (!this.state.dragging) {
            return;
        }
        if (this.state.animating) {
            return;
        }
        var swipeLeft;
        var curLeft, positionOffset;
        var touchObject = this.state.touchObject;
        touchObject.curX = (e.touches) ? e.touches[0].pageX : e.clientX;
        touchObject.curY = (e.touches) ? e.touches[0].pageY : e.clientY;
        touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)));
        positionOffset = (touchObject.curX > touchObject.startX ? 1 : -1);
        var touchSwipeLength = touchObject.swipeLength;

        curLeft = this.getTrackLeft(assign({
          slideIndex: this.state.currentSlide,
          trackRef: this.refs.track
        }, this.props, this.state));

        swipeLeft = curLeft + touchSwipeLength * positionOffset;

        this.setState({
            touchObject: touchObject,
            swipeLeft: swipeLeft,
            trackStyle: this.getTrackCss(assign({left: swipeLeft}, this.props, this.state))
        });
    },
    swipeEnd: function (e) {

        if (!this.state.dragging) {
            return;
        }
        if (e.touches !== undefined) {
            this.onInnerSliderLeave();
        }
        var touchObject = this.state.touchObject;
        var minSwipe = this.state.listWidth/this.props.touchThreshold;
        var swipeDirection = this.swipeDirection(touchObject);

        this.setState({
            dragging: false,
            // edgeDragged: false,
            // swiped: false,
            swipeLeft: null,
            touchObject: {}
        });

        if (touchObject.swipeLength > minSwipe) {
            e.preventDefault();
            if (swipeDirection === 'left') {
                this.slideHandler(this.state.currentSlide - this.props.slidesToScroll);
            } else if (swipeDirection === 'right') {
                this.slideHandler(this.state.currentSlide + this.props.slidesToScroll);
            } else {
                this.slideHandler(this.state.currentSlide);
            }
        }else{
            var currentLeft = this.getTrackLeft(assign({
                slideIndex: this.state.currentSlide,
                trackRef: this.refs.track
            }, this.props, this.state));

            this.setState({
                trackStyle: this.getTrackAnimateCSS(assign({left: currentLeft}, this.props, this.state))
            });
        }
    },
    onInnerSliderLeave: function (e) {
        if (this.props.autoplay && this.props.pauseOnHover) {
            this.autoPlay();
        }
    },
    onInnerSliderEnter: function (e) {
        if (this.props.autoplay && this.props.pauseOnHover) {
          this.pause();
        }
    }
}

export default handlers;