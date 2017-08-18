import { Block, Editor, Html, Raw } from 'slate';

import Image from './components/image';
import React from 'react';
import Toolbar from './toolbar';
import injectSheet from 'react-jss';

const DEFAULT_NODE = 'div'


const defaultBlock = {
  type: 'div',
  isVoid: false,
  data: {}
}

const schema = {
  // nodes: {
  //   'block-quote': props => <blockquote {...props.attributes}>{props.children}</blockquote>,
  //   'bulleted-list': props => <ul {...props.attributes}>{props.children}</ul>,
  //   'heading-one': props => <h1 {...props.attributes}>{props.children}</h1>,
  //   'heading-two': props => <h2 {...props.attributes}>{props.children}</h2>,
  //   'list-item': props => <li {...props.attributes}>{props.children}</li>,
  //   'numbered-list': props => <ol {...props.attributes}>{props.children}</ol>,
  // },
  nodes: {
    image: Image,
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
    b: {
      fontWeight: 'bold'
    } //,
    //   code: {
    //     fontFamily: 'monospace',
    //     backgroundColor: '#eee',
    //     padding: '3px',
    //     borderRadius: '4px'
    //   },
    //   italic: {
    //     fontStyle: 'italic'
    //   },
    //   underlined: {
    //     textDecoration: 'underline'
    //   }
    // }
  }
}

const MARK_TAGS = {
  b: 'b'
}

/**
 * Serializer rules.
 *
 * @type {Array}
 */

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
      if (object.kind === 'mark' && MARK_TAGS[object.type]) {
        return React.createElement(object.type, { children });
      }
    }
  },
  {
    deserialize(el, next) {
      const name = el.tagName.toLowerCase();
      const style = el.style || { width: '', height: '' };
      const width = parseInt(style.width.replace('px', ''), 10) || null;
      const height = parseInt(style.height.replace('px', ''), 10) || null;
      if (name === 'img') {
        return {
          kind: 'inline',
          type: 'image',
          isVoid: true,
          data: {
            src: el.getAttribute('src'),
            width, height
          }
        }
      }
    },
    serialize(object, children) {
      if (object.type === 'image') {
        const { data } = object;
        const src = data.get('src');
        const width = data.get('width');
        const height = data.get('height');
        const style = {};
        if (width) {
          style.width = `${width}px`;
        }

        if (height) {
          style.height = `${height}px`;
        }

        const props = {
          src,
          style
        }

        return <img {...props}></img>;
      }
    }
  }
]

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
    this.insertImage = this.insertImage.bind(this);
    this.onToggleMark = this.onToggleMark.bind(this);
  }

  insertImage(src) {
    const { editorState, onChange } = this.props;
    const transform = editorState.transform()

    // if (target) transform.select(target)

    const update = transform
      .insertBlock({
        type: 'image',
        isVoid: true,
        data: { src }
      })
      .apply();

    onChange(update);
  }


  // onKeyDown = (e, data, state) => {
  //   if (!data.isMod) return
  //   let mark

  //   switch (data.key) {
  //     case 'b':
  //       mark = 'b'
  //       break
  //     default:
  //       return
  //   }

  //   state = state
  //     .transform()
  //     .toggleMark(mark)
  //     .apply()

  //   e.preventDefault()
  //   return state
  // }

  onToggleMark = (type) => {
    let { editorState } = this.props;

    editorState = editorState
      .transform()
      .toggleMark(type)
      .apply()

    this.props.onChange(editorState);
  }


  render() {
    const { classes, editorState, addImage, onDone } = this.props;
    return (
      <div className={classes.root}>
        <Editor
          spellCheck
          placeholder={'Enter some rich text...'}
          schema={schema}
          state={this.props.editorState}
          onChange={this.props.onChange}
          onKeyDown={this.onKeyDown}
        />
        <Toolbar
          editorState={editorState}
          onToggleMark={this.onToggleMark}
          onImageClick={() => addImage(this.insertImage)}
          onDone={onDone} />
      </div>
    )
  }

  // renderToolbar = () => {
  //   return (
  //     <div className="menu toolbar-menu">
  //       {this.renderMarkButton('b', 'format_bold')}
  //       <div onClick={() => this.props.addImage(this.insertImage)}>Add Image</div>
  //     </div>
  //   )
  // }

  // renderMarkButton = (type, icon) => {
  //   const isActive = this.hasMark(type)
  //   const onMouseDown = e => this.onClickMark(e, type)

  //   return (
  //     <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
  //       <span className="material-icons">{icon}</span>
  //     </span>
  //   )
  // }

  // renderBlockButton = (type, icon) => {
  //   const isActive = this.hasBlock(type)
  //   const onMouseDown = e => this.onClickBlock(e, type)

  //   return (
  //     <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
  //       <span className="material-icons">{icon}</span>
  //     </span>
  //   )
  // }

}

export const htmlToState = html => serializer.deserialize(html)

export const stateToHtml = (state) => {
  return serializer.serialize(state);
}


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
