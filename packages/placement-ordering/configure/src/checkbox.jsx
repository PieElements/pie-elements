import { FormControlLabel } from 'material-ui/Form';
import MuiCheckbox from 'material-ui/Checkbox';
import PropTypes from 'prop-types';
import React from 'react';

const Checkbox = ({ checked, onChange, value, label }) => <FormControlLabel
  control={
    <MuiCheckbox
      checked={checked}
      onChange={onChange}
      value={value} />
  }
  label={label} />

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired
}

Checkbox.defaultProps = {
  value: ''
}

export default Checkbox;