import { Button, MarkButton } from './toolbar-buttons';

import Bold from 'material-ui-icons/FormatBold';
import Check from 'material-ui-icons/Check';
import Code from 'material-ui-icons/Code';
import Functions from 'material-ui-icons/Functions';
import Image from 'material-ui-icons/Image';
import Italic from 'material-ui-icons/FormatItalic';
import PropTypes from 'prop-types';
import React from 'react';
import Strikethrough from 'material-ui-icons/FormatStrikethrough';
import Underlined from 'material-ui-icons/FormatUnderlined';
import debug from 'debug';
import injectSheet from 'react-jss';

const log = debug('editable-html:plugins:toolbar');

const toolbarStyle = {
  toolbar: {
    position: 'absolute',
    zIndex: 10,
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'space-between',
    background: 'var(--editable-html-toolbar-bg, #efefef)',
    margin: '0px',
    padding: '2px',
    width: '100%',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    boxSizing: 'border-box'
  }
}

const ToolbarButton = (props) => {

  const hasMark = (type) => {
    const { value } = props;
    return value.marks.some(mark => mark.type == type)
  }

  if (props.isMark) {
    const isActive = hasMark(props.type);
    return <MarkButton
      active={isActive}
      label={props.type}
      onToggle={() => {
        const c = props.onToggle(props.value.change())
        props.onChange(c);
      }}
      mark={props.type}
    >{props.icon}</MarkButton>
  } else {
    return <Button
      onClick={props.onClick}>{props.icon}</Button>
  }
}

class RawToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.hasMark = (type) => {
      const { value } = this.props;
      return value.marks.some(mark => mark.type == type)
    }

    this.hasBlock = (type) => {
      const { value } = this.props;
      return value.blocks.some(node => node.type == type)
    }
  }

  onToggle = (plugin) => {
    const { value, onChange } = this.props;

    if (!plugin.onToggle) return;

    const change = plugin.onToggle(value.change())
    onChange(change);
  }

  render() {
    const {
      classes,
      onToggleMark,
      onImageClick,
      onInsertMath,
      onDone,
      zIndex,
      onFocus,
      onBlur,
      plugins,
      value,
      onChange } = this.props;

    const toolbarPlugins = plugins.filter(p => p.toolbar).map(p => p.toolbar);

    const style = zIndex ? { zIndex } : {};

    return (
      <div className={classes.toolbar}
        style={style}
        onFocus={onFocus}
        onBlur={onBlur}>
        <div className={classes.inline}>
          {toolbarPlugins.map((p, index) => {
            return <ToolbarButton
              {...p}
              key={index}
              value={value}
              onChange={onChange} />
            // const isActive = this.hasMark(p.type);
            // return <MarkButton
            //   key={p.type}
            //   active={isActive}
            //   label={p.type}
            //   onToggle={() => this.onToggle(p)}
            //   mark={p.type}
            // >{p.icon}</MarkButton>
          }
          )}
          {/* {onImageClick && <Button onClick={onImageClick}> <Image /></Button>}
          <Button onClick={onInsertMath}> <Functions /></Button> */}
        </div>
        <Button onClick={onDone}><Check /></Button>
      </div>
    );
  }
}

RawToolbar.propTypes = {
  zIndex: PropTypes.number,
  value: PropTypes.object.isRequired,
  plugins: PropTypes.array,
  onToggleMark: PropTypes.func.isRequired,
  onImageClick: PropTypes.func,
  onInsertMath: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
}

export default injectSheet(toolbarStyle)(RawToolbar);