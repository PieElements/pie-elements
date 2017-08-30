import { FeedbackConfig, NumberTextField, feedbackConfigDefaults } from '../src/index';

import React from 'react';
import ReactDOM from 'react-dom';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberTextField: {
        one: 1,
        two: 2
      },
      feedback: feedbackConfigDefaults({
        correctFeedbackType: 'custom',
        correctFeedback: 'custom message'
      })
    }
    this.updateOne = this.updateOne.bind(this);
  }

  updateOne(event, number) {
    console.log('number: ', number);
    this.setState(
      {
        numberTextField: Object.assign({}, this.state.numberTextField, { one: number })
      });
  }

  render() {
    console.log('this.state: ', this.state);
    return <div>
      <em>Normal</em>
      <pre>{JSON.stringify(this.state, null, '  ')}</pre>
      <hr />
      <NumberTextField
        value={this.state.numberTextField.one}
        max={10}
        min={1}
        onChange={this.updateOne} />
      <hr />
      <h1>FeedbackConfig</h1>
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