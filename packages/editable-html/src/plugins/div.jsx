import React from 'react';
import debug from 'debug';

const log = debug('editable-html:div');

export const serialization = {
  deserialize(el, next) {
    const name = el.tagName.toLowerCase();
    log('deserialize: ', name);
    if (name === 'div') {
      return {
        kind: 'block',
        type: 'div',
        nodes: next(el.childNodes)
      }
    }
  },
  serialize(object, children) {
    log('serialize object: ', object);
    if (object.kind === 'block' && object.type === 'div') {
      return <div>{children}</div>;
    }
  }
}
