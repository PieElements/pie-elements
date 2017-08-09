# feedback-config

`feedback-config` is a panel that allows for the editing of feedback properties, for use within PIE configuration panels. It is very much a work in progress.

## Usage

### Install

    npm install --save @pie-libs/feedback-config


### Import

    import FeedbackConfig from '@pie-libs/feedback-config';


### Element

    <FeedbackConfig 
      feedback={this.props.model.feedback} 
      onChange={this.onFeedbackChange.bind(this)}
      defaultCorrectFeedback="Correct"
      defaultPartialFeedback="Almost!"
      defaultIncorrectFeedback="Incorrect" />