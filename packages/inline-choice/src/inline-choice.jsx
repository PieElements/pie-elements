import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import classNames from "classnames";

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
  },
  disableContainer: {
    pointerEvents : 'none'
  }
});


class InlineChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected : ""
    }
  }

  handleChange = event => {
    this.props.onChoiceChanged(event.target.value);
    this.setState({ selected: event.target.value });
  };


  render() {

    const { choices, classes, disabled} = this.props;

    let disableContainer = disabled && classes.disableContainer;

    const items = choices.map(function(item, index){
      return (
        <MenuItem key={index} value={item.value}>{item.label[0].value}</MenuItem>
      );
    });

    let renderFeedback = function (result) {
      let {correct, feedback} = result[0];
      return (
        <FormHelperText>{feedback && feedback[0].value}</FormHelperText>
      )
    }

    return (
      <div className={classNames(classes.container, disableContainer)}>
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.selected}
            onChange={this.handleChange}
            input={<Input name="input-choice" id="input-choice" />}
          >
            {items}
          </Select>
          {(this.props.result) && renderFeedback(this.props.result)}
        </FormControl>
        <div className={classes.formControl}>
          Feedback Icon
        </div>
      </div>

    );
  }
}

InlineChoice.propTypes = {
  classes: PropTypes.object.isRequired,
  choices: PropTypes.array.isRequired,
  disabled: PropTypes.bool
};

export default withStyles(styles)(InlineChoice);  