import Menu, { MenuItem } from 'material-ui/Menu';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';
import React from 'react';

const styles = createStyleSheet('Langs', theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    paddingTop: '10px',
    paddingRight: '20px'
  }
}));


const buttonStyles = createStyleSheet({
  root: {
    display: 'inline-flex',
    padding: '5px',
    marginLeft: '10px',
    minHeight: '24px',
    minWidth: '50px'
  },
  icon: {
    fill: 'grey'
  }
});

const RawSelectButton = (props) => {
  const { classes } = props;
  return <Button
    {...props}
    aria-owns="langs"
    aria-haspopup="true"
    classes={{ root: classes.root }}
  >{props.children}<KeyboardArrowDown className={classes.icon} /></Button>
};

const SelectButton = withStyles(buttonStyles)(RawSelectButton);


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

  /**
   * Use TextField select menus once available:
   *  https://material-ui-1dab0.firebaseapp.com/component-demos/menus#textfield-select-menus
   */
  render() {
    let { langs, selected, onChange, label, classes } = this.props;
    return <div className={classes.root}>
      <div>{label}</div>
      <SelectButton
        aria-owns="langs"
        aria-haspopup="true"
        onClick={this.onButtonClick}>{selected}</SelectButton>
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