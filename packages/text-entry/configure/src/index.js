import React from 'react';
import ReactDOM from 'react-dom';
import Configure from './configure';
import { ModelUpdatedEvent } from '@pie-libs/pie-configure-events';
export default class TextEntryConfigure extends HTMLElement {

  constructor() {
    super();
  }

  set model(m) {
    this._model = m;
    this._render();
  }

  onModelChanged(model) {
    this._model = model;
    this.dispatchEvent(new ModelUpdatedEvent(this._model));
  }

  _render() {
    if (this._model) {
      const el = React.createElement(Configure, {
        onModelChanged: this.onModelChanged.bind(this),
        model: this._model
      });
      ReactDOM.render(el, this);
    }
  }
}