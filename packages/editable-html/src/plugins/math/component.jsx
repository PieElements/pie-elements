import { Data, findDOMNode } from 'slate';
import { MathQuillInput, addBrackets, removeBrackets } from '@pie-libs/math-input';

import { Delete } from '../../components/buttons';
import React from 'react';
import classNames from 'classnames';
import debug from 'debug';
import injectSheet from 'react-jss';

const log = debug('editable-html:plugins:math');

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
      const change = editor.value.change().setNodeByKey(key, { data });
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

      const change = editor.value.change().removeNodeByKey(node.key);
      editor.onChange(change);
    }
  }

  render() {
    log('[render] >> node')
    const { isSelected, node, state, classes, attributes } = this.props;
    const latex = node.data.get('latex');

    const names = classNames(classes.root, isSelected && classes.selected);

    const cleanLatex = removeBrackets(latex);

    // <MathInput
    //   innerRef={r => this.mathInput = r}
    //   latex={latex}
    //   onLatexChange={this.onChange}
    //   onBlur={this.onBlur}
    //   onFocus={this.onFocus}
    //   onInputClick={this.onClick}
    //   readOnly={readOnly}
    //   zIndex={11} />
    // {!readOnly && <Delete onClick={this.onDeleteClick} />}
    return <div className={names}>
      <MathQuillInput
        latex={cleanLatex}
        readOnly={true}
      />
    </div>;

  }
}

const styles = {
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    border: 'solid 1px lightgrey'
  },
  selected: {
    border: 'solid 1px red'
  }
};

export default injectSheet(styles)(MathComponent);