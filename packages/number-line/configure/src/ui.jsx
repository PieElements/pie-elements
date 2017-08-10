import { FormControlLabel, FormGroup } from 'material-ui/Form';

import MuiCheckbox from 'material-ui/Checkbox';
import React from 'react';

export const Checkbox = ({checked, onChange, value, label}) => (
  <FormControlLabel
    control={ <MuiCheckbox
      checked={checked}
      onChange={onChange} 
      value={value} /> }
    label={label} />
);