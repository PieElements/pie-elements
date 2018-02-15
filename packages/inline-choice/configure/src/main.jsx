import React from "react";
import { ChoiceConfiguration, MultiLangInput } from '@pie-libs/config-ui';
import Button from 'material-ui/Button';

export default class Main extends React.Component {

  constructor (props){
    super (props);

    this.state = {
      activeLang: props.model.defaultLang
    }
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
          <ChoiceConfiguration
            mode={'radio'}
            data={choice}
            defaultFeedback={{
              correct: 'Correct',
              incorrect: 'Incorrect'
            }}
            onChange={(changeObj) => {this.props.onChoiceChange(index, changeObj)}}
            onDelete={() => {this.props.onRemoveChoice(index)}}
        /></div>
      })
    }


    return (
      <div>
        {this.props.model.prompt &&
        <div>
          {renderEditPrompt()}
          <br />
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