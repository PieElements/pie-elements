import { Button, MarkButton } from './toolbar-buttons';

import Bold from 'material-ui-icons/FormatBold';
import Check from 'material-ui-icons/Check';
import Functions from 'material-ui-icons/Functions';
import Image from 'material-ui-icons/Image';
import Italic from 'material-ui-icons/FormatItalic';
import React from 'react';
import Underlined from 'material-ui-icons/FormatUnderlined';
import injectSheet from 'react-jss';

const toolbarStyle = {
  root: {
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'space-between',
    background: 'var(--editable-html-toolbar-bg, #eeeeee)',
    borderTop: 'solid 1px #cccccc',
    margin: '0px',
    padding: '2px'
  }
}

var INLINE_STYLES = [
  { mark: 'b', label: 'Bold', icon: <Bold /> },
  { mark: 'i', label: 'Italic', icon: <Italic /> },
  { mark: 'u', label: 'Underline', icon: <Underlined /> }
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
      editorState,
      classes,
      onToggleMark,
      onImageClick,
      onInsertMath,
      onDone } = this.props;

    return (
      <div className={classes.root}>
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

export default injectSheet(toolbarStyle)(RawToolbar);