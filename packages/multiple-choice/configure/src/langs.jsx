import Menu, { MenuItem } from 'material-ui/Menu';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import React from 'react';

const styles = createStyleSheet('Langs', theme => {

  return {
    root: {
      position: 'relative'
    }
  }
});

class Langs extends React.Component {

  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onRequestClose = this.onRequestClose.bind(this);
    this.choose = this.choose.bind(this);
    this.state = {
      anchorEl: null
    }
  }

  choose(lang, index, event) {
    this.props.onChange(event, index, lang);
    this.setState({ open: false });
  }

  onButtonClick(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  onRequestClose() {
    this.setState({ open: false });
  }

  render() {
    let { langs, selected, onChange, label, classes } = this.props;
    return <div className={classes.root}>
      <Button aria-owns="langs" aria-haspopup="true" onClick={this.onButtonClick}>{selected}</Button>
      <Menu id="langs"
        anchorEl={this.state.anchorEl}
        open={this.state.open}
        onRequestClose={this.onRequestClose}>
        {langs.map((l, index) => <MenuItem key={l} value={l} onClick={this.choose.bind(this, l, index)}>{l}</MenuItem>)}
      </Menu>
    </div>;
  }
}

export default withStyles(styles)(Langs);