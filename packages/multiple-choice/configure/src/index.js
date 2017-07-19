import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import merge from 'lodash/merge';

class ModelUpdatedEvent extends CustomEvent {
  constructor(m) {
    super('model.updated', {
      bubbles: true,
      detail: {
        update: m
      }
    });
  }
}

export default class ChoiceConfigReactElement extends HTMLElement {

  constructor() {
    super();
    this.onRemoveChoice = this.onRemoveChoice.bind(this);
    this.onAddChoice = this.onAddChoice.bind(this);
    this.onChoiceModeChanged = this.onChoiceModeChanged.bind(this);
    this.onKeyModeChanged = this.onKeyModeChanged.bind(this);
    this.onChoiceChanged = this.onChoiceChanged.bind(this);
    this.onPromptChanged = this.onPromptChanged.bind(this);
    this.onDefaultLangChanged = this.onDefaultLangChanged.bind(this);
    this.onPartialScoringChanged = this.onPartialScoringChanged.bind(this);
  }

  set model(s) {
    this._model = s;
    this._rerender();
  }

  onChoiceModeChanged(event, value) {
    this._model.choiceMode = value;
    if (value === 'radio') {
      let correctFound = false;
      this._model.choices = this._model.choices.map(c => {

        if (correctFound) {
          c.correct = false;
          return c;
        }

        if (c.correct) {
          correctFound = true;
        }
        return c;
      });
    }
    this.dispatchModelUpdated();
    this._rerender();
  }

  onRemoveChoice(index) {
    this._model.choices.splice(index, 1);
    this.dispatchModelUpdated();
    this._rerender();
  }

  onPartialScoringChanged(partialScoring) {
    this._model.partialScoring = partialScoring;
    this.dispatchModelUpdated();
    this._rerender();
  }

  dispatchModelUpdated() {
    this.dispatchEvent(new ModelUpdatedEvent(this._model));
  }

  onAddChoice(activeLang) {
    this._model.choices.push({
      label: [{ lang: activeLang, value: '' }],
      value: '',
      feedback: {
        type: 'none'
      }
    });

    this.dispatchModelUpdated();
    this._rerender();
  }

  onKeyModeChanged(event, value) {
    this._model.keyMode = value;
    this.dispatchModelUpdated();
    this._rerender();
  }

  onChoiceChanged(index, choice) {

    if (choice.correct && this._model.choiceMode === 'radio') {
      this._model.choices = this._model.choices.map(c => {
        return merge({}, c, { correct: false });
      });
    }

    this._model.choices.splice(index, 1, choice);
    this.dispatchModelUpdated();
    this._rerender();
  }

  onDefaultLangChanged(l) {
    this._model.defaultLang = l;
    this.dispatchModelUpdated();
    this._rerender();
  }

  onPromptChanged(update, lang) {
    let t = this._model.prompt.find(t => t.lang === lang);

    if (t) {
      t.value = update;
    } else {
      this._model.prompt.push({ lang: lang, value: update });
    }

    this.dispatchModelUpdated();
    this._rerender();
  }

  _rerender() {

    let element = React.createElement(Main, {
      model: this._model,
      onChoiceModeChanged: this.onChoiceModeChanged,
      onKeyModeChanged: this.onKeyModeChanged,
      onChoiceChanged: this.onChoiceChanged,
      onRemoveChoice: this.onRemoveChoice,
      onAddChoice: this.onAddChoice,
      onPromptChanged: this.onPromptChanged,
      onDefaultLangChanged: this.onDefaultLangChanged,
      onPartialScoringChanged: this.onPartialScoringChanged
    });
    ReactDOM.render(element, this);
  }
}