import { NumberTextField } from '../src/index';
import React from 'react';
import ReactDOM from 'react-dom';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberTextField: {
        one: 1,
        two: 2
      }
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
      <NumberTextField
        value={this.state.numberTextField.one}
        max={10}
        min={1}
        onChange={this.updateOne} />
    </div>
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const el = React.createElement(Container, {});
  ReactDOM.render(el, document.querySelector('#app'));
});