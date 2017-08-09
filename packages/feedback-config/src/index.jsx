import React from 'react';
import {merge} from 'lodash';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FeedbackSelector from './feedback-selector';

export default class FeedbackConfig extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      feedback: merge({
        correctFeedbackType: 'default',
        partialFeedbackType: 'default',
        incorrectFeedbackType: 'default'
      }, this.props.feedback)
    };
  }

  onChange(key, data) {
    this.state.feedback[`${key}FeedbackType`] = data.feedbackType;
    if (data.feedback !== undefined) {
      this.state.feedback[`${key}Feedback`] = data.feedback;
    }
    this.props.onChange(this.state.feedback);
  }

  render() {
    return <div className="feedback-config">
      <Card>
        <CardHeader title="Feedback" showExpandableButton={true}/>
        <CardText expandable={true}>
          <FeedbackSelector 
            label="If correct, show"
            feedbackType={this.state.feedback.correctFeedbackType}
            customFeedback={this.state.feedback.correctFeedback}
            defaultFeedback={this.props.defaultCorrectFeedback}
            onChange={this.onChange.bind(this, 'correct')} />
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
            onChange={this.onChange.bind(this, 'incorrect')} />
        </CardText>
      </Card>
    </div>;
  }

}