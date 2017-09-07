import Checkbox from 'material-ui/Checkbox';
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
        classes={{
          root: classes.switchRoot
        }}
        checked={checked}
        onChange={onChange}
        aria-label={label} />
    </InputContainer>
  )
}

const InputSwitch = withStyles({
  switchRoot: {
    justifyContent: 'inherit',
    transform: 'translate(-20%)'
  }
})(RawInputSwitch);

const RawInputCheckbox = ({ classes, className, label, checked, onChange }) => {
  return (
    <InputContainer
      className={className}
      label={label}>
      <Checkbox
        classes={{
          root: classes.checkboxRoot
        }}
        checked={checked}
        onChange={onChange}
        aria-label={label} />
    </InputContainer>
  )
}

const InputCheckbox = withStyles({
  checkboxRoot: {
    justifyContent: 'inherit'
  }
})(RawInputCheckbox);

export {
  InputSwitch,
  InputCheckbox
}
