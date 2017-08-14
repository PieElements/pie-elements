import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

export default class PlacementOrderingConfigReactElement extends HTMLElement {

  constructor() {
    super();
    this.onChoicesChanged = this.onChoicesChanged.bind(this);
    this.onCorrectResponseChanged = this.onCorrectResponseChanged.bind(this);
    this.onDefaultLangChanged = this.onDefaultLangChanged.bind(this);
    this.onPartialScoringChange = this.onPartialScoringChange.bind(this);
    this.onFeedbackChange = this.onFeedbackChange.bind(this);
  }

  set model(s) {
    this._model = s;
    this._rerender();
  }

  onChoicesChanged(choices) {
    this._model.model.choices = choices;
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }));
    this._rerender();
  }

  onCorrectResponseChanged(correctResponse) {
    this._model.correctResponse = correctResponse;
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }));
    this._rerender();
  }

  onDefaultLangChanged(lang) {
    this._model.defaultLang = lang;
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }));
    this._rerender();
  }

  onPartialScoringChange(partialScoring) {
    this._model.partialScoring = partialScoring;
    console.log('partialScoring', partialScoring);
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }));
    this._rerender();
  }

  onFeedbackChange(fb) {
    this._model.feedback = fb;
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }));
    this._rerender();
  }

  _rerender() {
    let element = React.createElement(Main, {
      model: this._model,
      onChoicesChanged: this.onChoicesChanged,
      onCorrectResponseChanged: this.onCorrectResponseChanged,
      onDefaultLangChanged: this.onDefaultLangChanged,
      onPartialScoringChange: this.onPartialScoringChange,
      onFeedbackChange: this.onFeedbackChange
    });

    ReactDOM.render(element, this);
  }

}