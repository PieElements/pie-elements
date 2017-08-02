import React from 'react';
import TextField from 'material-ui/TextField';

export default class MultiLangInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { lang, onChange } = this.props;
    const update = e.target.value;
    onChange(update, lang);
  }

  componentDidUpdate(oldProps) {

  }

  render() {

    const { lang, value, textFieldLabel } = this.props;

    const renderValue = (typeof value === 'string') ?
      value : (value.find(t => t.lang === lang) || {}).value || '';

    return <div className="multi-lang-input">
      <TextField
        value={renderValue}
        onChange={this.onChange} />
    </div>;
  }
}
//  label={textFieldLabel}
//         name={renderValue}
//         value={renderValue}
//         style={{ flex: 1, width: '100%' }}
