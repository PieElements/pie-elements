console.log('hi');

import PropTypes from 'proptypes';
import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';

class Holder extends React.Component {


  render() {
    const { value, onChange } = this.props;
    return <div>
      holder
      <TextField value={value} onChange={onChange} />
    </div>;
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: '...'
    }
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return <div>
      <Holder value={this.state.value} onChange={this.onChange} />
    </div>;
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const node = document.querySelector('#app');
  const el = React.createElement(App, {});
  ReactDOM.render(el, node);
});