import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

export default class PlacementOrderingConfigReactElement extends HTMLElement {

  constructor() {
    super();
    this.onChoicesChange = this.onChoicesChange.bind(this);
    this.onCorrectResponseChange = this.onCorrectResponseChange.bind(this);
    this.onDefaultLangChange = this.onDefaultLangChange.bind(this);
    this.onPartialScoringChange = this.onPartialScoringChange.bind(this);
    this.onFeedbackChange = this.onFeedbackChange.bind(this);
  }

  set model(s) {
    this._model = s;
    this._rerender();
  }

  onChoicesChange(choices) {
    this._model.model.choices = choices;
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }));
    this._rerender();
  }

  onCorrectResponseChange(correctResponse) {
    this._model.correctResponse = correctResponse;
    let detail = {
      update: this._model
    };
    this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }));
    this._rerender();
  }

  onDefaultLangChange(lang) {
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
      onChoicesChange: this.onChoicesChange,
      onCorrectResponseChange: this.onCorrectResponseChange,
      onDefaultLangChange: this.onDefaultLangChange,
      onPartialScoringChange: this.onPartialScoringChange,
      onFeedbackChange: this.onFeedbackChange
    });

    ReactDOM.render(element, this);
  }

}