import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';

const log = debug('pie-elements:placement-ordering');

export default class PlacementOrderingConfigReactElement extends HTMLElement {

  constructor() {
    super();
    this.onChoicesChange = this.onChoicesChange.bind(this);
    this.onCorrectResponseChange = this.onCorrectResponseChange.bind(this);
    this.onDefaultLangChange = this.onDefaultLangChange.bind(this);
    this.onPartialScoringChange = this.onPartialScoringChange.bind(this);
    this.onFeedbackChange = this.onFeedbackChange.bind(this);
    this.onPromptChange = this.onPromptChange.bind(this);
  }

  dispatchUpdate() {
    const detail = {
      update: this._model
    }

    this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }));
    this._rerender();
  }
  set model(s) {
    this._model = s;
    this._rerender();
  }

  onChoicesChange(choices) {
    this._model.model.choices = choices;
    this.dispatchUpdate();
    this._rerender();
  }

  onCorrectResponseChange(correctResponse) {
    this._model.correctResponse = correctResponse;
    this.dispatchUpdate();
    this._rerender();
  }

  onDefaultLangChange(lang) {
    this._model.defaultLang = lang;
    this.dispatchUpdate();
    this._rerender();
  }

  onPartialScoringChange(partialScoring) {
    this._model.partialScoring = partialScoring;
    this.dispatchUpdate();
    this._rerender();
  }

  onFeedbackChange(fb) {
    this._model.feedback = fb;
    this.dispatchUpdate();
    this._rerender();
  }

  onPromptChange(prompt) {
    log('onPromptChange, prompt:', prompt);
    this._model.model.prompt = prompt;
    this.dispatchUpdate();
    this._rerender();
  }

  _rerender() {
    let element = React.createElement(Main, {
      model: this._model,
      onChoicesChange: this.onChoicesChange,
      onCorrectResponseChange: this.onCorrectResponseChange,
      onDefaultLangChange: this.onDefaultLangChange,
      onPartialScoringChange: this.onPartialScoringChange,
      onFeedbackChange: this.onFeedbackChange,
      onPromptChange: this.onPromptChange
    });

    ReactDOM.render(element, this);
  }

}