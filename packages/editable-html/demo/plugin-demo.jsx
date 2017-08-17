import * as Immutable from 'immutable';

import {
  AtomicBlockUtils,
  BlockMapBuilder,
  CompositeDecorator,
  ContentState,
  DefaultDraftBlockRenderMap,
  EditorState,
  Entity,
  Modifier,
  RichUtils,
  SelectionState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw
} from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import React, { Component } from 'react';

import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
// import createDragNDropUploadPlugin from 'draft-js-drag-n-drop-upload-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';

// import editorStyles from './editorStyles.css';

// import mockUpload from './mockUpload';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator });

// const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
//   handleUpload: mockUpload,
//   addImage: imagePlugin.addImage,
// });

const plugins = [
  // dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin
];
/*
const initialState = {
    "entityMap": {
        "0": {
            "type": "image",
            "mutability": "IMMUTABLE",
            "data": {
                "src": "/images/canada-landscape-small.jpg"
            }
        }
    },
    "blocks": [{
        "key": "9gm3s",
        "text": "You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
    }, {
        "key": "ov7r",
        "text": " ",
        "type": "atomic",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [{
            "offset": 0,
            "length": 1,
            "key": 0
        }],
        "data": {}
    }, {
        "key": "e23a8",
        "text": "See advanced examples further down …",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
    }]
};
*/


export const CustomContentStateConverter = (contentState) => {
  // Correctly assign properties to images and links
  const keysAndBlocks = contentState.getBlockMap().reduce((acc, block) => {
    const entityKey = block.getEntityAt(0);
    if (entityKey !== null) {

      console.log('>> found entityKey!', entityKey);

      const entityBlock = contentState.getEntity(entityKey);
      const entityType = entityBlock.getType();
      console.log('>> found entityType:', entityType);
      switch (entityType) {
        case 'IMAGE': {
          const newBlock = block.merge({
            type: 'atomic',
            text: ' ',
          });
          console.log('newBlock: ', newBlock, newBlock.getType());
          acc.blockMap.push(newBlock);
          const newEntity = Entity.create('image', 'IMMUTABLE', {
            src: entityBlock.getData().src
          });
          console.log('set key: ', entityKey, newEntity);
          acc.entities = acc.entities.set(entityKey, newEntity);
          console.log('>> ', acc.entities)
        }
        default:
          acc.blockMap.push(block);
      }
    }
    return acc;
  }, { blockMap: [], entities: new Immutable.Map({}) });

  console.log(keysAndBlocks);
  const blockMap = BlockMapBuilder.createFromArray(keysAndBlocks.blockMap);
  const newContentState: ContentState = contentState
    .set('blockMap', blockMap)
    .set('entityMap', keysAndBlocks.entities);

  console.log('finalState: ', convertToRaw(newContentState));

  console.log(newContentState.getBlockMap().first())

  return newContentState;
};
// export default class CustomImageEditor extends Component {

//   state = {
//     editorState: EditorState.createWithContent(convertFromRaw(initialState)),
//   };

//   onChange = (editorState) => {
//     this.setState({
//       editorState,
//     });
//   };

//   focus = () => {
//     this.editor.focus();
//   };

//   render() {
//     return (
//       <div>
//         <div className={editorStyles.editor} onClick={this.focus}>
//           <Editor
//             editorState={this.state.editorState}
//             onChange={this.onChange}
//             plugins={plugins}
//             ref={(element) => { this.editor = element; }}
//           />
//           <AlignmentTool />
//         </div>
//       </div>
//     );
//   }
// }


class PluginDemoEditor extends React.Component {

  constructor(props) {
    super(props);
  }

  focus() {
    this.editor.focus();
  }

  render() {
    return <div>
      <Editor
        editorState={this.props.editorState}
        onChange={this.props.onChange}
        plugins={plugins}
        ref={(element) => { this.editor = element; }}
        ref={r => this.editor = r} />
      <AlignmentTool />
    </div>
  }
}


PluginDemoEditor.fromHtml = (markup) => {
  // const blocksFromHTML = convertFromHTML(markup);

  // const state = ContentState.createFromBlockArray(
  //   blocksFromHTML.contentBlocks,
  //   blocksFromHTML.entityMap
  // );

  // const updated = CustomContentStateConverter(state);
  // const decorator = new CompositeDecorator([]);

  const raw = {
    entityMap: {
      "0": {
        "type": "image",
        "mutability": "IMMUTABLE",
        "data": {
          "src": puppy
        }
      }
    },
    blocks: [
      {
        "key": "e23a8",
        "text": "hi ",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "ov7r",
        "text": " ",
        "type": "atomic",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [{
          "offset": 0,
          "length": 1,
          "key": 0
        }],
        "data": {}
      }
    ]
  }

  const updated = convertFromRaw(raw);

  return EditorState.createWithContent(updated);
}

const puppy = 'https://s-media-cache-ak0.pinimg.com/736x/ed/0e/68/ed0e68d1f8a0a1f4b5582ed180cce761--puppy-training-tips-images-photos.jpg';

export default class ImgDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: PluginDemoEditor.fromHtml(`<div>hi </div><img src="${puppy}"></img>`)
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
      <PluginDemoEditor
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
      <hr />
      <div type="button" onClick={this.logState}>Log State</div>
    </div>;
  }
}