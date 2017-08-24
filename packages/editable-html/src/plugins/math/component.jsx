import { Data, findDOMNode } from 'slate';

import MathInput from '@pie-libs/math-input';
import React from 'react';
import debug from 'debug';
import injectSheet from 'react-jss';

const log = debug('plugins:math:component');

export class MathComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disableBlur: false
    }

    this.onChange = (latex) => {
      const { node, editor } = this.props;
      const { key } = node;
      const data = Data.create({ latex });
      const newState = this.props.editor.getState().transform()
        .setNodeByKey(key, { data })
        .apply();
      editor.onChange(newState);
    }

    this.onClick = (event) => {
      log('--------> onClick');
      event.preventDefault();
      event.stopPropagation();
    }
  }

  render() {
    const { node, state, editor, classes, attributes } = this.props;
    const latex = node.data.get('latex');
    return <MathInput
      innerRef={r => this.mathInput = r}
      latex={latex}
      onLatexChange={this.onChange}
      onBlur={this.onBlur}
      onFocus={this.onFocus}
      onInputClick={this.onClick} />;
  }
}

const styles = {

};

export default injectSheet(styles)(MathComponent);