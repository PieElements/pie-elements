import { FormControl, FormControlLabel, FormLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Tabs, { Tab } from 'material-ui/Tabs';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import PropTypes from 'prop-types';
import React from 'react';

const TwoChoice = ({ value, header, selectedValue, onChange, one, two, classes }) => (
  <FormControl className={classes.root}>
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

const styles = createStyleSheet('TwoChoice', theme => {
  return {
    root: {
      paddingRight: '20px'
    }
  }
});

const StyledTwoChoice = withStyles(styles)(TwoChoice);

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
  return <StyledTwoChoice {...choiceProps} />;
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
  return <StyledTwoChoice {...choiceProps} />;
}