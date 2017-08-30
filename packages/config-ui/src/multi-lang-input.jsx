import EditableHtml from '@pie-libs/editable-html';
import React from 'react';
import TextField from 'material-ui/TextField';
import debug from 'debug';
import { withStyles } from 'material-ui/styles';

const log = debug('config-ui:multi-lang-input');

export class MultiLangInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(update) {
    log('onChange - e: ', update);
    const { lang, onChange } = this.props;
    onChange(update, lang);
  }

  render() {
    const { lang, value, textFieldLabel, classes, onInsertImage, onDeleteImage } = this.props;

    const renderValue = (typeof value === 'string') ?
      value : (value.find(t => t.lang === lang) || {}).value || '';

    log('[render] renderValue: ', renderValue);

    return <div className={classes.root}>
      <EditableHtml
        markup={renderValue}
        onChange={this.onChange}
        imageSupport={{
          add: onInsertImage,
          delete: onDeleteImage
        }}
      />
    </div>;
  }
}

const styles = {
  root: {
    position: 'relative',
    display: 'block',
    width: '100%'
  },
  textField: {
    width: '100%'
  }
};


export default withStyles(styles, { name: 'MultiLangInput' })(MultiLangInput);
