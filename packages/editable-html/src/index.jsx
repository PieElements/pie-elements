import { Editor, findNode } from 'slate-react';
import { htmlToValue, valueToHtml } from './serialization';

import Image from './plugins/image';
import PropTypes from 'prop-types';
import React from 'react';
import { Value } from 'slate';
import { buildPlugins } from './plugins';
import debug from 'debug';
import { getHashes } from 'crypto';

export { htmlToValue, valueToHtml }


const log = debug('editable-html');

export default class EditableHtml extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: htmlToValue(props.markup)
    }


    this.plugins = buildPlugins({
      selection: {},
      math: {
        onClick: this.onMathClick,
        onFocus: this.onPluginFocus,
        onBlur: this.onPluginBlur
      },
      image: {
        onDelete: this.props.imageSupport && this.props.imageSupport.delete,
        insertImageRequested: this.props.imageSupport && ((getHandler) => {
          const handler = getHandler(() => this.state.value);
          this.props.imageSupport.add(handler);
        })
        // onFocus: this.onPluginFocus,
        // onBlur: this.onPluginBlur,
      },
      toolbar: {
        /**
         * To minimize converting html -> state -> html
         * We only emit markup once 'done' is clicked.
         */
        onDone: () => {
          log('[onDone]');
          this.setState({ toolbarInFocus: false });
          this.editor.blur();
          this.onEditingDone();
        }
      }
    });

  }

  onPluginBlur = (e) => {
    log('[onPluginBlur]', e.relatedTarget);
    const target = e.relatedTarget;
    if (target) {
      const node = findNode(target, this.state.value);
      log('[onPluginBlur] node: ', node);
      this.setState({ focusedNode: node });
    } else {
      this.setState({ focusedNode: null });
    }

    this.resetValue();

    // if (this.props.onBlur) {
    //   this.props.onBlur(e);
    // }
  }

  onPluginFocus = (e) => {
    log('[onPluginFocus]', e.target);
    const target = e.target;
    if (target) {
      const node = findNode(target, this.state.value);
      log('[onPluginFocus] node: ', node);

      // const stashedValue = this.state.stashedValue || this.state.value;
      this.setState({ focusedNode: node, stashedValue });
    } else {
      this.setState({ focusedNode: null });
    }
    this.stashValue();
  }

  onMathClick = (node) => {
    this.editor.change(c =>
      c.collapseToStartOf(node)//.focus()
    );
    this.setState({ selectedNode: node });
  }

  onEditingDone = () => {
    log('[onEditingDone]');
    const html = valueToHtml(this.state.value);
    this.props.onChange(html);
  }

  onBlur = (event) => {
    log('[onBlur]');
    const target = event.relatedTarget;
    if (target) {
      const node = findNode(target, this.state.value);
      log('[onBlur] node: ', node);
      this.setState({ focusedNode: node });
    } else {
      this.setState({ focusedNode: null });
    }

    this.resetValue();
  }

  onFocus = () => {
    log('[onFocus]', document.activeElement);
    this.stashValue();
    // this.setState({ pendingBlur: false });
  }

  stashValue = () => {
    log('[stashValue]');
    if (!this.state.stashedValue) {
      this.setState({ stashedValue: this.state.value });
    }
  }

  resetValue = () => {
    log('[resetValue]');
    if (this.state.stashedValue && (!this.state.value.isFocused || !this.state.focusedNode)) {
      log('[resetValue] resetting...');
      log('stashed', this.state.stashedValue.document.toObject())
      log('current', this.state.value.document.toObject())

      const newValue = Value.fromJSON(this.state.stashedValue.toJSON());

      log('newValue: ', newValue.document);

      this.setState({ value: newValue, stashedValue: null }, () => {
        log('value now: ', this.state.value.document.toJSON());
      });
    }
  }

  onChange = (change) => {
    log('[onChange]') /// value: ', change.value);
    this.setState({ value: change.value });
  }

  componentWillReceiveProps(props) {
    if (props.markup !== this.props.markup) {
      this.setState({
        focus: false,
        value: htmlToValue(props.markup)
      });
    }
  }

  onRootFocus = () => {
    log('[onRootFocus]');
    // this.setState({ showToolbar: true });
  }

  onRootBlur = () => {
    log('[onRootBlur]');
    // this.setState({ showToolbar: false });
  }

  render() {
    const { value, showToolbar, focusedNode } = this.state;
    log('[render]', value.document.toJSON());//, value);
    // log('[render] selectedNode:', selectedNode);
    return <div>
      <Editor
        ref={r => this.editor = r}
        value={value}
        onChange={this.onChange}
        plugins={this.plugins}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        focusedNode={focusedNode} />
    </div>
  }
}

EditableHtml.propTypes = {
  markup: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}