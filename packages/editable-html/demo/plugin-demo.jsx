import * as Immutable from 'immutable';

import {
  AtomicBlockUtils,
  CompositeDecorator,
  ContentState,
  DefaultDraftBlockRenderMap,
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  SelectionState,
  convertFromHTML,
  convertToRaw,
  getS
} from 'draft-js';

import React from 'react';

class PluginDemoEditor extends React.Component {

  constructor(props) {
    super(props);
  }




  render() {
    return <Editor
      editorState={this.props.editorState}
      onChange={this.props.onChange}
      ref={r => this.editor = r} />
  }
}


ImgDemoEditor.fromHtml = (markup) => {
  const blocksFromHTML = convertFromHTML(markup);

  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  const updated = CustomContentStateConverter(state);
  const decorator = new CompositeDecorator([]);

  return EditorState.createWithContent(updated, decorator);
}

const puppy = 'https://s-media-cache-ak0.pinimg.com/736x/ed/0e/68/ed0e68d1f8a0a1f4b5582ed180cce761--puppy-training-tips-images-photos.jpg';

export default class ImgDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: ImgDemoEditor.fromHtml(`<div>hi </div><img src="${puppy}"></img>`)
    }

    this.onChange = (editorState) => this.setState({ editorState });
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };
  }

  render() {
    return <div>
      <h1>ImgDemo</h1>
      <ImgDemoEditor
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
      <hr />
      <div type="button" onClick={this.logState}>Log State</div>
    </div>;
  }
}