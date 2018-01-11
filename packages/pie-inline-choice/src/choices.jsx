import React from "react";
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';

class choices extends React.Component {

  constructor(props){
    super(props);
    this.handleChoiceChange = this.handleChoiceChange.bind(this);
  }

  
  handleChoiceChange() {
    this.props.handleChange();
  }

  render() {
    console.log("props", this.props);
    return (
      <Select
        value={this.props.age}
        onChange={this.handleChoiceChange}
        input={<Input name="age" id="age-helper" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    );
  }
}

export default choices;