import FeedbackConfig, { defaults } from '../src/index';

import React from 'react';
import ReactDOM from 'react-dom';

/*
    <FeedbackConfig 
      feedback={this.props.model.feedback} 
      onChange={this.onFeedbackChange.bind(this)}
      defaultCorrectFeedback="Correct"
      defaultPartialFeedback="Almost!"
      defaultIncorrectFeedback="Incorrect" />
*/

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: defaults({
        correctFeedbackType: 'custom',
        correctFeedback: 'custom message'
      })
    }
  }

  render() {
    return <div>
      {JSON.stringify(this.state.feedback, null, '  ')}
      <FeedbackConfig
        feedback={this.state.feedback}

        onChange={(feedback) => this.setState({ feedback })} />
    </div>
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const el = React.createElement(Container, {});
  ReactDOM.render(el, document.querySelector('#app'));
});