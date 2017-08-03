import Main from './Main';
import React from 'react';
import merge from 'lodash/merge';

export default class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      model: props.model
    };

    this.onRemoveChoice = this.onRemoveChoice.bind(this);
    this.onAddChoice = this.onAddChoice.bind(this);
    this.onChoiceModeChanged = this.onChoiceModeChanged.bind(this);
    this.onKeyModeChanged = this.onKeyModeChanged.bind(this);
    this.onChoiceChanged = this.onChoiceChanged.bind(this);
    this.onPromptChanged = this.onPromptChanged.bind(this);
    this.onDefaultLangChanged = this.onDefaultLangChanged.bind(this);
    this.onPartialScoringChanged = this.onPartialScoringChanged.bind(this);
  }

  onChoiceModeChanged(event, value) {
    const { model } = this.state;
    model.choiceMode = value;
    if (value === 'radio') {
      let correctFound = false;
      model.choices = model.choices.map(c => {

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

    this.updateModel(model);
  }

  onRemoveChoice(index) {
    const { model } = this.state;
    model.choices.splice(index, 1);
    this.updateModel();
  }

  onPartialScoringChanged(partialScoring) {
    const { model } = this.state;
    model.partialScoring = partialScoring;
    this.updateModel(model);
  }

  modelChanged() {
    this.props.onModelChanged(this.state.model);
  }

  updateModel(model) {
    this.setState({ model }, () => {
      this.modelChanged();
    });
  }

  onAddChoice(activeLang) {
    const { model } = this.state;
    model.choices.push({
      label: [{ lang: activeLang, value: '' }],
      value: '',
      feedback: {
        type: 'none'
      }
    });
    this.updateModel(model);
  }

  onKeyModeChanged(event, value) {
    const { model } = this.state;
    model.keyMode = value;
    this.updateModel(model);
  }

  onChoiceChanged(index, choice) {

    const { model } = this.state;
    if (choice.correct && model.choiceMode === 'radio') {
      model.choices = model.choices.map(c => {
        return merge({}, c, { correct: false });
      });
    }

    model.choices.splice(index, 1, choice);
    this.updateModel(model);
  }

  onDefaultLangChanged(l) {
    this.setState({ [model.defaultLang]: l }, () => this.modelChanged());
  }

  onPromptChanged(update, lang) {
    const { model } = this.state;
    let t = model.prompt.find(t => t.lang === lang);

    if (t) {
      t.value = update;
    } else {
      model.prompt.push({ lang: lang, value: update });
    }
    this.updateModel(model);
  }

  render() {
    const props = {
      model: this.state.model,
      onRemoveChoice: this.onRemoveChoice,
      onChoiceModeChanged: this.onChoiceModeChanged,
      onKeyModeChanged: this.onKeyModeChanged,
      onChoiceChanged: this.onChoiceChanged,
      onAddChoice: this.onAddChoice,
      onPromptChanged: this.onPromptChanged,
      onDefaultLangChanged: this.onDefaultLangChanged,
      onPartialScoringChanged: this.onPartialScoringChanged
    }

    return <Main {...props} />;
  }
}