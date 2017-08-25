import { Block, Editor, Html, Raw } from 'slate';
import ImagePlugin, { serialization as imageSerialization } from './plugins/image/index';
import MathPlugin, { inlineMath, serialization as mathSerialization } from './plugins/math/index';

import Image from './plugins/image/component';
import MarkHotkey from './plugins/mark-hot-key';
import React from 'react';
import Toolbar from './toolbar';
import debug from 'debug';
import injectSheet from 'react-jss';

const log = debug('editable-html:rte');

const DEFAULT_NODE = 'div'

const plugins = [
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: 'c', type: 'code', isAltKey: true }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: 'd', type: 'strikethrough' }),
  MarkHotkey({ key: 'u', type: 'underline' }),
  ImagePlugin(),
  MathPlugin()
];

const defaultBlock = {
  type: 'div',
  isVoid: false,
  data: {}
}

const schema = {
  nodes: {
    div: props => <div {...props.attributes}>{props.children}</div>,
    paragraph: props => <p {...props.attributes}>{props.children}</p>
  },
  rules: [
    // Rule to insert a paragraph block if the document is empty.
    {
      match: (node) => {
        return node.kind == 'document'
      },
      validate: (document) => {
        return document.nodes.size ? null : true
      },
      normalize: (transform, document) => {
        const block = Block.create(defaultBlock)
        transform.insertNodeByKey(document.key, 0, block)
      }
    },
    // Rule to insert a paragraph before a void node (the image) if that node is
    // the first one in the document.
    {
      match: (node) => {
        return node.kind == 'document'
      },
      validate: (document) => {
        const firstNode = document.nodes.first()
        return firstNode && firstNode.isVoid ? true : null
      },
      normalize: (transform, document) => {
        const block = Block.create(defaultBlock)
        transform.insertNodeByKey(document.key, 0, block)
      }
    },
    // Rule to insert a paragraph below a void node (the image) if that node is
    // the last one in the document.
    {
      match: (node) => {
        return node.kind == 'document'
      },
      validate: (document) => {
        const lastNode = document.nodes.last()
        return lastNode && lastNode.isVoid ? true : null
      },
      normalize: (transform, document) => {
        const block = Block.create(defaultBlock)
        transform.insertNodeByKey(document.key, document.nodes.size, block)
      }
    }
  ],
  marks: {
    bold: props => <strong>{props.children}</strong>,
    code: props => <code>{props.children}</code>,
    italic: props => <em>{props.children}</em>,
    strikethrough: props => <del>{props.children}</del>,
    underline: props => <u>{props.children}</u>,
  }
}

const MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underline',
  del: 'strikethrough',
  code: 'code'
}

const findTagForType = (t) => {
  const keys = Object.keys(MARK_TAGS);
  return keys.find(k => MARK_TAGS[k] === t);
}

const RULES = [
  {
    deserialize(el, next) {
      const name = el.tagName.toLowerCase();
      if (name === 'div') {
        return {
          kind: 'block',
          type: 'div',
          nodes: next(el.childNodes)
        }
      }
    },
    serialize(object, children) {
      if (object.kind === 'block' && object.type === 'div') {
        return <div>{children}</div>;
      }
    }
  },
  {
    deserialize(el, next) {
      const mark = MARK_TAGS[el.tagName.toLowerCase()]
      if (!mark) return
      return {
        kind: 'mark',
        type: mark,
        nodes: next(el.childNodes)
      }
    },
    serialize(object, children) {
      log('[serialize] object.type: ', object.type);

      if (object.kind === 'mark') {
        const tagName = findTagForType(object.type);
        if (tagName) {
          log('[serialize] tagName: ', tagName);
          return React.createElement(tagName, { children });
        }
      }
    }
  }
].concat(imageSerialization, mathSerialization);

/**
 * Create a new HTML serializer with `RULES`.
 *
 * @type {Html}
 */

const serializer = new Html({ rules: RULES });

/**
 * The rich text example.
 *
 * @type {Component}
 */

class RichText extends React.Component {


  constructor(props) {
    super(props);


    this.insertImage = (src) => {
      const { editorState, onChange } = this.props;
      const transform = editorState.transform()

      const update = transform
        .insertBlock({
          type: 'image',
          isVoid: true,
          data: { src }
        })
        .apply();

      onChange(update);
    }


    this.onToggleMark = (type) => {
      log('[onToggleMark] type: ', type);
      let { editorState } = this.props;

      editorState = editorState
        .transform()
        .toggleMark(type)
        .apply()

      this.props.onChange(editorState);
    }

    this.insertMath = () => {

      const { editorState } = this.props;

      const math = inlineMath();

      const newState = editorState
        .transform()
        .insertInline(math)
        .apply();

      this.props.onChange(newState);

    }
  }


  render() {
    const { classes, editorState, addImage, onDone, readOnly } = this.props;
    return (
      <div className={classes.root}>
        <Editor
          spellCheck
          placeholder={'Enter some rich text...'}
          schema={schema}
          plugins={plugins}
          readOnly={readOnly}
          state={this.props.editorState}
          onChange={this.props.onChange}
          onKeyDown={this.onKeyDown}
        />
        {!readOnly && <Toolbar
          editorState={editorState}
          onToggleMark={this.onToggleMark}
          onImageClick={() => addImage(this.insertImage)}
          onInsertMath={this.insertMath}
          onDone={onDone} />}
      </div>
    )
  }
}

export const htmlToState = html => serializer.deserialize(html)

export const stateToHtml = (state) => serializer.serialize(state);


const style = {
  root: {
    border: '1px solid #cccccc',
    borderRadius: '0px',
    cursor: 'text',
    '& [data-slate-editor="true"]': {
      overflow: 'scroll',
      maxHeight: '500px',
    }
  },
  editor: {
    padding: '8px',
    background: '#ffffff'
  }
}

export default injectSheet(style)(RichText);
