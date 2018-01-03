import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import MuiInput, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import classNames from 'classnames';
import range from 'lodash/range';

import { Correct, Incorrect, PartiallyCorrect, NothingSubmitted } from './response-indicators';
import { withStyles } from 'material-ui/styles';
import NumberFormat from 'react-number-format';
import { getFormatTag } from './formatting-component';
const log = debug('pie-elements:text-entry');

const tags = {
  'correct': Correct,
  'incorrect': Incorrect,
  'partially-correct': PartiallyCorrect,
  'empty': NothingSubmitted
}

class RawInput extends React.Component {
  render() {
    const {
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
    log('[render] correctness: ', correctness);

    const CorrectnessTag = tags[correctness];

    return (
      <FormControl
        disabled={disabled}
        className={formClasses}
        error={!!error}>
        <div className={classes.inputAndIcon}>
          <MuiInput
            value={value}
            classes={{
              input: inputClass
            }}
            onChange={onChange}
            inputComponent={inputComponent}
            inputProps={inputProps} />
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
    const { session, model } = this.props;
    log('[render] model: ', model);
    const { allowIntegersOnly } = model;
    const { value } = this.state;
    const FormatTag = getFormatTag(model);
    const inputProps = model.allowIntegersOnly ? { onBadInput: this.onBadInput } : {}
    return (
      <Input
        feedback={model.feedback}
        value={value}
        correctness={model.correctness}
        alignment={model.answerAlignment}
        size={model.answerBlankSize}
        onChange={this.onChange}
        inputComponent={FormatTag}
        error={this.state.warning}
        inputProps={inputProps}
        disabled={model.disabled} />
    );
  }
}

TextEntry.propTypes = {}

export default TextEntry;