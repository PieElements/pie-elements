import { Keypad, MathQuillInput, addBrackets, removeBrackets } from '@pie-libs/math-input';

import { Data } from 'slate';
import Functions from 'material-ui-icons/Functions';
import { Inline } from 'slate';
import MathInput from './component';
import MathToolbar from './math-toolbar';
import React from 'react';
import debug from 'debug';

const log = debug('editable-html:plugins:math');

const TEXT_NODE = 3;

export default function MathPlugin(options) {
  return {
    toolbar: {
      icon: <Functions />,
      onClick: (value, onChange) => {
        log('[insertMath]');
        const math = inlineMath();
        const change = value.change().insertInline(math);
        onChange(change);
      },
      customToolbar: node => (node && node.kind === 'inline' && node.type === 'math') && MathToolbar
    },
    schema: {
      document: { types: ['math'] }
    },
    onBlur: () => {
      log('[onBlur]');
    },
    onFocus: () => {
      log('[onFocus]');
    },
    onSelect: () => {
      log('[onSelect]');
    },
    renderNode: props => {
      if (props.node.type === 'math') {
        log('[renderNode]: ');//, props);
        return <MathInput {...props}
          onClick={() => options.onClick(props.node)}
          onFocus={options.onFocus}
          onBlur={options.onBlur}
        />
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


export const serialization = {
  deserialize(el, next) {
    if (el.nodeType === TEXT_NODE) {
      return;
    }

    const tagName = el.tagName.toLowerCase();
    log('[deserialize] name: ', tagName)
    const hasMathJaxAttribute = el.getAttribute('mathjax') !== undefined || el.getAttribute('data-mathjax') !== undefined;

    log('[deserialize] hasMathJaxAttribute: ', hasMathJaxAttribute);
    if (tagName === 'span' && hasMathJaxAttribute) {
      return {
        kind: 'inline',
        type: 'math',
        isVoid: true,
        nodes: [],
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
};

