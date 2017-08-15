import Bold from 'material-ui-icons/FormatBold';
import Italic from 'material-ui-icons/FormatItalic';
import React from 'react';
import StyleButton from './style-button';
import Underlined from 'material-ui-icons/FormatUnderlined';
import injectSheet from 'react-jss';
const toolbarStyle = {
  root: {
    cursor: 'pointer',
    background: 'var(--editable-html-toolbar-bg, #eeeeee)',
    listStyleType: 'none',
    margin: 0,
    padding: '2px'
  },
  button: {
    margin: '3px',
    borderRadius: '0',
    display: 'inline-flex',
    textAlign: 'center',
    background: 'white',
    color: 'black'
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', icon: <Bold /> },
  { label: 'Italic', style: 'ITALIC', icon: <Italic /> },
  { label: 'Underline', style: 'UNDERLINE', icon: <Underlined /> }
];

const RawToolbar = (props) => {
  const { editorState, classes, onToggle } = props;
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className={classes.root}>
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
    </div>
  );
};

// const RawToolbar = (props) => {
//   const { editorState, classes, onToggle } = props;
//   const selection = editorState.getSelection();
//   const blockType = editorState
//     .getCurrentContent()
//     .getBlockForKey(selection.getStartKey())
//     .getType();

//   return (
//     <div className={classes.root}>
//       {BLOCK_TYPES.map((type) => {

//         const icon = <Bold />;

//         return <StyleButton
//           key={type.label}
//           active={type.style === blockType}
//           label={type.label}
//           onToggle={onToggle}
//           style={type.style}>{icon}</StyleButton>
//       }
//       )}
//     </div>
//   );
// };


// const RawToolbar = ({ classes, onStyle, editorState }) => {

//   const selection = editorState.getSelection();
//   const blockType = editorState
//     .getCurrentContent()
//     .getBlockForKey(selection.getStartKey())
//     .getType();

//   return <div className={classes.root}>
//     <StyleButton><Bold /></StyleButton>
//     {/* <li className={classes.button} onClick={() => onStyle('BOLD')}><Bold /></li>
//     <li className={classes.button} onClick={() => onStyle('ITALIC')}><Italic /></li>
//     <li className={classes.button} onClick={() => onStyle('UNDERLINE')}><Underlined /></li> */}
//   </ul>
// };

export default injectSheet(toolbarStyle)(RawToolbar);