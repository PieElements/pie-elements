import { createStyleSheet, withStyles } from 'material-ui/styles';

import React from 'react';
import TextField from 'material-ui/TextField';

export class MultiLangInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { lang, onChange } = this.props;
    const update = e.target.value;
    onChange(update, lang);
  }

  render() {

    const { lang, value, textFieldLabel, classes } = this.props;

    const renderValue = (typeof value === 'string') ?
      value : (value.find(t => t.lang === lang) || {}).value || '';

    return <div className={classes.root}>
      <TextField
        label={textFieldLabel}
        value={renderValue}
        className={classes.textField}
        onChange={this.onChange} />
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
