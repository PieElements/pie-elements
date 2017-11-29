import { htmlToValue, valueToHtml } from './serialization';

import { Editor } from 'slate-react';
import Image from './plugins/image';
import PropTypes from 'prop-types';
import React from 'react';
import { buildPlugins } from './plugins';

export { htmlToValue, valueToHtml }


export default class EditableHtml extends React.Component {

  constructor(props) {
    super(props);
    this.plugins = buildPlugins({
      math: {
        onFocus: this.onPluginFocus,
        onBlur: this.onPluginBlur
      },
      image: {
        onDelete: this.props.imageSupport && this.props.imageSupport.delete,
        onFocus: this.onPluginFocus,
        onBlur: this.onPluginBlur,
        onInsertImage: this.insertImage
      }
    });
  }

  render() {
    const { value, onChange } = this.props;

    return <div>
      <Editor
        value={value}
        onChange={onChange}
        plugins={this.plugins} />
    </div>
  }
}

EditableHtml.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}