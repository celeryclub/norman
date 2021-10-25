import React from 'react';
import ReactDOM from 'react-dom';

const element = <h1>Hello, world</h1>;
const rootNode = document.createElement('div');
document.body.appendChild(rootNode);
ReactDOM.render(element, rootNode);
