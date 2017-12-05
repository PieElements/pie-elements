import { Keypad, MathQuillInput, addBrackets, removeBrackets } from '@pie-libs/math-input';

import { Data } from 'slate';
import React from 'react';
import debug from 'debug';

const log = debug('editable-html:plugins:math:math-toolbar');

const toNodeData = (data) => {

  if (!data) {
    return;
  }

  const { type, value } = data;

  if (type === 'command' || type === 'cursor') {
    return data;
  } else if (value === 'clear') {
    return { type: 'clear' }
  } else {
    return { type: 'write', value }
  }
}

export default class MathToolbar extends React.Component {

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

  onClick = (data) => {
    const { node, value, onChange } = this.props;

    /**
     * somehow get access to an api where one can call the 
     * edit commands directly and step out of the change/render cycle.
     * 
     */
    const mathChange = toNodeData(data);

    if (mathChange) {
      const update = { ...node.data.toObject(), change: mathChange }

      log('[send change to node: ', node.key, update);
      const change = value.change().setNodeByKey(node.key,
        { data: update });
      onChange(change);
    }
  }

  onDone = () => {
    const { node, onChange, value } = this.props;

    const data = Data.create({ ...node.data.toObject(), latex: addBrackets(this.state.latex) });

    const change = value.change().setNodeByKey(node.key, { data });
    onChange(change);

  }

  render() {

    const { latex } = this.state;
    const processedLatex = removeBrackets(latex);
    return (
      <Keypad
        latex={processedLatex}
        onChange={this.onLatexChange}
        onClick={this.onClick} />
    );
  }
}

