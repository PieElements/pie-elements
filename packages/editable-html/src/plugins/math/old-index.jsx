import Functions from 'material-ui-icons/Functions';
import { Inline } from 'slate';
import MathInput from './component';
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
      }
    },
    schema: {
      document: { types: ['math'] }
    },
    renderNode: props => {
      log('[renderNode] props: ', props);
      log('[renderNode] type : ', props.node.type);
      if (props.node.type === 'math') {
        log('[renderNode]: ', props);
        return <MathInput
          {...props}
          onFocus={options.onFocus}
          onBlur={options.onBlur} />
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

