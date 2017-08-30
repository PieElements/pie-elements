import Card, { CardContent } from 'material-ui/Card';

import FeedbackSelector from './feedback-selector';
import React from 'react';
import Typography from 'material-ui/Typography';
import cloneDeep from 'lodash/cloneDeep';
import { withStyles } from 'material-ui/styles';

const style = {}

export const defaults = (input) => {
  Object.assign({}, {
    correctFeedbackType: 'default',
    incorrectFeedbackType: 'default',
    partialFeedbackType: 'default'
  }, input)
}

export class FeedbackConfig extends React.Component {

  constructor(props) {
    super(props);
    this.onCorrectChange = this.onChange.bind(this, 'correct');
    this.onIncorrectChange = this.onChange.bind(this, 'incorrect');
    this.onPartialChange = this.onChange.bind(this, 'partial');
  }

  onChange(key, data) {
    const { defaults, onChange, feedback } = this.props;
    const { feedbackType } = data;
    const out = cloneDeep(feedback);
    out[`${key}FeedbackType`] = feedbackType;
    out[`${key}Feedback`] = feedbackType === 'custom' ? data.feedback : (feedbackType === 'default' ? defaults[key] : '');
    onChange(out);
  }


  render() {
    const { defaults, feedback } = this.props;
    return <Card>
      <CardContent>
        <Typography type="headline">Feedback</Typography>
        <FeedbackSelector
          label="If correct, show"
          feedbackType={feedback.correctFeedbackType}
          customFeedback={feedback.correctFeedback}
          defaultFeedback={defaults.correct}
          onChange={this.onCorrectChange} />
        <FeedbackSelector
          label="If partially correct, show"
          feedbackType={feedback.partialFeedbackType}
          customFeedback={feedback.partialFeedback}
          defaultFeedback={defaults.partial}
          onChange={this.onPartialChange} />
        <FeedbackSelector
          label="If incorrect, show"
          feedbackType={feedback.incorrectFeedbackType}
          customFeedback={feedback.incorrectFeedback}
          defaultFeedback={defaults.incorrect}
          onChange={this.onIncorrectChange} />
      </CardContent>
    </Card>;
  }
}

FeedbackConfig.defaultProps = {
  defaults: {
    correct: 'Correct',
    incorrect: 'Incorrect',
    partial: 'Nearly'
  },
  feedback: {
    correctFeedback: '',
    correctFeedbackType: 'default',
    incorrectFeedback: '',
    incorrectFeedbackType: 'default',
    partialFeedback: '',
    partialFeedbackType: 'default',
  }
}

export default withStyles(style, { name: 'FeedbackConfig' })(FeedbackConfig);