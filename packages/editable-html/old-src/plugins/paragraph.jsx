import React from 'react';

export const serialization = {
  deserialize(el, next) {
    if (el.tagName.toLowerCase() == 'p') {
      return {
        kind: 'block',
        type: 'paragraph',
        nodes: next(el.childNodes)
      }
    }
  },
  serialize(object, children) {
    if (object.kind == 'block' && object.type == 'paragraph') {
      return <p>{children}</p>
    }
  }
};

export default Plugin = (options) => {
  return {
    schema: {
      nodes: {
        paragraph: ({ attributes, children }) => <p {...attributes}>{children}</p>
      }
    }
  }
}