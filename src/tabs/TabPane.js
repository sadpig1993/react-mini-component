var style = require('./tabs.css');
var React = require('react');


var TabPane = React.createClass({

    propTypes: {
        active: React.PropTypes.bool,
    },
    componentDidMount: function () {
        this.paneEnter();
    },
    componentDidUpdate: function () {
        this.paneEnter();
    },
    getDefaultProps: function () {
        return {
                active : false
        };
    },
    render: function () {
        return (
                <div className={style.TabPane+ ' ' +style.paneEnter} ref="pane">
                    {this.props.children}
                </div>
            )
    },
    paneEnter: function () {
        var styles = [style.TabPane, style.paneEnter, style.paneEnterActive]
        this.refs.pane.className =  styles.join(' ');
    }
});


module.exports = TabPane;