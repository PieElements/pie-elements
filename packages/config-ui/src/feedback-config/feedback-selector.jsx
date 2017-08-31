import Radio, { RadioGroup } from 'material-ui/Radio';

import EditableHTML from '@pie-libs/editable-html';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from 'material-ui/Typography';
import debug from 'debug';
import { withStyles } from 'material-ui/styles';

const log = debug('config-ui:feedback-config:feedback-selector');

const feedbackLabels = {
  default: 'Simple Feedback',
  none: 'No Feedback',
  custom: 'Customized Feedback'
};

const style = theme => ({
  label: {
    cursor: 'pointer',
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
    padding: '13px'
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
});

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

    this.onTypeChange = (type) => {
      log('onTypeChange:', type);
      this.props.onFeedbackChange(
        Object.assign(this.props.feedback, { type })
      );
    }

    this.onCustomFeedbackChange = (customFeedback) => {
      log('onCustomFeedbackChange:', customFeedback);
      this.props.onFeedbackChange(
        Object.assign(this.props.feedback, { customFeedback })
      );
    }
  }

  render() {
    const { keys, classes, label, feedback } = this.props;

    let feedbackKeys = keys || Object.keys(feedbackLabels);

    return <div>
      <Group
        classes={classes}
        keys={feedbackKeys}
        label={label}
        value={feedback.type}
        handleChange={this.onTypeChange}
        feedbackLabels={feedbackLabels} />
      {feedback.type === 'custom' && <div className={classes.feedbackHolder}>
        <EditableHTML
          className={classes.editor}
          onChange={this.onCustomFeedbackChange}
          markup={feedback.customFeedback || ''} />
      </div>}
      {feedback.type === 'default' &&
        <div className={classes.defaultHolder}> {feedback.default}</div>}
    </div>;
  }
}

FeedbackSelector.propTypes = {
  label: PropTypes.string.isRequired,
  feedback: PropTypes.shape({
    type: PropTypes.oneOf(['default', 'none', 'custom']).isRequired,
    customFeedback: PropTypes.string,
    default: PropTypes.string.isRequired
  }),
  onFeedbackChange: PropTypes.func.isRequired
}

export default withStyles(style, { name: 'FeedbackSelector' })(FeedbackSelector);