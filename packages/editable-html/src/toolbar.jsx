import React from 'react';
import injectSheet from 'react-jss';

const toolbarStyle = {
  root: {
    cursor: 'pointer',
    background: '#cccccc',
    listStyleType: 'none',
    margin: 0,
    padding: '2px'
  },
  button: {
    margin: '2px',
    borderRadius: '4px',
    display: 'inline-block',
    height: '100%',
    padding: '0 8px',
    fontWeight: 'bold',
    textAlign: 'center',
    background: '#999999',
    color: 'black'
  }
}

const RawToolbar = ({ classes, onStyle }) => (
  <ul className={classes.root}>
    <li className={classes.button} onClick={() => onStyle('BOLD')}>B</li>
    <li className={classes.button} onClick={() => onStyle('ITALIC')}>I</li>
    <li className={classes.button} onClick={() => onStyle('UNDERLINE')}>U</li>
  </ul>
);

export default injectSheet(toolbarStyle)(RawToolbar);