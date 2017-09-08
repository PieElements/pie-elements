import Main from './main';
import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';

const log = debug('pie-elements:placement-ordering');

export default class PlacementOrdering extends HTMLElement {

  constructor() {
    super();
    this.onModelChange = (model, resetSession) => {
      this._model = model;
      this.dispatchUpdate(resetSession);
    }
  }

  dispatchUpdate(reset) {
    const detail = { update: this._model, reset }
    this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }));
  }

  set model(s) {
    this._model = s;
    this._rerender();
  }

  _rerender() {
    let element = React.createElement(Main, {
      initialModel: this._model,
      onModelChange: this.onModelChange
    });
    ReactDOM.render(element, this);
  }
}