import { Block } from 'slate';
import React from 'react';

const defaultBlock = {
  type: 'div',
  isVoid: false,
  data: {}
}

export const serialization = {
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
}

export default Plugin = (options) => {

  return {
    renderNode: (props) => <div className="ha">{props.children}</div>


    //   div: props => <div {...props.attributes}>{props.children}</div>,
    // },
    // rules: [
    //   // Rule to insert a paragraph block if the document is empty.
    //   {
    //     match: (node) => {
    //       return node.kind == 'document'
    //     },
    //     validate: (document) => {
    //       return document.nodes.size ? null : true
    //     },
    //     normalize: (transform, document) => {
    //       const block = Block.create(defaultBlock)
    //       transform.insertNodeByKey(document.key, 0, block)
    //     }
    //   },
    //   // Rule to insert a paragraph before a void node (the image) if that node is
    //   // the first one in the document.
    //   {
    //     match: (node) => {
    //       return node.kind == 'document'
    //     },
    //     validate: (document) => {
    //       const firstNode = document.nodes.first()
    //       return firstNode && firstNode.isVoid ? true : null
    //     },
    //     normalize: (transform, document) => {
    //       const block = Block.create(defaultBlock)
    //       transform.insertNodeByKey(document.key, 0, block)
    //     }
    //   },
    //   // Rule to insert a paragraph below a void node (the image) if that node is
    //   // the last one in the document.
    //   {
    //     match: (node) => {
    //       return node.kind == 'document'
    //     },
    //     validate: (document) => {
    //       const lastNode = document.nodes.last()
    //       return lastNode && lastNode.isVoid ? true : null
    //     },
    //     normalize: (transform, document) => {
    //       const block = Block.create(defaultBlock)
    //       transform.insertNodeByKey(document.key, document.nodes.size, block)
    //     }
    //   }
    // ]
    // }
  }
}