import React from 'react';
import PropTypes from 'prop-types';
import Input from 'material-ui/Input';
import debug from 'debug';
import { Correct, Incorrect, PartiallyCorrect } from '@pie-libs/icons';
import { withStyles } from 'material-ui/styles';

const log = debug('pie-elements:text-entry');

const tags = {
  'correct': Correct,
  'incorrect': Incorrect,
  'partially-correct': PartiallyCorrect
}

const styles = theme => ({
  textEntry: {
    display: 'flex'
  },
  icon: {
    width: '40px',
    height: '40px'
  }
});

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