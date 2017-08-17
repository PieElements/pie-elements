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

export class MyCustomBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='MyCustomBlock'>
        !!
        {/* here, this.props.children contains a <section> container, as that was the matching element */}
        {this.props.children}
      </div>
    );
  }
}

const blockRenderMap = Immutable.Map({
  'MyCustomBlock': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'img',
    wrapper: MyCustomBlock,
  }
});

// keep support for other draft default block types and add our myCustomBlock type
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);


class ImgDemoEditor extends React.Component {

  componentDidMount() {
    this.editor.focus();
  }

  render() {
    return <Editor

      editorState={this.props.editorState}
      blockRenderMap={extendedBlockRenderMap}
      placeholder="Enter some text..."
      onChange={this.props.onChange}
      ref={r => this.editor = r}
      der
    />
  }
}

function findImageEntities(contentBlock, callback, contentState) {
  console.log('contentBlock: ', contentBlock);
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'IMAGE'
      );
    },
    callback
  );
}

export const Image = (props) => {
  const {
    height,
    src,
    width,
  } = props.contentState.getEntity(props.entityKey).getData();

  return (
    <img src={src} height={height} width={width} />
  );
};
function getSafeBodyFromHTML(html) {
  var doc;
  var root = null;
  // Provides a safe context
  if (
    document.implementation &&
    document.implementation.createHTMLDocument
  ) {
    doc = document.implementation.createHTMLDocument('foo');
    doc.documentElement.innerHTML = html;
    root = doc.getElementsByTagName('body')[0];
  }
  return root;
}

ImgDemoEditor.fromHtml = (markup) => {
  const blocksFromHTML = convertFromHTML(markup, getSafeBodyFromHTML, extendedBlockRenderMap);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const decorator = new CompositeDecorator([]);
  //   { strategy: findImageEntities, component: Image }
  // ]);

  return EditorState.createWithContent(state, decorator);
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