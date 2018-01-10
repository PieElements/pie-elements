import React from 'react';
import ReactDOM from 'react-dom';
import Configure from './configure';

export default class TextEntryConfigure extends HTMLElement {

  constructor() {
    super();
  }

  set model(m) {
    this._model = m;
    this._render();
  }

  _render() {
    if (this._model) {
      const el = React.createElement(Configure, {
        onModelChanged: this.onModelChanged,
        model: this._model
      });
      ReactDOM.render(el, this);
    }
  }
}