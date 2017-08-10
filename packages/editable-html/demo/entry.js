import EditableHtml from '../src/index';
import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
  const el = React.createElement(EditableHtml, {
    model: '<b>hi</b>',
    onChange: function () {
      console.log('onChange: ', arguments)
    }
  });
  ReactDOM.render(el, document.querySelector('#app'));
});