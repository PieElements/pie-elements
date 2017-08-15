import StyleButton, { Button } from './style-button';

import Bold from 'material-ui-icons/FormatBold';
import Image from 'material-ui-icons/Image';
import Italic from 'material-ui-icons/FormatItalic';
import React from 'react';
import Underlined from 'material-ui-icons/FormatUnderlined';
import injectSheet from 'react-jss';

const toolbarStyle = {
  root: {
    display: 'flex',
    cursor: 'pointer',
    background: 'var(--editable-html-toolbar-bg, #eeeeee)',
    margin: '0px',
    padding: '2px'
  }
}

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', icon: <Bold /> },
  { label: 'Italic', style: 'ITALIC', icon: <Italic /> },
  { label: 'Underline', style: 'UNDERLINE', icon: <Underlined /> }
];

const RawToolbar = (props) => {
  const { editorState, classes, onToggle, onImageClick } = props;
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className={classes.root}>
      <div className={classes.inline}>
        {INLINE_STYLES.map(type => {

          return <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
          >{type.icon}</StyleButton>
        }
        )}
        <Button onClick={onImageClick}> <Image /></Button>
      </div>
    </div>
  );
};

export default injectSheet(toolbarStyle)(RawToolbar);