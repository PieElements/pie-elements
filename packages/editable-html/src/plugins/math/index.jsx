import { Inline } from 'slate';
import MathInput from './component';
import React from 'react';
import debug from 'debug';

const log = debug('plugins:math');


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

export const inlineMath = () => Inline.create({
  kind: 'inline',
  type: 'math',
  isVoid: true,
  data: {
    latex: '1 + 1 = 2'
  }
});


export const serialization = [
  {
    deserialize(el, next) {
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
