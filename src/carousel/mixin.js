'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';
import assign from 'object-assign';

var helpers = {
    init: function (props) {
        var slideCount = React.Children.count(props.children);
        var listWidth = this.getWidth(ReactDOM.findDOMNode(this.refs.list));
        var trackWidth = this.getWidth(ReactDOM.findDOMNode(this.refs.track));
        var slideWidth = this.getWidth(ReactDOM.findDOMNode(this)) / props.slidesToShow;

        var spec = assign({
            trackWidth: listWidth * (slideCount + 2) + 'px',
            left: 0 - (this.state.currentSlide + 1) * listWidth
        }, this.props)

        this.setState({
            sliderStyle: {
                width: listWidth + 'px'
            },
            trackStyle: this.getTrackCss(spec),
            slideCount: slideCount,
            currentLeft: spec.left,
            listWidth: listWidth,
            trackWidth: spec.trackWidth,
            slideWidth: slideWidth
        });
    },
    update: function (props) {
        var slideCount = React.Children.count(props.children);
        var listWidth = this.getWidth(ReactDOM.findDOMNode(this.refs.list));
        var trackWidth = this.getWidth(ReactDOM.findDOMNode(this.refs.track));
        var slideWidth = this.getWidth(ReactDOM.findDOMNode(this)) / props.slidesToShow;

        var spec = {
            trackWidth: listWidth * (slideCount + 2) + 'px',
            left: 0 - (this.state.currentSlide + 1) * listWidth
        }
        this.setState({
            sliderStyle: {
                width: listWidth + 'px'
            },
            trackStyle: this.getTrackCss(spec),
            slideCount: slideCount,
            listWidth: listWidth,
            trackWidth: spec.trackWidth,
            slideWidth: slideWidth
        });
    },
    getWidth: function getWidth(elem) {
        return elem.getBoundingClientRect().width || elem.offsetWidth;
    },
    getTrackLeft: function (spec) {
        var slideOffset = 0;
        var targetLeft;
        // var targetSlide;
        // return this.state.currentLeft;
        var targetLeft = 0 - ((spec.slideIndex + 1) * spec.slideWidth) + slideOffset;
        return targetLeft;
    },
    getTrackCss: function (spec) {

        var trackWidth = spec.trackWidth || (spec.slideCount + 2*spec.slidesToShow) * spec.slideWidth;

        var style = {
            opacity: 1,
            width: trackWidth,
            WebkitTransform: 'translate3d(' + spec.left + 'px, 0px, 0px)',
            transform: 'translate3d(' + spec.left + 'px, 0px, 0px)',
            transition: '',
            WebkitTransition: '',
            msTransform: 'translateX(' + spec.left + 'px)'
        }
        return style;
    },
    swipeDirection: function (touchObject) {
        var xDist, yDist, r, swipeAngle;

        xDist = touchObject.startX - touchObject.curX;
        yDist = touchObject.startY - touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }
        if ((swipeAngle <= 45) && (swipeAngle >= 0) || (swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (this.props.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (this.props.rtl === false ? 'right' : 'left');
        }

        return 'vertical';
  },
  slideHandler: function (index) {
        var targetSlide, currentSlide;
        var targetLeft, currentLeft;
        var callback;

        targetSlide = index;
        currentSlide = this.state.currentSlide;

        targetLeft = this.getTrackLeft(assign({
            slideIndex: targetSlide,
            trackRef: this.refs.track
        }, this.props, this.state));

        if (targetSlide < 0) {
            currentSlide = this.state.slideCount + targetSlide;
        } else if (targetSlide >= this.state.slideCount) {
            currentSlide = targetSlide - this.state.slideCount;
        } else {
            currentSlide = targetSlide;
        }

        currentLeft = this.getTrackLeft(assign({
            slideIndex: currentSlide,
            trackRef: this.refs.track
        }, this.props, this.state));

        var nextStateChanges = {
                animating: false,
                currentSlide: currentSlide,
                trackStyle: this.getTrackCss(assign({left: currentLeft}, this.props, this.state)),
                swipeLeft: null
        };

        callback = ()=>{
            this.setState(nextStateChanges);
            // 回调函数
            // if (this.props.afterChange) {
            //   this.props.afterChange(currentSlide);
            // }
            ReactTransitionEvents.removeEndEventListener(ReactDOM.findDOMNode(this.refs.track), callback);
        }

        this.setState({
            animating: true,
            currentSlide: currentSlide,
            trackStyle: this.getTrackAnimateCSS(assign({left: targetLeft}, this.props, this.state))
        }, function () {
            ReactTransitionEvents.addEndEventListener(ReactDOM.findDOMNode(this.refs.track), callback);
        });


    },
    getTrackAnimateCSS: function (spec) {
        var style = this.getTrackCss(spec);
        // useCSS is true by default so it can be undefined
        style.WebkitTransition = '-webkit-transform ' + spec.speed + 'ms ' + spec.cssEase;
        style.transition = 'transform ' + spec.speed + 'ms ' + spec.cssEase;
        return style;
    },
    autoPlay: function () {

    },
    pause: function () {

    }
};


export default helpers;