import { FormControl, FormControlLabel, FormLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import EditableHTML from '@pie-libs/editable-html';
import React from 'react';
import Typography from 'material-ui/Typography';
import injectSheet from 'react-jss';

const style = createStyleSheet('feedback-selector', theme => ({
  group: {

  },
  label: {
    cursor: 'pointer',
    transform: 'translateX(-7px)'
  },
  choice: {
    display: 'flex',
    alignItems: 'center'
  },
  choiceHolder: {
    display: 'flex',
    alignItems: 'center'
  },
  feedbackHolder: {
    marginTop: '10px',
    background: '#e0dee0',
    padding: '20px'
  },
  defaultHolder: {
    fontFamily: theme.typography.fontFamily,
    marginTop: '10px',
    background: '#e0dee0',
    padding: '20px',
    cursor: 'default'
  },
  editor: {
    fontFamily: theme.typography.fontFamily,
  }

}));

const Group = ({ feedbackLabels, label, value, classes, handleChange, keys }) => (
  <div className={classes.choiceHolder}>
    <Typography type="body1">{label}</Typography>
    {keys.map((key) => {
      return (<div className={classes.choice} key={key}>
        <Radio
          value={key}
          checked={value === key}
          onChange={(e) => handleChange(e.currentTarget.value)}
          aria-label={feedbackLabels[key]} />
        <Typography
          className={classes.label}
          onClick={() => handleChange(key)}>{feedbackLabels[key]}</Typography>
      </div>);
    })}
  </div>
)

class FeedbackSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      feedback: this.props.customFeedback,
      feedbackType: this.props.feedbackType
    }
    this.feedbackTypeChange = this.feedbackTypeChange.bind(this);
    this.feedbackChange = this.feedbackChange.bind(this);
  }

  feedbackTypeChange(feedbackType) {
    this.setState({ feedbackType });
    this.onChange({
      feedbackType: feedbackType,
      feedback: this.state.feedback
    });
  }

  feedbackChange(feedback) {
    console.log('feedbackChange:', feedback);
    this.setState({ feedback: feedback });
    this.onChange({
      feedbackType: this.state.feedbackType,
      feedback: feedback
    });
  }

  onChange(feedback) {
    this.props.onChange(feedback);
  }

  render() {
    const feedbackLabels = {
      default: 'Simple Feedback',
      none: 'No Feedback',
      custom: 'Customized Feedback'
    };
    const { keys, classes } = this.props;

    let feedbackKeys = keys || Object.keys(feedbackLabels);

    return <div className="feedback-selector">
      <Group
        classes={classes}
        keys={feedbackKeys}
        label={this.props.label}
        value={this.state.feedbackType}
        handleChange={this.feedbackTypeChange}
        feedbackLabels={feedbackLabels} />
      {this.state.feedbackType === 'custom' && <div className={classes.feedbackHolder}>
        <EditableHTML
          className={classes.editor}
          placeholder={this.props.placeholder || "Enter feedback..."}
          onChange={this.feedbackChange}
          model={this.state.feedback} />
      </div>}
      {this.state.feedbackType === 'default' && <div className={classes.defaultHolder}> {this.props.defaultFeedback}</div>}
    </div>;
  }
}

export default withStyles(style)(FeedbackSelector);