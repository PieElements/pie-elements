import React from "react";
import { ChoiceConfiguration, EditableHtml } from '@pie-libs/config-ui';
import Button from 'material-ui/Button';
import * as flattener from './flattener';
import { withStyles } from 'material-ui/styles';

const Choice = withStyles(theme => ({
  choice: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2
  }
}))(({ choice, onChange, onDelete, classes }) => (
  <ChoiceConfiguration
    className={classes.choice}
    index={undefined}
    mode={'radio'}
    data={choice}
    defaultFeedback={{
      correct: 'Correct',
      incorrect: 'Incorrect'
    }}
    onChange={onChange}
    onDelete={onDelete} />
));

export default class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeLang: props.model.defaultLang
    }
  }

  onChoiceChange = (index, choice) => {
    const update = flattener.expand(choice);
    this.props.onChoiceChange(index, update);
  }

  onPromptChange = (value) => {
    this.props.onPromptChange([{ lang: 'en-US', value }]);
  }

  render() {

    const usEnglishChoices = this.props.model.choices.map(flattener.flatten);
    const prompt = this.props.model.prompt.find(p => p.lang === 'en-US').value;
    return (
      <div>
        {this.props.model.prompt && (
          <EditableHtml
            label="Prompt"
            value={prompt}
            lang={'en-US'}
            onChange={this.onPromptChange} />
        )}
        {usEnglishChoices.map((choice, index) => (
          <Choice
            choice={choice}
            onChange={(choice) => this.onChoiceChange(index, choice)}
            onDelete={() => this.props.onRemoveChoice(index)}
            key={index} />
        ))}
        <Button
          color="primary"
          onClick={() => this.props.onAddChoice()}>Add a choice</Button>
      </div>
    );
  }
}