import React from 'react';
import PropTypes from 'prop-types';
// import Input from 'material-ui/Input';
import debug from 'debug';
import MuiInput, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import classNames from 'classnames';
import range from 'lodash/range';

import { Correct, Incorrect, PartiallyCorrect, NothingSubmitted } from '@pie-libs/icons';
import { withStyles } from 'material-ui/styles';
import NumberFormat from 'react-number-format';
import { getFormatTag } from './input'
const log = debug('pie-elements:text-entry');

const tags = {
  'correct': Correct,
  'incorrect': Incorrect,
  'partially-correct': PartiallyCorrect,
  'empty': NothingSubmitted
}

const styles = theme => ({
  textEntry: {
    display: 'flex'
  },
  icon: {
    width: '30px',
    height: '30px'
  }
});


class RawInput extends React.Component {
  render() {
    const { classes, value, onChange, inputComponent, inputRef, inputProps, error, alignment, size } = this.props;

    const formClasses = classNames(classes.formControl, classes[`size${size}`]);
    const inputClass = classNames(classes.input, classes[alignment]);
    const Comp = inputComponent;
    log('error: ', error);
    return (
      <FormControl
        className={formClasses}
        error={!!error}>
        <MuiInput
          inputRef={inputRef}
          value={value}
          classes={{
            input: inputClass
          }}
          onChange={onChange}
          inputComponent={inputComponent}
          inputProps={inputProps} />
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
    input: {

    },
    right: {
      textAlign: 'right'
    },
    center: {
      textAlign: 'center'
    },
    size8: {
      maxWidth: '100px'
    }
  }
  const sizes = range(1, 8).reduce((acc, s) => {
    acc[`size${s}`] = {
      maxWidth: `${theme.spacing.unit * s}px`
    }
    return acc;
  }, {});
  return Object.assign(base, sizes);
}

const Input = withStyles(inputStyles)(RawInput);

export class TextEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.session.value || ''
    }
  }

  onChange = (event) => {
    clearTimeout(this.state.timeoutId);
    this.setState({ warning: null, timeoutId: null });
    log('[onChange] value: ', event.target.value);
    if (this.state.value !== event.target.value) {
      this.setState({ value: event.target.value }, () => {
        this.props.onSessionChanged(this.state.value);
      });
    }
  }

  onBadInput = (data) => {
    const { model } = this.props;
    const warning = model.numbersOnlyWarning || 'Please enter numbers only';
    log('[onBadInput] warning: ', warning);
    const timeoutId = setTimeout(() => {
      this.setState({ warning: null });
    }, 1000);
    this.setState({ warning, timeoutId });
  }

  render() {
    const { session, model, classes } = this.props;
    log('[render] model: ', model);

    const { allowIntegersOnly } = model;
    const { value } = this.state;
    const CorrectnessTag = tags[model.correctness];

    const FormatTag = getFormatTag(model);

    return (
      <div className={classes.textEntry}>
        <Input
          value={value}
          alignment={model.answerAlignment}
          size={model.answerBlankSize}
          onChange={this.onChange}
          inputComponent={FormatTag}
          error={this.state.warning}
          inputProps={{ onBadInput: this.onBadInput }}
          disabled={model.disabled} />
        {CorrectnessTag && <div className={classes.icon}>
          <CorrectnessTag />
        </div>}
      </div>
    );
  }
}

TextEntry.propTypes = {}

export default withStyles(styles)(TextEntry);