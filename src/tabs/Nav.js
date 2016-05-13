var React = require('react');
var style = require('./tabs.css');

var Nav = React.createClass({
    propTypes: {
        tabBarContent: React.PropTypes.array,
        onTabClick: React.PropTypes.func
    },
    getDefaultProps: function () {
        return {
                tabBarContent: []
        };
    },
    getInitialState: function() {
        return {
            tabBarContent: this.props.tabBarContent,
            inkBarLeft: 0,
            inkBarDirection: ''
        }
    },
    componentDidMount: function () {
        var activeTab = this.refs.activeTab;
        var tabBar = this.refs.tabBar;
        var left = this.offset(activeTab).left - this.offset(tabBar).left;
        var inBarNode = this.refs.inkBar;
        var right = tabBar.offsetWidth - activeTab.offsetWidth - left;


        inBarNode.style.left = left + 'px';
        inBarNode.style.right = right + 'px';

    },
    componentDidUpdate: function (component) {
        var activeTab = this.refs.activeTab;
        var tabBar = this.refs.tabBar;
        var left = this.offset(activeTab).left - this.offset(tabBar).left;
        var inBarNode = this.refs.inkBar;
        var right = tabBar.offsetWidth - activeTab.offsetWidth - left;

        // console.log();
        // inBarNode.className = inBarNode.className.replace('inkbar-forward','');
        // inBarNode.className = inBarNode.className.replace('inkbar-backward','');


        if (parseInt(inBarNode.style.left) > left) {
            inBarNode.className = style.tabinkBar + ' ' + style['inkbar-backward'];
        }else{
             inBarNode.className = style.tabinkBar + ' ' + style['inkbar-forward'];
        }

        inBarNode.style.left = left + 'px';
        inBarNode.style.right = right + 'px';
    },
    render: function () {
        var _this = this;

        var tabs = this.state.tabBarContent.map(function(str) {
            var ref = {};

            if( str.key == _this.props.activeKey ) {
                ref.ref = 'activeTab';
            }
            return (<li className={str.key == _this.props.activeKey ? style.activeBar : style.tabBarItem}
                            key={str.key}
                            onClick={_this.onTabClick.bind(_this,str.key)}
                            {...ref}
                            >{str.tabBar}</li>)
        })



        return(
            <div className={style.tabBar} ref="tabBar">
            <div className={style.tabinkBar} ref="inkBar"></div>
            <ul className={style.tabNav}>
            {tabs}
            </ul>
            </div>
            )
    },
    onTabClick: function (key) {
        this.props.onTabClick(key);
    },
    getInkBarOffset: function () {
        var activeTab = this.refs.activeTab;
        var tabBar = this.refs.tabBar;
        var left = this.offset(activeTab).left - this.offset(tabBar).left;
        var inBarNode = this.refs.inkBar;
        var right = tabBar.offsetWidth - activeTab.offsetWidth - left;

        return {
            left: left,
            right: right
        }
    },
    offset: function (elem) {
      let box;
      let x;
      let y;
      const doc = elem.ownerDocument;
      const body = doc.body;
      const docElem = doc && doc.documentElement;
      box = elem.getBoundingClientRect();
      x = box.left;
      y = box.top;
      x -= docElem.clientLeft || body.clientLeft || 0;
      y -= docElem.clientTop || body.clientTop || 0;
      const w = doc.defaultView || doc.parentWindow;
      // x += getScroll(w);
      // y += getScroll(w, true);
      return {
        left: x, top: y,
      };
    }

});


module.exports = Nav;