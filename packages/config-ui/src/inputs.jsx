import InputContainer from './input-container';
import PropTypes from 'prop-types';
import React from 'react';
import Switch from 'material-ui/Switch';
import { withStyles } from 'material-ui/styles';

const RawInputSwitch = ({ classes, className, label, checked, onChange }) => {
  return (
    <InputContainer
      className={className}
      label={label}>
      <Switch
        checked={checked}
        onChange={onChange}
        aria-label={label} />
    </InputContainer>
  )
}

const InputSwitch = withStyles({})(RawInputSwitch);

const RawInputCheckbox = ({ classes, className, label, checked, onChange }) => {
  return (
    <InputContainer
      className={className}
      label={label}>
      <Checkbox
        checked={checked}
        onChange={onChange}
        aria-label={label} />
    </InputContainer>
  )
}

const InputCheckbox = withStyles({})(RawInputCheckbox);

export {
  InputSwitch,
  InputCheckbox
}
