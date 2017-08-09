import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import EditableHTML from 'corespring-editable-html';

require('./feedback-selector.less');

class FeedbackSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      feedback: this.props.feedback,
      feedbackType: this.props.feedbackType
    }
  }
  
  feedbackTypeChange(event, feedbackType) {
    this.setState({feedbackType: feedbackType});
    this.onChange({
      feedbackType: feedbackType,
      feedback: this.state.feedback
    });
  }

  feedbackChange(feedback) {
    this.setState({feedback: feedback});
    this.onChange({
      feedbackType: this.state.feedbackType,
      feedback: feedback
    });
  }

  onChange(feedback){
    this.props.onChange(feedback);
  }

  render() {
    const feedbackLabels = {
      default: 'Simple Feedback',
      none: 'No Feedback',
      custom: 'Customized Feedback'
    };

    let feedbackKeys = this.props.keys === undefined ? Object.keys(feedbackLabels) : this.props.keys;

    return <div className="feedback-selector">
      <p className="feedback-prompt">{this.props.label}</p>
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
              model={this.state.feedback}/>
          </div>
        ) : (
          (this.state.feedbackType === 'default') ? (
            <div className="feedback-holder default">{this.props.defaultFeedback}</div>
          ) : (
            <div></div>
          )
        )
      }
    </div>;
  }

}

export default FeedbackSelector;