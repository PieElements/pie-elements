import { createStyleSheet, withStyles } from 'material-ui/styles';

import React from 'react';
import TextField from 'material-ui/TextField';

export class NumberTextField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value
    });
  }

  _clamp(value) {
    if (this.props.max !== undefined) {
      value = Math.min(value, this.props.max);
    }
    if (this.props.min !== undefined) {
      value = Math.max(value, this.props.min);
    }
    return value;
  }

  onChange(event) {
    const value = event.target.value;
    const n = parseInt(value, 10);
    if (isNaN(n)) {
      return;
    } else {
      let number = this._clamp(n);
      this.setState({ value }, () => {
        this.props.onChange(event, number);
      });
    }
  }

  render() {
    let { value, name, classes } = this.props;
    return <TextField
      className={classes.root}
      name={name}
      value={this.state.value}
      onChange={this.onChange} />;
  }

}

const styles = createStyleSheet('NumberTextField', theme => {
  return {
    root: { display: 'inline-block', width: '35px', margin: '10px' }
  }
});

export default withStyles(styles)(NumberTextField);

