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
      onClick={() => props.onClick(props.value, props.onChange)}>{props.icon}</Button>
  }
}

const RawDefaultToolbar = ({ plugins, value, onChange, classes }) => {
  const toolbarPlugins = plugins.filter(p => p.toolbar).map(p => p.toolbar);
  return (
    <div className={classes.inline}>
      {toolbarPlugins.map((p, index) => {
        return <ToolbarButton
          {...p}
          key={index}
          value={value}
          onChange={onChange} />
      })}
    </div>);
}

const DefaultToolbar = injectSheet(toolbarStyle)(RawDefaultToolbar);

const findSingleNode = (value) => {

  if (!value || !value.isCollapsed || !value.startKey) {
    return;
  }

  const inline = value.document.getClosestInline(value.startKey);

  if (inline) {
    return inline;
  }

  const block = value.document.getClosestBlock(value.startKey);

  if (block) {
    return block;
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
      onDone,
      zIndex,
      onFocus,
      onBlur,
      plugins,
      value,
      onChange,
      onMouseEnter,
      onMouseDown,
      onMouseOut,
      onMouseUp,
      onClick } = this.props;

    const node = findSingleNode(value);

    const CustomToolbar = plugins.reduce((tb, p) => {
      if (tb) {
        return tb;
      }
      return node && p.toolbar && p.toolbar.customToolbar && p.toolbar.customToolbar(node);
    }, null);

    const style = zIndex ? { zIndex } : {};

    return (
      <div className={classes.toolbar}
        style={style}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onClick={onClick}>
        {CustomToolbar ?
          <CustomToolbar
            value={value}
            onChange={onChange}
            node={node} /> :
          <DefaultToolbar
            plugins={plugins}
            value={value}
            onChange={onChange} />}
      </div>
    );
  }
}

RawToolbar.propTypes = {
  zIndex: PropTypes.number,
  value: PropTypes.object.isRequired,
  plugins: PropTypes.array,
  onImageClick: PropTypes.func,
  onDone: PropTypes.func.isRequired
}

export default injectSheet(toolbarStyle)(RawToolbar);