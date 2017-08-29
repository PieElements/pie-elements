import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root.jsx';
import debug from 'debug';
import merge from 'lodash/merge';

const log = debug('multiple-choice:configure');

export class ModelUpdatedEvent extends CustomEvent {
  constructor(update) {
    super('model.updated', { bubbles: true, detail: { update } });
  }
}

export class DeleteImageEvent extends CustomEvent {
  constructor(detail) {
    super('delete.image', { bubbles: true, detail });
  }
}

export class InsertImageEvent extends CustomEvent {
  constructor(detail) {
    super('insert.image', { bubbles: true, detail });
  }
}

export default class extends HTMLElement {

  constructor() {
    super();
    this.onModelChanged = this.onModelChanged.bind(this);
  }

  set model(s) {
    this._model = s;
    this._render();
  }

  dispatchModelUpdated() {
    this.dispatchEvent(new ModelUpdatedEvent(this._model));
  }

  onModelChanged(m) {
    this._model = m;
    this.dispatchModelUpdated();
  }

  /**
   * 
   * @param {done, progress, file} handler 
   */
  insertImage(handler) {
    this.dispatchEvent(new InsertImageEvent(handler));
  }

  onDeleteImage(src, done) {
    this.dispatchEvent(new DeleteImageEvent({ src, done }));
  }

  _render() {
    log('_render');
    let element = React.createElement(Root, {
      model: this._model,
      onModelChanged: this.onModelChanged,
      onInsertImage: this.insertImage.bind(this),
      onDeleteImage: this.onDeleteImage.bind(this)
    });
    ReactDOM.render(element, this);
  }
}