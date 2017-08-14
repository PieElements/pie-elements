import PropTypes from 'prop-types';
import React from 'react';
import TextField from 'material-ui/TextField';

export default class NumberTextField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(props) {
    const v = parseInt(props.value, 10);
    const value = isNaN(v) ? '' : props.value;
    this.setState({ value });
  }

  clamp(value) {
    const { min, max } = this.props
    if (max) {
      value = Math.min(value, max);
    }
    if (min) {
      value = Math.max(value, min);
    }
    return value;
  }

  onChange(event) {
    const value = event.target.value;
    this.setState({ value });

    if (isNaN(value) || value === '') {
      this.props.onChange(event, undefined);
    } else {
      let number = this.clamp(parseInt(value, 10));
      this.props.onChange(event, number);
    }
  }

  render() {
    const { value, className } = this.props;
    return <TextField
      className={className}
      value={this.state.value}
      onChange={this.onChange} />;
  }
}

NumberTextField.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number
}