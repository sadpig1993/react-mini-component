import React from 'react';
import assign from 'object-assign';
import styles from './carousel.css'
import utils from './mixin'
import eventHandlers from './event-handlers'

var defaultProps = {
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold: 5,
    speed: 500,
    cssEase: 'ease',
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
}

export var InnerSlider = React.createClass({
    mixins: [utils, eventHandlers],
    getInitialState: function () {
        return {
            trackStyle: {},
            sliderStyle: {},
            trackWidth: 0,
            slideWidth: 0,
            listWidth: 0,
            slideCount: 0,
            currentSlide:0,
            currentLeft:null,
            swipeLeft: null,
            dragging: false,
            animating: false,
            autoPlayTimer: null,
            touchObject: {
                startX: 0,
                startY: 0,
                curX: 0,
                curY: 0
            }
        };
    },
    getDefaultProps: function () {
        return defaultProps;
    },
    componentWillMount: function () {
        this.setState({
          mounted: true
        });
    },
    componentDidMount: function () {
        this.init(this.props);
    },
    componentWillUnmount: function () {
        if (this.state.autoPlayTimer) {
            window.clearInterval(this.state.autoPlayTimer);
        }
    },
    render: function () {

        var slides = [];
        var preCloneSlides = [];
        var postCloneSlides = [];
        var count = React.Children.count(this.props.children);

        React.Children.forEach(this.props.children, (elem, index)=>{
            var child = (<div className="slider-item" style={this.state.sliderStyle}>{elem}</div>);
            slides.push(React.cloneElement(child, {
                key: index,
                'data-index': index
            }));

            if (index === 0) {
                var key = count + index;
                preCloneSlides.push(React.cloneElement(child, {
                    key: key,
                    'data-index': key
                }));
            }

            if (index === count -1 ) {
                var key = 0 - (count - index);
                postCloneSlides.push(React.cloneElement(child, {
                    key: key,
                    'data-index': key
                }));
            }

        });

        var sliders = postCloneSlides.concat(slides, preCloneSlides);
        return (
            <div className="slider-list" ref="list" onMouseEnter={this.onInnerSliderEnter} onMouseLeave={this.onInnerSliderLeave}>
                <div
                className="slider-track"
                ref="track"
                style={this.state.trackStyle}
                onMouseDown={this.swipeStart}
                onMouseMove={this.swipeMove}
                onMouseUp={this.swipeEnd}
                onMouseLeave={this.state.dragging ? this.swipeEnd: null}
                onTouchStart={this.swipeStart}
                onTouchMove={this.swipeMove}
                onTouchEnd={this.swipeEnd}
                onTouchCancel={this.state.dragging ? this.swipeEnd: null}>
                    {sliders}
                </div>
            </div>
        );
    }
});



