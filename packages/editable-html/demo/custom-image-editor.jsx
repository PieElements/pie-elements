import {
  AtomicBlockUtils,
  EditorState,
  convertFromRaw,
  convertToRaw
} from 'draft-js';
// eslint-disable-next-line import/no-unresolved
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import React, { Component } from 'react';
import { createStyleSheet, withStyles } from 'material-ui/styles';

// eslint-disable-next-line import/no-unresolved
import createAlignmentPlugin from 'draft-js-alignment-plugin';
// eslint-disable-next-line import/no-unresolved
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import createFocusPlugin from 'draft-js-focus-plugin';
// eslint-disable-next-line import/no-unresolved
import createImagePlugin from 'draft-js-image-plugin';
// eslint-disable-next-line import/no-unresolved
import createResizeablePlugin from 'draft-js-resizeable-plugin';

// import editorStyles from './editorStyles.css';
// import mockUpload from './mockUpload';

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

const imagePlugin = createImagePlugin({});

// const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
//   handleUpload: mockUpload,
//   addImage: imagePlugin.addImage,
// });

const plugins = [
  // dragNDropFileUploadPlugin,
  imagePlugin
];

/* eslint-disable */

const styles = createStyleSheet('CustomImageEditor', {
  editor: {
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    cursor: 'text',
    padding: '16px',
    borderRadius: '2px',
    marginBottom: '2em',
    boxShadow: 'inset 0px 1px 8px -3px #ABABAB',
    background: '#fefefe'
  },

  // .editor :global(.public-DraftEditor - content) {
  //   min - height: 140px;
  // }

  options: {
    marginBottom: '20px'
  }
});

export class CustomImageEditor extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   editorState: EditorState.createWithContent(convertFromRaw(initialState)),
    // };

    // this.onChange = (editorState) => {
    //   this.setState({
    //     editorState,
    //   });
    // };

    this.focus = () => {
      this.editor.focus();
    };

    this.addImage = () => {
      console.log('add image...');
      const url = 'https://s-media-cache-ak0.pinimg.com/736x/ed/0e/68/ed0e68d1f8a0a1f4b5582ed180cce761--puppy-training-tips-images-photos.jpg';
      // const newState = imagePlugin.addImage(this.props.editorState, url);

      const urlType = 'image';
      const contentState = this.props.editorState.getCurrentContent();
      // console.log('before: ', convertToRaw(contentState));
      const contentStateWithEntity = contentState.createEntity(
        urlType,
        'IMMUTABLE',
        { src: url });
      console.log('after: ', convertToRaw(contentStateWithEntity));

      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      console.log('entitykey: ', entityKey);
      const newEditorState = EditorState.set(
        this.props.editorState,
        { currentContent: contentStateWithEntity }
      );

      const out = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
      console.log('newState: ', out);
      this.props.onChange(out);
    }
  }

  render() {
    const { classes, editorState, onChange } = this.props;
    return (
      <div>
        <div className={classes.editor} onClick={this.focus}>
          <div onClick={this.addImage}>Add Image</div>
          <hr />
          <Editor
            editorState={editorState}
            plugins={plugins}
            onChange={onChange}
            ref={(element) => { this.editor = element; }}
          />
          {/* <AlignmentTool /> */}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CustomImageEditor);