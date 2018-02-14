import React from "react";
import { LanguageControls, MultiLangInput } from '@pie-libs/config-ui';
import Card, { CardContent } from 'material-ui/Card';
import ChoiceConfig from "./choice-config";
import cloneDeep from 'lodash/cloneDeep';
import Button from 'material-ui/Button';

export default class Main extends React.Component {

  constructor (props){
    super (props);

    this.state = {
      activeLang: props.model.defaultLang
    }

    this.handleFeedbackMenuChange = this.handleFeedbackMenuChange.bind(this);
  }

  handleFeedbackMenuChange(type, choice, index) {

    let cloneChoice = cloneDeep(choice);
    cloneChoice["feedback"]["type"] = type;

    if(type === "default") {
      let defaultFeedbackText = (choice.correct) ? "Correct !" : "Incorrect !";
      cloneChoice["feedback"]["text"] = [{lang: "en-US", value: defaultFeedbackText}];
    }else if(type === "custom") {
      cloneChoice["feedback"]["text"] = [{lang: "en-US", value: ""}];
    }

    this.props.onUpdateFeedback(index, cloneChoice.feedback);
  }

  render (){

    let renderEditPrompt = () => {
      return (
        <MultiLangInput
          label="Prompt"
          value={this.props.model.prompt}
          lang={this.state.activeLang}
          onChange={this.props.onPromptUpdate}
        />
      );
    }

    let renderChoices = () => {
      return this.props.model.choices.map((choice, index) => {
        return <div key={index}>
          <ChoiceConfig
            {...choice}
            activeLang={this.state.activeLang}
            index={index}
            checked={choice.correct || false}
            onChoiceChange={(newChoice) => {this.props.onChoiceChange(newChoice)}}
            onChoiceLabelUpdate={(updatedLabel) => {this.props.onUpdateChoiceFields(index, updatedLabel, "label")}}
            handleFeedbackMenuChange={(type) => {this.handleFeedbackMenuChange(type, choice, index)}}
            onRemoveChoice={this.props.onRemoveChoice}
            onChoiceValueUpdate={(updatedValue) => {this.props.onUpdateChoiceFields(index, updatedValue, "value")}}/>
          {(choice.feedback) ? renderFeedback(index, choice.feedback) : null}
        </div>
      })
    }

    let renderFeedback = (index, feedback) => {
      if(feedback.type === "custom") {
        return renderCustomFeedback(index, feedback);
      }else if(feedback.type === "default") {
        return renderDefaultFeedback(index, feedback)
      }
    }

    let renderCustomFeedback = (index, feedback) => {
      return  <MultiLangInput
        label="Feedback"
        value={feedback.text}
        lang={this.state.activeLang}
        onChange={() => {this.props.onUpdateFeedback(index, feedback)}}
      />
    }

    let renderDefaultFeedback = (index, feedback) => {
      return <label style={{padding : "2px", background : "lightgray"}}>{feedback.text[0].value}</label>
    }

    return (
      <div>
        {this.props.model.prompt &&
        <div>
          {renderEditPrompt()}
          {renderChoices()}
          </div>}
        <br />
        <Button
          color="primary"
          onClick={() => this.props.onAddChoice()} >Add a choice</Button>
      </div>
    );
  }
}