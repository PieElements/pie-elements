import { Block, Editor, Html, Raw } from 'slate';

import React from 'react';
import initialState from './state.json'

/**
 * Define the default node type.
 */

const DEFAULT_NODE = 'paragraph'


/**
 * Define a schema.
 *
 * @type {Object}
 */

const Image = (props) => {
  const { node, state, editor } = props;
  const active = state.isFocused && state.selection.hasEdgeIn(node)
  const src = node.data.get('src')
  const className = active ? 'active' : null

  const onDelete = () => {
    console.log('onDelete? ', props);

    const updatedState = state.transform()
      .removeNodeByKey(node.key)
      .apply();

    editor.onChange(updatedState);
    // console.log('updatedState: ', Raw.serialize(updatedState));
  }
  return <div>
    <img
      src={src}
      className={className}
      {...props.attributes} />
    {active && <div onClick={onDelete}>delete me</div>}
  </div>
}

const defaultBlock = {
  type: 'paragraph',
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
      const mark = MARK_TAGS[el.tagName.toLowerCase()]
      if (!mark) return
      return {
        kind: 'mark',
        type: mark,
        nodes: next(el.childNodes)
      }
    }
  },
  {
    deserialize(el, next) {
      const name = el.tagName.toLowerCase();
      if (name === 'img') {
        return {
          kind: 'block',
          type: 'image',
          isVoid: true,
          data: {
            src: el.getAttribute('src')
          }
        }
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


  insertImage = (src) => {
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


  hasMark = (type) => {
    const { editorState } = this.props;
    return editorState.marks.some(mark => mark.type == type)
  }

  hasBlock = (type) => {
    const { editorState } = this.props;
    return editorState.blocks.some(node => node.type == type)
  }


  onKeyDown = (e, data, state) => {
    if (!data.isMod) return
    let mark

    switch (data.key) {
      case 'b':
        mark = 'b'
        break
      default:
        return
    }

    state = state
      .transform()
      .toggleMark(mark)
      .apply()

    e.preventDefault()
    return state
  }

  onClickMark = (e, type) => {
    e.preventDefault()
    let { editorState } = this.props;

    editorState = editorState
      .transform()
      .toggleMark(type)
      .apply()

    this.props.onChange(editorState);
  }

  render() {
    return (
      <div>
        {this.renderToolbar()}
        {this.renderEditor()}
      </div>
    )
  }

  renderToolbar = () => {
    return (
      <div className="menu toolbar-menu">
        {this.renderMarkButton('b', 'format_bold')}
        <div onClick={() => this.props.addImage(this.insertImage)}>Add Image</div>
      </div>
    )
  }

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)
    const onMouseDown = e => this.onClickMark(e, type)

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }

  renderBlockButton = (type, icon) => {
    const isActive = this.hasBlock(type)
    const onMouseDown = e => this.onClickBlock(e, type)

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }

  renderEditor = () => {
    return (
      <div className="editor">
        <Editor
          spellCheck
          placeholder={'Enter some rich text...'}
          schema={schema}
          state={this.props.editorState}
          onChange={this.props.onChange}
          onKeyDown={this.onKeyDown}
        />
      </div>
    )
  }
}

export const htmlToState = html => serializer.deserialize(html)

export const stateToHtml = (html) => {
  return '';
}

/**
 * Export.
 */

export default RichText
