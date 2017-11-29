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
      math: {
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
        onDone: () => {
          this.setState({ toolbarInFocus: false });
          this.editor.blur();
          this.onEditingDone();
        }
      }
    });

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
    const { value, showToolbar } = this.state;
    log('[render]', value);
    return <div>
      <Editor
        ref={r => this.editor = r}
        value={value}
        onChange={this.onChange}
        plugins={this.plugins} />
    </div>
  }
}

EditableHtml.propTypes = {
  markup: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}