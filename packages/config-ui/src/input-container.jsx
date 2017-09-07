import InputLabel from 'material-ui/Input/InputLabel';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const RawInputContainer = (props) => {
  const { label, className, children, classes } = props;
  const names = classNames(classes.inputContainer, className);
  return (
    <div className={names}>
      <InputLabel className={classes.label} shrink={true}>{label}</InputLabel>
      <div className={classes.children}>
        {children}
      </div>
    </div>
  );
}

export default withStyles(theme => ({
  children: {
    paddingTop: 0,
    paddingBottom: theme.spacing.unit,
    paddingLeft: 0,
    top: '0px',
    marginTop: '-9px',
    position: 'relative'
  },
  label: {
    position: 'relative',
    whiteSpace: 'nowrap'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
}))(RawInputContainer);
