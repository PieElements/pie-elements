import { FormControl, FormControlLabel, FormLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';

import EditableHTML from '@pie-libs/editable-html';
import React from 'react';
import Typography from 'material-ui/Typography';
import injectSheet from 'react-jss';

//require('./feedback-selector.less');
const style = {
  group: {

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
  }
}

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
        <Typography>{feedbackLabels[key]}</Typography>
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
      {/* <p className="feedback-prompt">{this.props.label}</p> */}
      <Group
        classes={classes}
        keys={feedbackKeys}
        label={this.props.label}
        value={this.state.feedbackType}
        handleChange={this.feedbackTypeChange}
        feedbackLabels={feedbackLabels} />
      {this.state.feedbackType === 'custom' && <div className={classes.feedbackHolder}>
        <EditableHTML
          placeholder={this.props.placeholder || "Enter feedback..."}
          onChange={this.feedbackChange}
          model={this.state.feedback} />
      </div>}
    </div>;
  }
}
/*

      <RadioButtonGroup
        style={{ display: 'inline-block' }} name="feedback" defaultSelected="default"
        valueSelected={this.state.feedbackType}
        onChange={this.feedbackTypeChange.bind(this)}>
        {
          feedbackKeys.map((key) => {
            return <RadioButton key={key} style={{ display: 'inline-block', width: 'auto' }} value={key} label={feedbackLabels[key]} />
          })
        }
      </RadioButtonGroup>
      {
        (this.state.feedbackType === 'custom') ? (
          <div className="feedback-holder">
            <EditableHTML
              placeholder={this.props.placeholder || "Enter feedback..."}
              onChange={this.feedbackChange.bind(this)}
              model={this.state.feedback} />
          </div>
        ) : (
            (this.state.feedbackType === 'default') ? (
              <div className="feedback-holder default">{this.props.defaultFeedback}</div>
            ) : (
                <div></div>
              )
          )
      }
*/
export default injectSheet(style)(FeedbackSelector);