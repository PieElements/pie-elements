import { AtomicBlockUtils, EditorState, RichUtils } from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';

import React from 'react';
import Toolbar from './toolbar';
// import createAlignmentPlugin from 'draft-js-alignment-plugin';
// import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
// import createDragNDropUploadPlugin from 'draft-js-drag-n-drop-upload-plugin';
// import createFocusPlugin from 'draft-js-focus-plugin';
// import createImagePlugin from 'draft-js-image-plugin';
// import createResizeablePlugin from 'draft-js-resizeable-plugin';
import injectSheet from 'react-jss';
import isEmpty from 'lodash/isEmpty';
import { stateFromHTML } from 'draft-js-import-html';
import { stateToHTML } from 'draft-js-export-html';

// const focusPlugin = createFocusPlugin();
// const resizeablePlugin = createResizeablePlugin();
// const blockDndPlugin = createBlockDndPlugin();
// const alignmentPlugin = createAlignmentPlugin();
// const { AlignmentTool } = alignmentPlugin;

// const decorator = composeDecorators(
//   resizeablePlugin.decorator,
//   alignmentPlugin.decorator,
//   focusPlugin.decorator,
//   blockDndPlugin.decorator
// );
// const imagePlugin = createImagePlugin({ decorator });

// const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
//   handleUpload: mockUpload,
//   addImage: imagePlugin.addImage,
// });

// const plugins = [
//   dragNDropFileUploadPlugin,
//   blockDndPlugin,
//   focusPlugin,
//   alignmentPlugin,
//   resizeablePlugin,
//   imagePlugin
// ];

const style = {
  root: {
    border: '1px solid #cccccc',
    borderRadius: '0px',
    cursor: 'text'
  },
  editor: {
    padding: '8px',
    background: '#ffffff'
  }
}

const getMarkup = (editorContent) => {
  const div = document.createElement('div');
  div.innerHTML = stateToHTML(editorContent);
  const out = div.firstChild.innerHTML;
  return out;
}

export class EditableHTML extends React.Component {

  constructor(props) {
    super(props);
    const content = this.props.model === undefined ? '' : this.props.model;
    const editorState = EditorState.createWithContent(stateFromHTML(content));

    const currentContent = editorState.getCurrentContent();

    this.state = {
      showToolbar: false,
      active: false,
      hasText: currentContent.hasText(),
      editorState
    };
    // this.onStyle = this.onStyle.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onChange = this.onEditorStateChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onEditorBlur = this.onEditorBlur.bind(this);
    this.toggleHtml = this.toggleHtml.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(editorState) {
    //editorState

    const currentContent = editorState.getCurrentContent();
    const markup = getMarkup(currentContent);
    this.setState({ editorState, hasText: currentContent.hasText() });
    this.props.onChange(markup);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onEditorStateChange(newState)
    }
  }

  onEditorBlur(event) {
    this.blurTimeoutId = setTimeout(() => {
      this.setState({
        active: false
      });
      this.blurTimeoutId = undefined;
    }, 140);
  }

  componentWillUnmount() {
    clearTimeout(this.blurTimeoutId);
  }

  // onStyle(style) {
  //   if (this.blurTimeoutId) {
  //     clearTimeout(this.blurTimeoutId);
  //     this.blurTimeoutId = undefined;
  //   }
  //   this.onEditorStateChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  // }
  // onToggle(inlineStyle) {
  //   this.onChange(
  //     RichUtils.toggleInlineStyle(
  //       this.state.editorState,
  //       inlineStyle
  //     )
  //   );
  // }

  onToggle(inlineStyle) {
    console.log('inlineStyle: ', inlineStyle);
    const editorState = RichUtils.toggleInlineStyle(
      this.state.editorState,
      inlineStyle
    );
    this.onEditorStateChange(editorState);
    // this.setState({ editorState }, () => {
    // })
    // this.onChange(
    //   RichUtils.toggleBlockType(
    //     this.state.editorState,
    //     blockType
    //   )
    // );
  }

  toggleHtml() {
    if (this.state.active) {
      this.setState({
        active: false
      });
    } else {
      this.setState({
        active: true,
        editorState: EditorState.moveFocusToEnd(this.state.editorState)
      });
    }
  }

  render() {
    const { classes, placeholder, className, onImageClick } = this.props;
    const { active, editorState, hasText } = this.state;
    return (
      <div className={className}>{
        this.state.active ?
          <Active
            classes={classes}
            onToggle={this.onToggle}
            onBlur={this.onEditorBlur}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onEditorStateChange}
            onImageClick={onImageClick} /> :
          <Preview
            hasText={hasText}
            placeholder={placeholder}
            markup={() => getMarkup(editorState.getCurrentContent())}
            onClick={this.toggleHtml} />}
      </div>
    );
  }
}

const Preview = ({ onClick, hasText, markup, placeholder }) => {
  const html = hasText ? markup() : placeholder;
  return <div
    onClick={onClick}
    dangerouslySetInnerHTML={{ __html: html }}></div>;
};

const Active = ({ classes, onToggle, onBlur, editorState, handleKeyCommand, onChange, onImageClick }) => (
  <div className={classes.root}>
    <div className={classes.editor}>
      <Editor
        onBlur={onBlur}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange} />
    </div>
    <Toolbar
      onToggle={onToggle}
      onImageClick={onImageClick}
      editorState={editorState} />
  </div>
)

export default injectSheet(style)(EditableHTML);
