/**
 * @file Carousl 跑马灯
 * @author xijiawei@baidu.com
 * @description
 *     react写的跑马灯组件
 */

import React from 'react';
import {InnerSlider} from './inner-slider';
import assign from 'object-assign';
import styles from './carousel.css'

var defaultProps = {
    slidesToShow: 1,
    isAutoPlay: false
}

var Slider = React.createClass({
    getDefaultProps: function () {
        return defaultProps;
    },
    render: function () {
        return (
            <div className="slider-wrap">
                <InnerSlider {...this.props}>
                {this.props.children}
                </InnerSlider>
            </div>
        );
    }
});


module.exports = Slider;
