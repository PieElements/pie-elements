import React from 'react';
import { ChoiceConfiguration } from '@pie-libs/config-ui';
import EditableHtml from '@pie-libs/editable-html';

import Button from 'material-ui/Button';
import * as flattener from './flattener';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

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

export class RawMain extends React.Component {

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
    const { model, classes, onRemoveChoice, onAddChoice } = this.props;
    const usEnglishChoices = model.choices.map(flattener.flatten);
    const prompt = model.prompt.find(p => p.lang === 'en-US').value;
    return (
      <div>
        {prompt && (
          <EditableHtml
            label="Prompt"
            markup={prompt}
            lang={'en-US'}
            onChange={this.onPromptChange}
            className={classes.prompt} />
        )}
        {/* <Typography variant="caption">Choices</Typography>
        <hr /> */}
        {usEnglishChoices.map((choice, index) => (
          <Choice
            choice={choice}
            onChange={(choice) => this.onChoiceChange(index, choice)}
            onDelete={() => onRemoveChoice(index)}
            key={index} />
        ))}
        <Button
          color="primary"
          onClick={onAddChoice}>Add a choice</Button>
      </div>
    );
  }
}
export default withStyles(theme => ({
  prompt: {
    paddingBottom: theme.spacing.unit * 4
  }
}))(RawMain);