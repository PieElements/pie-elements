import React from 'react';
import debug from 'debug';
import classNames from 'classnames';
import range from 'lodash/range';
import MuiInput, { InputLabel } from 'material-ui/Input';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import { Correct, Incorrect, PartiallyCorrect, NothingSubmitted } from './response-indicators';
import { FormControl, FormHelperText } from 'material-ui/Form';

const tags = {
  'correct': Correct,
  'incorrect': Incorrect,
  'partially-correct': PartiallyCorrect,
  'empty': NothingSubmitted
}

const log = debug('pie-elements:text-entry:input');

class RawInput extends React.Component {
  render() {
    const {
      dark,
      alignment,
      classes,
      correctness,
      disabled,
      error,
      inputComponent,
      inputProps,
      onChange,
      size,
      value,
      feedback
     } = this.props;

    const formClasses = classNames(classes.formControl);
    const inputClass = classNames(classes.input, classes[alignment], classes[`size${size}`]);
    const Comp = inputComponent;
    const CorrectnessTag = tags[correctness];
    const theme = createMuiTheme({
      palette: {
        type: dark ? 'dark' : 'light'
      },
    });

    return (
      <FormControl
        disabled={disabled}
        className={formClasses}
        error={!!error}>
        <div className={classes.inputAndIcon}>
          <MuiThemeProvider theme={theme}>
            <MuiInput
              classes={{
                input: inputClass
              }}
              value={value}
              onChange={onChange}
              inputComponent={inputComponent}
              inputProps={inputProps} />
          </MuiThemeProvider>
          {CorrectnessTag && <div className={classes.icon}><CorrectnessTag feedback={feedback || 'feedback'} /></div>}
        </div>
        <FormHelperText>{error ? error : ''}</FormHelperText>
      </FormControl>
    )
  }
}

const inputStyles = theme => {


  const base = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
    },
    inputAndIcon: {
      display: 'flex',
      alignItems: 'end'
    },
    icon: {
      padding: '3px',
      paddingLeft: `${theme.spacing.unit}px`,
      width: '30px',
      height: '30px'
    },
    right: {
      textAlign: 'right'
    },
    center: {
      textAlign: 'center'
    }
  }

  const sizes = range(1, 8).reduce((acc, s) => {
    acc[`size${s}`] = {
      maxWidth: `${theme.spacing.unit * 1.4 * s}px`
    }
    return acc;
  }, {});

  return Object.assign(base, sizes);
}

const Input = withStyles(inputStyles)(RawInput);

export default Input;