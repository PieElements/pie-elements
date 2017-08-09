import Card, { CardContent } from 'material-ui/Card';

import FeedbackSelector from './feedback-selector';
import React from 'react';
import Typography from 'material-ui/Typography';
import cloneDeep from 'lodash/cloneDeep';
import injectSheet from 'react-jss';

const style = {

}

export class FeedbackConfig extends React.Component {

  constructor(props) {
    super(props);
    this.onCorrectChange = this.onChange.bind(this, 'correct');
  }

  onChange(key, data) {
    const { onChange, feedback } = this.props;
    const out = cloneDeep(feedback);
    out[`${key}FeedbackType`] = data.feedbackType;
    out[`${key}Feedback`] = data.feedbackType === 'custom' ? out[`${key}Feedback`] || data.feedback : '';
    onChange(out);
  }

  render() {
    const { defaultCorrectFeedback, feedback } = this.props;
    return <Card>
      <CardContent>
        <Typography type="headline">Feedback</Typography>
        <FeedbackSelector
          label="If correct, show"
          feedbackType={feedback.correctFeedbackType}
          customFeedback={feedback.correctFeedback}
          defaultFeedback={defaultCorrectFeedback}
          onChange={this.onCorrectChange} />
        {/* 
          <FeedbackSelector 
            label="If partially correct, show"
            feedbackType={this.state.feedback.partialFeedbackType}
            customFeedback={this.state.feedback.partialFeedback}
            defaultFeedback={this.props.defaultPartialFeedback}
            onChange={this.onChange.bind(this, 'partial')} />
          <FeedbackSelector 
            label="If incorrect, show"
            feedbackType={this.state.feedback.incorrectFeedbackType}
            customFeedback={this.state.feedback.incorrectFeedback}
            defaultFeedback={this.props.defaultIncorrectFeedback}
            onChange={this.onChange.bind(this, 'incorrect')} /> */}
      </CardContent>
    </Card>;
  }

}

export default injectSheet(style)(FeedbackConfig);