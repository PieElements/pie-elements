import { createStyleSheet, withStyles } from 'material-ui/styles';

import EditableHtml from '@pie-libs/editable-html';
import React from 'react';
import TextField from 'material-ui/TextField';
import debug from 'debug';

const log = debug('config-ui:multi-lang-input');

export class MultiLangInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    log('onChange - e: ', e);
    const { lang, onChange } = this.props;
    const update = e.target.value;
    onChange(update, lang);
  }

  onImageClick() {
    log('onImageClick');
  }

  render() {

    const { lang, value, textFieldLabel, classes } = this.props;

    const renderValue = (typeof value === 'string') ?
      value : (value.find(t => t.lang === lang) || {}).value || '';

    return <div className={classes.root}>
      <EditableHtml
        markup={renderValue}
        onChange={this.onChange}
        onImageClick={this.addImage} />
      {/* <TextField
        label={textFieldLabel}
        value={renderValue}
        className={classes.textField}
        onChange={this.onChange} /> */}
    </div>;
  }
}

const styles = createStyleSheet('MultiLangInput', theme => {

  return {
    root: {
      display: 'block',
      width: '100%'
    },
    textField: {
      width: '100%'
    }
  }
});

export default withStyles(styles)(MultiLangInput);
