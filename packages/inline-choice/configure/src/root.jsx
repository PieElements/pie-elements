import React from "react";
import Main from "./main";
import cloneDeep from 'lodash/cloneDeep';

export default class Root extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      model: props.model
    }
  }

  handleModelChange() {
    this.props.onModelChanged(this.state.model);
  }

  updateModel(model) {
    this.setState({model}, () => {
      this.handleModelChange();
    })
  }

  onAddChoice () {
    let updateModel = cloneDeep(this.state.model);
    updateModel.choices.push({correct: false, value: "", feedback: {},label: [{lang: "en-US", value: ""}]});
    this.updateModel(updateModel);
  }

  onUpdateChoiceFields(index, choice, type) {
    let updateModel = cloneDeep(this.state.model);
    if(type === "label") {
      updateModel.choices[index].label = choice;
    }else if(type === "value") {
      updateModel.choices[index].value = choice;
    }
    this.updateModel(updateModel);
  }

  onChoiceChange(newChoice) {
    let updateModel = cloneDeep(this.state.model);
    let updatedChoices = updateModel.choices.map((choice) => {
      if(choice.value === newChoice) {
        choice.correct = true;
      }else {
        choice.correct = false;
      }
      return choice;
    });

    updateModel.choices = updatedChoices;
    this.updateModel(updateModel);
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

  onUpdateFeedback(index, feedback) {
    let updateModel = cloneDeep(this.state.model);

    updateModel.choices[index].feedback = feedback;
    this.updateModel(updateModel);
  }


  render (){
    const props = {
      ...this.props,
      ...this.state,
      onPromptUpdate : (prompt) => {return this.onUpdatePrompt(prompt)},
      onUpdateChoiceFields : (index, choice, type) => {return this.onUpdateChoiceFields(index, choice, type)},
      onUpdateFeedback : (index, feedback) => {return this.onUpdateFeedback(index, feedback)},
      onChoiceChange : (newChoice) => {return this.onChoiceChange(newChoice)},
      onRemoveChoice : (index) => { return this.onRemoveChoice(index)},
      onAddChoice : () => {return this.onAddChoice()}
    }

    return (
      <Main {...props} />
    );
  }
}