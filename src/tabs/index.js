require('./tabs.css');
var React = require('react');
var Nav = require('./Nav');


function getDefaultActiveKey(props) {
  let activeKey;
  React.Children.forEach(props.children, (child) => {
    if (!activeKey && !child.props.disabled) {
      activeKey = child.key;
    }
  });
  return activeKey;
}

function getDefaultTabBarContent(props) {
  // let activeKey;
  let tabBarContent = [];
  React.Children.forEach(props.children, (child) => {
    // if (!activeKey && !child.props.disabled) {
    //   activeKey = child.key;
    // }
    let item  = {};
    item['tabBar'] = child.props.tab;
    item['key'] = child.key;
    tabBarContent.push(item);

  });
  return tabBarContent;
}



var TabContainer = React.createClass({

    getInitialState: function () {
        var props = this.props;
        var activeKey;

        if ('activeKey' in props) {
          activeKey = props.activeKey;
        } else if ('defaultActiveKey' in props) {
          activeKey = props.defaultActiveKey;
        } else {
          activeKey = getDefaultActiveKey(props);
        }
        return {
            activeKey: activeKey
        }
    },
    componentWillReceiveProps: function (nextProps) {
        console.log(nextProps);
    },
    getTabPanes: function () {
        const state = this.state;
        const props = this.props;
        const activeKey = state.activeKey;
        const children = props.children;
        const newChildren = [];
        // console.log('activeKey',activeKey)
        React.Children.forEach(children, (child) => {
            const key = child.key;
            const active = activeKey === key;
            if (active) {
                newChildren.push(React.cloneElement(child, {
                    active,
                    // eventKey: key,
                    rootPrefixCls: props.prefixCls,
                }));
            }

        });
        // console.log(newChildren);
    return newChildren;
    },
    render: function() {
        var props = this.props;
        var tabBarContent = getDefaultTabBarContent(props);
        var tabPanes = this.getTabPanes();
        return (
            <div>
              <Nav tabBarContent = {tabBarContent}
                onTabClick={this.onTabClick}
                activeKey={this.state.activeKey}
              ></Nav>
              <div>
                {tabPanes}
              </div>
            </div>
        );
    },
    onTabClick: function (key) {
        // console.log(key);
        this.setState({
            activeKey:key
        })
    }
});


module.exports = {
    Tab: TabContainer,
    TabPane: require('./TabPane')
}