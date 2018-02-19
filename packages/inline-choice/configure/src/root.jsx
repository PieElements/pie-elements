import React from "react";
import Main from "./main";
import cloneDeep from 'lodash/cloneDeep';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model
    }
  }

  handleModelChange() {
    this.props.onModelChanged(this.state.model);
  }

  updateModel(model) {
    this.setState({ model }, () => {
      this.handleModelChange();
    })
  }

  onAddChoice() {
    let updateModel = cloneDeep(this.state.model);
    updateModel.choices.push({ correct: false, value: "", feedback: {}, label: [{lang: "en-US", value: ""}] });
    this.updateModel(updateModel);
  }

  onUpdateChoiceFields(index, choice, type) {
    let updateModel = cloneDeep(this.state.model);
    if (type === "label") {
      updateModel.choices[index].label = choice;
    } else if (type === "value") {
      updateModel.choices[index].value = choice;
    }
    this.updateModel(updateModel);
  }

  onChoiceChange(index, newChoice) {
    const update = cloneDeep(this.state.model);
    if (newChoice.correct) {
      update.choices.forEach(c => c.correct = false);
    }
    update.choices.splice(index, 1, newChoice);
    this.updateModel(update);
  }

  onRemoveChoice(indexToRemove) {
    let updateModel = cloneDeep(this.state.model);
    updateModel.choices.splice(indexToRemove, 1);

    this.updateModel(updateModel);
  }

  onUpdatePrompt(prompt) {
    let updateModel = cloneDeep(this.state.model);
    updateModel.prompt = prompt;
    this.updateModel(updateModel);
  }

  render() {
    const props = {
      ...this.props,
      ...this.state,
      onPromptUpdate: (prompt) => { return this.onUpdatePrompt(prompt) },
      onChoiceChange: (index, newChoice) => { return this.onChoiceChange(index, newChoice) },
      onRemoveChoice: (index) => { return this.onRemoveChoice(index) },
      onAddChoice: () => { return this.onAddChoice() },
    }

    return (
      <Main {...props} />
    );
  }
}