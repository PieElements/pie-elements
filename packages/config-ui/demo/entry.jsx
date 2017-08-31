import {
  FeedbackConfig,
  FeedbackSelector,
  NumberTextField,
  feedbackConfigDefaults
} from '../src/index';

import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';
import { withStyles } from 'material-ui/styles';

const log = debug('demo:config-ui');

const Section = withStyles({
  section: {
    padding: '20px',
    position: 'relative',
    '&::after': {
      display: 'block',
      position: 'absolute',
      left: '0',
      top: '0',
      bottom: '0',
      right: '0',
      height: '2px',
      content: '""',
      backgroundColor: 'rgba(0,0,0,0.2)'
    }
  }
})(({ name, children, classes }) => <div className={classes.section}>
  <h4>{name}</h4>
  {children}
</div>);

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selector: {
        type: 'default',
        customFeedback: undefined,
        default: 'This is the default feedback'
      },
      numberTextField: {
        one: 1,
        two: 2
      },
      feedback: feedbackConfigDefaults({
        correctFeedbackType: 'custom',
        correctFeedback: 'custom message'
      })
    }
    log('state: ', this.state);
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
      <Section name="NumberTextField">
        <NumberTextField
          value={this.state.numberTextField.one}
          max={10}
          min={1}
          onChange={this.updateOne} />
      </Section>
      <h1>FeedbackSelector</h1>
      <Section name="FeedbackSelector">
        <FeedbackSelector
          label={'Some Feedback:'}
          feedback={this.state.selector}
          onFeedbackChange={(feedback) => this.setState({ selector: feedback })} />
      </Section>
      <Section name="FeedbackConfig">
        <FeedbackConfig
          feedback={this.state.feedback}
          onChange={(feedback) => this.setState({ feedback })} />
      </Section>
    </div>
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const el = React.createElement(Container, {});
  ReactDOM.render(el, document.querySelector('#app'));
});