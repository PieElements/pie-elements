import React from 'react';
import PropTypes from 'prop-types';
import Input from 'material-ui/Input';
import debug from 'debug';
import { Correct, Incorrect, PartiallyCorrect, NothingSubmitted } from '@pie-libs/icons';
import { withStyles } from 'material-ui/styles';
import NumberFormat from 'react-number-format';

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

class NumberFormatCustom extends React.Component {
  render() {
    return (
      <NumberFormat
        {...this.props}
        onValueChange={values => {
          this.props.onChange({
            target: {
              value: values.value,
            },
          });
        }}
        thousandSeparator
        prefix="$"
      />
    );
  }
}

NumberFormatCustom.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export class TextEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.session.value || ''
    }
  }

  onChange = (event) => {
    log('[onChange] value: ', event.target.value);
    this.setState({ value: event.target.value }, () => {
      this.props.onSessionChanged(this.state.value);
    });
  }

  render() {
    const { session, model, classes } = this.props;

    const { value } = this.state;

    const CorrectnessTag = tags[model.correctness];
    return (
      <div className={classes.textEntry}>
        <Input
          value={value}
          onChange={this.onChange}
          inputComponent={NumberFormatCustom}
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