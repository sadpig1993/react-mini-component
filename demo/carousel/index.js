var React = require('react');
var ReactDOM = require('react-dom');

var Carousel = require('../../src/carousel/index.js');



ReactDOM.render(
 <Carousel>
    <div><h1 className="green">1</h1></div>
    <div><h1>2</h1></div>
    <div><h1 className="orange">3</h1></div>
    <div><h1>4</h1></div>
 </Carousel>,
  document.getElementById('test')
);