import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

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
      selected : ""
    }
  }

  handleChange = event => {
    this.setState({ selected: event.target.value });
  };


  render() {
    const { classes, model, session} = this.props;

    const items = (model.choices && model.choices.length > 0) ? model.choices.map(function(item, index){
      return (
        <MenuItem key={index} value={index}>{item.value}</MenuItem>
      );
    }) : null;

    return (
      <form className={classes.container} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="input-choice">{model.choiceLabel}</InputLabel>
          <Select
            value={this.state.selected}
            onChange={this.handleChange}
            input={<Input name="input-choice" id="input-choice" />}
          >
            {items}
          </Select>
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
      </form>
    );
  }
}

InlineChoice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InlineChoice);  