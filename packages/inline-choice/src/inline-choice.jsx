import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import { indicators } from '@pie-libs/render-ui';
import Choices from './choices';

const { Correct, Incorrect, NothingSubmitted } = indicators;

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  }
});


class InlineChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ""
    }
  }

  handleChange = event => {
    this.props.onChoiceChanged(event.target.value);
    this.setState({ selected: event.target.value });
  };


  render() {

    let { choices, classes, disabled, result } = this.props;
    result = result || {};
    const { correct, nothingSubmitted } = result;

    const Feedback = (() => {
      if (correct === false && nothingSubmitted) {
        return NothingSubmitted;
      } else if (correct === false && !nothingSubmitted) {
        return Incorrect
      } else if (correct === true) {
        return Correct;
      }
    })();

    return (
      <div className={classes.container}>
        {choices.length > 0 && (
          <FormControl
            className={classes.formControl}
            disabled={disabled}>
            <Choices
              items={choices}
              value={this.state.selected}
              onChange={this.handleChange} />
          </FormControl>
        )}
        {Feedback && <Feedback feedback={result.feedback} />}
      </div>
    );
  }
}

InlineChoice.propTypes = {
  classes: PropTypes.object,
  choices: PropTypes.array,
  disabled: PropTypes.bool
};

export default withStyles(styles)(InlineChoice);  