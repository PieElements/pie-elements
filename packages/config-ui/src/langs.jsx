import Menu, { MenuItem } from 'material-ui/Menu';

import Button from 'material-ui/Button';
import InputLabel from 'material-ui/Input/InputLabel';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    flexDirection: 'column',
    alignItems: 'start',
    display: 'flex',
    position: 'relative',
    paddingTop: '0px',
    paddingRight: '0px'
  }
};

const buttonStyles = {
  root: {
    display: 'inline-flex',
    padding: '8px',
    marginTop: '0px',
    marginBottom: '10px',
    minHeight: '24px',
    minWidth: '50px'
  },
  icon: {
    fill: 'grey'
  }
};

const RawSelectButton = (props) => {
  const { classes } = props;
  return <Button
    {...props}
    aria-owns="langs"
    aria-haspopup="true"
    classes={{ root: classes.root }}
  >{props.children}<KeyboardArrowDown className={classes.icon} /></Button>
};

const SelectButton = withStyles(buttonStyles, { name: 'SelectButton' })(RawSelectButton);


class RawLangs extends React.Component {

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
      <InputLabel shrink={true}>{label}</InputLabel>
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


const Langs = withStyles(styles, { name: 'Langs' })(RawLangs);
export default Langs;

export const LanguageControls = withStyles({
  languageControls: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: '1fr',
    gridGap: '8px'
  }
})(({
  classes,
  langs,
  activeLang,
  defaultLang,
  onActiveLangChange,
  onDefaultLangChange,
  className }) => {
  const names = classNames(classes.languageControls, className);

  return <div className={names}>
    <Langs
      label="Choose language to edit"
      langs={langs}
      selected={activeLang}
      onChange={(e, index, l) => onActiveLangChange(l)} />
    <Langs
      label="Default language"
      langs={langs}
      selected={defaultLang}
      onChange={(e, index, l) => onDefaultLangChange(l)} />
  </div>
});

LanguageControls.propTypes = {
  langs: PropTypes.array,
  activeLang: PropTypes.string.isRequired,
  defaultLang: PropTypes.string.isRequired,
  onActiveLangChange: PropTypes.func.isRequired,
  onDefaultLangChange: PropTypes.func.isRequired
}