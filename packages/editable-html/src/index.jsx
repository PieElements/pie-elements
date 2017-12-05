import { htmlToValue, valueToHtml } from './serialization';

import { Editor } from 'slate-react';
import Image from './plugins/image';
import PropTypes from 'prop-types';
import React from 'react';
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
        onFocus: this.onPluginFocus,
        onBlur: this.onPluginBlur,
        onSelected: this.onMathSelected
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
        onDone: () => {
          this.setState({ toolbarInFocus: false });
          this.editor.blur();
          this.onEditingDone();
        }
      }
    });

  }

  onMathSelected = (node) => {
    this.editor.change(c => c.collapseToStartOf(node));
    this.setState({ selectedNode: node });
  }

  onEditingDone = () => {

    this.props.onChange(valueToHtml(this.state.value));
  }

  onBlur = () => {
    log('[onBlur]');
    this.setState({ pendingBlur: true });

    setTimeout(() => {
      if (this.state.pendingBlur) {
        this.onEditingDone();
        this.editor.blur();
      }
    }, 100);
  }

  onFocus = () => {
    log('[onFocus]')
    this.setState({ pendingBlur: false });
  }

  onChange = (change) => {
    log('[onChange] value: ', change.value);
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
    const { value, showToolbar, selectedNode } = this.state;
    log('[render]', value);
    log('[render] selectedNode:', selectedNode);
    return <div>
      <Editor
        ref={r => this.editor = r}
        value={value}
        onChange={this.onChange}
        plugins={this.plugins}
        selectedNode={selectedNode} />
    </div>
  }
}

EditableHtml.propTypes = {
  markup: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}