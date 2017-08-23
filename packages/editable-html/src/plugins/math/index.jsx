import MathInput from './component';
import React from 'react';

const TEXT_NODE = 3;

export default function MathPlugin(options) {
  return {
    schema: {
      nodes: {
        math: MathInput
      }
    }
  }
}

export const serialization = [
  {
    deserialize(el, next) {
      console.log(el, el.nodeType);
      if (el.nodeType === TEXT_NODE) {
        return;
      }

      const tagName = el.tagName.toLowerCase();
      const hasMathJaxAttribute = el.getAttribute('mathjax') !== undefined;

      if (tagName === 'span' && hasMathJaxAttribute) {
        return {
          kind: 'inline',
          type: 'math',
          isVoid: true,
          data: {
            latex: el.innerHTML
          }
        }
      }
    },
    serialize(object, children) {
      if (object.type === 'math') {
        return <span mathjax="">{object.data.latex}</span>;
      }
    }
  }
];
