import MathInput from './component';
import React from 'react';

const TEXT_NODE = 3;

export default function MathPlugin(options) {
  return {
    schema: {
      nodes: {
        math: MathInput
      }
    },
    onBeforeInput: (event, data, state, editor) => {
      //skip the core plugin's onBeforeInput handling.
      console.log(event.target);
      return undefined;
    }
    // onKeyDown: (event, data, state, editor) => {
    //   console.log('onKeyDown: ', event);
    //   event.preventDefault();
    //   event.stopPropagation();
    //   return state;
    // }
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
      const hasMathJaxAttribute = el.getAttribute('mathjax') !== undefined || el.getAttribute('data-mathjax') !== undefined;

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
        return <span data-mathjax="">{object.data.get('latex')}</span>;
      }
    }
  }
];
