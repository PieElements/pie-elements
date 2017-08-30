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
import injectSheet from 'react-jss';

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
    borderTop: 'solid 1px #cccccc',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    boxSizing: 'border-box'
  }
}

var INLINE_STYLES = [
  { mark: 'bold', label: 'Bold', icon: <Bold /> },
  { mark: 'italic', label: 'Italic', icon: <Italic /> },
  { mark: 'underline', label: 'Underline', icon: <Underlined /> },
  { mark: 'code', label: 'code', icon: <Code /> },
  { mark: 'strikethrough', label: 'Strikethrough', icon: <Strikethrough /> }
];

class RawToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.hasMark = (type) => {
      const { editorState } = this.props;
      return editorState.marks.some(mark => mark.type == type)
    }

    this.hasBlock = (type) => {
      const { editorState } = this.props;
      return editorState.blocks.some(node => node.type == type)
    }
  }

  render() {
    const {
      classes,
      onToggleMark,
      onImageClick,
      onInsertMath,
      onDone,
      zIndex } = this.props;

    const style = zIndex ? { zIndex } : {};

    return (
      <div className={classes.toolbar} style={style}>
        <div className={classes.inline}>
          {INLINE_STYLES.map(type => {
            const isActive = this.hasMark(type.mark);
            return <MarkButton
              key={type.label}
              active={isActive}
              label={type.label}
              onToggle={onToggleMark}
              mark={type.mark}
            >{type.icon}</MarkButton>
          }
          )}
          <Button onClick={onImageClick}> <Image /></Button>
          <Button onClick={onInsertMath}> <Functions /></Button>
        </div>
        <Button onClick={onDone}><Check /></Button>
      </div>
    );
  }
}

RawToolbar.propTypes = {
  zIndex: PropTypes.number,
  editorState: PropTypes.object.isRequired,
  onToggleMark: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
  onInsertMath: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
}

export default injectSheet(toolbarStyle)(RawToolbar);