import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormHelperText } from 'material-ui/Form';
import {Correct, Incorrect, CorrectResponse} from '@pie-libs/icons';
import { indicators } from '@pie-libs/render-ui';
import Choices from "./choices";
// const {Correct} = indicators;

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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

    const { choices, classes, disabled, result} = this.props;

    let renderFeedback = function (result) {
      let { feedback } = result[0];
      return (
        <FormHelperText>{feedback && feedback[0].value}</FormHelperText>
      )
    }

    return (
      <div className={classes.container}>
        {choices.length > 0 && <FormControl className={classes.formControl} disabled={disabled}>
          <Choices items={choices} value={this.state.selected} onChange={this.handleChange} />
          {(result) && renderFeedback(result)}
        </FormControl>}
        {(result) && <div className={classes.formControl}>
          {(result[0].correct) ? <Correct iconSet="emoji"/> : <Incorrect iconSet="emoji"/>}
        </div>}
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