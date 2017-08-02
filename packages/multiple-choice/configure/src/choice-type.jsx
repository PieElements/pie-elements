import { FormControl, FormControlLabel, FormLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Tabs, { Tab } from 'material-ui/Tabs';
import { blue500, green500, green700, grey400, grey500, red500 } from 'material-ui/styles/colors';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import ChoiceConfig from './choice-config';
import Langs from './langs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MultiLangInput from './multi-lang-input';
import PartialScoringConfig from '@pie-libs/scoring-config/src/index.jsx';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const TwoChoice = ({ value, header, selectedValue, onChange, one, two }) => (
  <FormControl>
    <FormLabel>{header}</FormLabel>
    <RadioGroup
      aria-label="choice-type"
      name={header}
      selectedValue={value}
      onChange={onChange}>
      <FormControlLabel value={one.value} control={<Radio />} label={one.label} />
      <FormControlLabel value={two.value} control={<Radio />} label={two.label} />
    </RadioGroup>
  </FormControl>
);


TwoChoice.propTypes = {
};

export const ChoiceType = (props) => {
  let choiceProps = {
    header: 'Response Type',
    defaultSelected: 'radio',
    value: props.value,
    onChange: props.onChange,
    one: {
      label: 'Radio',
      value: 'radio'
    },
    two: {
      label: 'Checkbox',
      value: 'checkbox'
    }
  }
  return <TwoChoice {...choiceProps} />;
}

export const KeyType = (props) => {
  let choiceProps = {
    header: 'Choice Labels',
    defaultSelected: 'numbers',
    value: props.value,
    onChange: props.onChange,
    one: {
      label: 'Numbers',
      value: 'numbers'
    },
    two: {
      label: 'Letters',
      value: 'letters'
    }
  }
  return <TwoChoice {...choiceProps} />;
}