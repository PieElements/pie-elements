import EditableHtml from '../src/index';
import React from 'react';
import ReactDOM from 'react-dom';
import { RichEditorExample } from './example';

const Demo = ({ us }) => (
  <div>
    Us:
  <EditableHtml model={us.model} onChange={us.onChange} />
    FB:
  <RichEditorExample />
  </div>
);

document.addEventListener('DOMContentLoaded', () => {
  const el = React.createElement(Demo, {
    us: {
      model: '<b>hi</b>',
      onChange: function () {
        console.log('onChange: ', arguments)
      }
    }
  });
  ReactDOM.render(el, document.querySelector('#app'));
});