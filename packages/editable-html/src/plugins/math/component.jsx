import { Data, findDOMNode } from 'slate';
import { EditableMathInput, MathQuillInput, addBrackets, removeBrackets } from '@pie-libs/math-input';

import { Delete } from '../../components/buttons';
import MathWrapper from './input-wrapper';
import React from 'react';
import classNames from 'classnames';
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
      log('[onFocus]')
      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
    }

    this.onBlur = (event) => {
      log('[onBlur]')
      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    }

    this.onChange = (latex) => {
      log('[onChange]', latex);
      const { node, editor } = this.props;
      const { key } = node;
      const data = Data.create({ latex, editing: true });
      const change = editor.value.change().setNodeByKey(key, { data });
      editor.onChange(change);
    }

    this.onClick = (event) => {
      log('[onClick] preventDefault and stopPropagation');
      if (this.props.onClick) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onClick();
      }
    }

    this.onDeleteClick = (event) => {
      log('delete click');
      event.preventDefault();
      event.stopPropagation();

      const { node, editor } = this.props;

      const change = editor.value.change().moveNodeByKey(node.key);
      editor.onChange(change);
    }
  }

  componentDidUpdate() {
    const { node, editor } = this.props;
    const mathChange = node.data.get('change');
    this.wrapper.change(mathChange);

    const data = node.data.toObject();
    delete data.change;


    const change = editor.value.change().setNodeByKey(node.key, { data })
    editor.onChange(change);

  }

  shouldComponentUpdate(nextProps) {

    const { node: nextNode } = nextProps;
    const { node } = this.props;
    if (nextNode.data.equals(node.data)) {
      return false;
    }

    if (nextNode.data.get('change') === undefined && node.data.get('change') !== undefined) {
      return false;
    }
    return true;
  }

  onMathChange = (latex) => {
    log('[onMathChange]', latex);
    const { node, editor } = this.props;
    const data = Data.create({ latex });
    const change = editor.value.change().setNodeByKey(node.key, { data });
    editor.change(c => c.setNodeByKey(node.key, { data }));
  }

  render() {
    const { isSelected, node, state, classes, attributes } = this.props;
    log('[render] >> node', node.key, node.data);

    const latex = node.data.get('latex');
    const editing = isSelected; //|| node.data.get('editing');
    const names = classNames(classes.root, editing && classes.selected);

    const cleanLatex = removeBrackets(latex);

    return (
      <div className={names}>
        <MathWrapper
          ref={r => this.wrapper = r}
          latex={cleanLatex}
          editing={editing}
          onClick={this.onClick}
          onChange={this.onMathChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur} />
      </div>
    );
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