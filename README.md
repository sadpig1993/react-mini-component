# react-mini-component


### carousel 跑马灯

```javascript
ReactDOM.render(
 <Carousel>
    <div><h1 className="green">1</h1></div>
    <div><h1>2</h1></div>
    <div><h1 className="orange">3</h1></div>
    <div><h1>4</h1></div>
 </Carousel>,
  document.getElementById('test')
);
```

### tab标签

```javascript
ReactDOM.render(
  <Tab activeKey="2">
    <TabPane tab="tab 1" key="1"><span>hello</span></TabPane>
    <TabPane tab="tab 3" key="5"><span>hello</span></TabPane>
    <TabPane tab="tab 4" key="4"><span>hello</span></TabPane>
    <TabPane tab="tab 5" key="3"><span>hello</span></TabPane>
    <TabPane tab="tab 2" key="2"><img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1142132471,1812621697&fm=80" /></TabPane>
  </Tab>,
  document.getElementById('test')
);
```
