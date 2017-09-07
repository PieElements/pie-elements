import { FormControl, FormControlLabel, FormLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';

import InputContainer from './input-container';
import InputLabel from 'material-ui/Input/InputLabel';
import PropTypes from 'prop-types';
import RadioWithLabel from './radio-with-label';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

class TwoChoice extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: props.value
    }

    this.handleChange = (event) => {
      this.props.onChange(event.currentTarget.value)
    }
  }

  render() {
    const { value, header, onChange, one, two, classes, className } = this.props;

    return <InputContainer
      label={header}
      className={className}>
      <div className={classes.group}>
        <RadioWithLabel
          value={one.value}
          checked={value === one.value}
          onChange={this.handleChange}
          label={one.label} />
        <RadioWithLabel
          value={two.value}
          checked={value === two.value}
          onChange={this.handleChange}
          label={two.label} />
      </div>
    </InputContainer>
  }
}



TwoChoice.propTypes = {
  header: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  one: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }),
  two: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })
};

const styles = theme => ({
  root: {
    padding: 0,
    margin: 0
  },
  formLabel: {
    color: 'red'
  },
  group: {
    display: 'flex',
    paddingLeft: 0
  }
});

export default withStyles(styles, { name: 'TwoChoice' })(TwoChoice);