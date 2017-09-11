import { Data, findDOMNode } from 'slate';

import { Delete } from '../../components/buttons';
import MathInput from '@pie-libs/math-input';
import React from 'react';
import debug from 'debug';
import injectSheet from 'react-jss';

const log = debug('editable-html:plugins:math:component');

export class MathComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disableBlur: false
    }

    this.onFocus = (event) => {
      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
    }

    this.onBlur = (event) => {
      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    }

    this.onChange = (latex) => {
      log('[onChange]', latex);
      const { node, editor } = this.props;
      const { key } = node;
      const data = Data.create({ latex });
      const change = this.props.editor.getState().change()
        .setNodeByKey(key, { data });
      editor.onChange(change);
    }

    this.onClick = (event) => {
      log('--------> onClick, preventDefault and stopPropagation');
      event.preventDefault();
      event.stopPropagation();
    }

    this.onDeleteClick = (event) => {
      log('delete click');
      event.preventDefault();
      event.stopPropagation();

      const { node, editor } = this.props;

      const change = editor.getState()
        .change()
        .removeNodeByKey(node.key);
      editor.onChange(change);
    }
  }

  render() {
    const { node, state, editor, classes, attributes } = this.props;
    const latex = node.data.get('latex');
    const readOnly = editor.props.readOnly === true;
    log('[render] readOnly: ', readOnly);
    return <div className={classes.root}>
      <MathInput
        innerRef={r => this.mathInput = r}
        latex={latex}
        onLatexChange={this.onChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onInputClick={this.onClick}
        readOnly={readOnly}
        zIndex={11} />
      {!readOnly && <Delete onClick={this.onDeleteClick} />}
    </div>;

  }
}

const styles = {
  root: {
    display: 'inline-flex',
    alignItems: 'center'
  }
};

export default injectSheet(styles)(MathComponent);