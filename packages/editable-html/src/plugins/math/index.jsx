import { Keypad, MathQuillInput, addBrackets, removeBrackets } from '@pie-libs/math-input';

import { Data } from 'slate';
import Functions from 'material-ui-icons/Functions';
import { Inline } from 'slate';
import MathInput from './component';
import React from 'react';
import debug from 'debug';

const log = debug('editable-html:plugins:math');

const TEXT_NODE = 3;

export class MathToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latex: props.node.data.get('latex')
    }
  }

  componentWillReceiveProps(props) {
    if (props.node.data.get('latex') !== this.state.latex) {
      this.setState({ latex: props.node.data.get('latex') });

    }
  }

  onLatexChange = (rawLatex) => {
    log('[onLatexChange] !!', value);
    const { onChange, node, value } = this.props;
    const latex = addBrackets(rawLatex);
    this.setState({ latex });
  }
  //   const data = Data.create({ latex });
  //   const change = value.change().setNodeByKey(key, { data });
  //   onChange(change);
  // }

  onClick = (data) => {
    const { type, value } = data;
    if (value === 'clear') {
      this.onLatexChange('');
    } else if (type === 'command') {
      this.mq.command(data.value);
    } else if (type === 'cursor') {
      this.mq.keystroke(data.value);
    } else {
      this.mq.write(data.value);
    }
  }

  // onChange() {}

  render() {

    const { latex } = this.state;
    const processedLatex = removeBrackets(latex);
    return (
      <div>
        <MathQuillInput
          latex={processedLatex}
          readOnly={false}
          innerRef={r => this.mq = r}
          onChange={this.onLatexChange}
        />
        <hr />
        <Keypad
          latex={processedLatex}
          onChange={this.onLatexChange}
          onClick={this.onClick} />
      </div>
    );
  }
}

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
    onFocus: (event, change, editor) => {
      log('[onFocus]', event, change, editor);
    },
    renderNode: props => {
      if (props.node.type === 'math') {
        log('[renderNode]: ', props);
        log('[renderNode]: isFocused?', props.editor.value.isFocused);
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

