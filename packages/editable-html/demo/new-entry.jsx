// import Demo from './img-demo';
// import Demo from './plugin-demo';
// import Demo from './slate-demo';
import Demo from './rte-demo';
import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
  const el = React.createElement(Demo, {});
  ReactDOM.render(el, document.querySelector('#app'));
});