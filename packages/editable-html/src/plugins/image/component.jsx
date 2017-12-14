import { Data, Raw } from 'slate';

import { Delete } from '../../components/buttons';
import { LinearProgress } from 'material-ui/Progress';
import Portal from 'react-portal';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import debug from 'debug';
import injectSheet from 'react-jss';
import { primary } from '../../theme';
import { withStyles } from 'material-ui/styles';

const log = debug('editable-html:plugins:image:component');

const logError = debug('editable-html:plugins:image:component');

logError.log = console.error.bind(console);

export class RawImage extends React.Component {

  getWidth = (percent) => {
    const multiplier = percent / 100;
    return this.img.naturalWidth * multiplier;
  }

  getHeight = (percent) => {
    const multiplier = percent / 100;
    return this.img.naturalHeight * multiplier;
  }

  render() {

    const { node, editor, classes, attributes, onFocus, onBlur } = this.props;
    const active = editor.value.isFocused && editor.value.selection.hasEdgeIn(node);
    log('[render] data: ', node.data.toJSON());
    const src = node.data.get('src');
    const percent = node.data.get('percent');
    const resizePercent = node.data.get('resizePercent');
    const loaded = node.data.get('loaded') !== false;
    const deleteStatus = node.data.get('deleteStatus');

    const style = {
      width: resizePercent ? `${this.getWidth(resizePercent)}px` : 'auto',
      height: resizePercent ? `${this.getHeight(resizePercent)}px` : 'auto'
    }

    const className = classNames(
      classes.root,
      active && classes.active,
      !loaded && classes.loading,
      deleteStatus === 'pending' && classes.pendingDelete);

    const progressClasses = classNames(
      classes.progress,
      loaded && classes.hideProgress);

    const resize = (amount) => this.resizeBy.bind(this, amount);
    log('showDelete: loaded: ', loaded, 'deleteStatus: ', deleteStatus);

    const showDelete = editor.value.isFocused && loaded && deleteStatus !== 'pending';

    return <div
      onFocus={onFocus}
      className={className}>
      <img
        src={src}
        {...attributes}
        ref={r => this.img = r}
        style={style} />
      {!loaded && <LinearProgress
        mode="determinate"
        value={percent > 0 ? percent : 0}
        className={progressClasses} />}
    </div>
  }
}

RawImage.propTypes = {
  onDelete: PropTypes.func.isRequired
}

const styles = {
  portal: {
    position: 'absolute',
    opacity: 0,
    transition: 'opacity 200ms linear'
  },
  floatingButtonRow: {
    backgroundColor: 'white',
    borderRadius: '1px',
    display: 'flex',
    padding: '10px',
    border: 'solid 1px #eeeeee',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
  },
  progress: {
    position: 'absolute',
    left: '5%',
    width: '90%',
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'opacity 200ms linear'
  },
  hideProgress: {
    opacity: 0
  },
  loading: {
    opacity: 0.3
  },
  pendingDelete: {
    opacity: 0.3
  },
  root: {
    position: 'relative',
    border: 'solid 1px white',
    display: 'inline-flex',
    transition: 'opacity 200ms linear'
  },
  active: {
    border: `solid 1px ${primary}`
  },
  delete: {
    position: 'absolute',
    right: 0,
  }
}

export default injectSheet(styles)(RawImage);