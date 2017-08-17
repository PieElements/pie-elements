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

class ImgDemoEditor extends React.Component {

  constructor(props) {
    super(props);
    this.mediaBlockRenderer = this.mediaBlockRenderer.bind(this);
  }

  componentDidMount() {
    this.editor.focus();
  }


  mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
      console.log('got atomic block: ', block);
      return {
        component: Image,
        editable: false,
        props: {
          onDelete: this.onDeleteBlock
        }
      };
    }
    return null;
  }

  render() {
    return <Editor
      editorState={this.props.editorState}
      blockRendererFn={this.mediaBlockRenderer}
      placeholder="Enter some text..."
      onChange={this.props.onChange}
      ref={r => this.editor = r} />
  }
}

export const Image = (props) => {
  const { block, contentState } = props;
  const e = block.getEntityAt(0);
  const entity = contentState.getEntity(e);
  const data = entity.getData();
  const {
    height,
    src,
    width,
  } = data;

  return <img src={src} height={height} width={width} />;
};

export const CustomContentStateConverter = (contentState) => {
  // Correctly assign properties to images and links
  const newBlockMap = contentState.getBlockMap().map(block => {
    const entityKey = block.getEntityAt(0);
    if (entityKey !== null) {
      const entityBlock = contentState.getEntity(entityKey);
      const entityType = entityBlock.getType();
      switch (entityType) {
        case 'IMAGE': {
          const newBlock = block.merge({
            type: 'atomic',
            text: '',
          });
          return newBlock;
        }
        default:
          return block;
      }
    }
    return block;
  });
  const newContentState = contentState.set('blockMap', newBlockMap);

  return newContentState;
};

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