import { FormControl, FormControlLabel, FormLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';

import InputLabel from 'material-ui/Input/InputLabel';
import PropTypes from 'prop-types';
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

    return <FormControl className={classNames(classes.root, className)}>
      <InputLabel shrink={true}>{header}</InputLabel>
      <div className={classes.group}>
        <FormControlLabel
          value={one.value}
          control={<Radio
            checked={value === one.value}
            onChange={this.handleChange} />}
          label={one.label} />
        <FormControlLabel
          value={two.value}
          control={<Radio
            checked={value === two.value}
            onChange={this.handleChange}
          />}
          label={two.label} />
      </div>
    </FormControl>
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
  group: {
    display: 'flex',
    paddingTop: '5px',
    paddingLeft: 0
  }
});

export default withStyles(styles, { name: 'TwoChoice' })(TwoChoice);