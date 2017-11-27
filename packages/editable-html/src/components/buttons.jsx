import DeleteIcon from 'material-ui-icons/Delete';
import React from 'react';
import classNames from 'classnames';
import debug from 'debug';
import injectSheet from 'react-jss';

const styles = {
  delete: {
    cursor: 'pointer',
    transition: 'opacity 200ms linear',
    '&:hover': {
      opacity: 0.5
    }
  }
}

export const Delete = injectSheet(styles)(({ classes, className, onClick }) => {

  const names = classNames(classes.delete, className);
  return <div
    onClick={onClick}
    className={names}>
    <DeleteIcon />
  </div>
});
