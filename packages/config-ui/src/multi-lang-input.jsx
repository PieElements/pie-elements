import EditableHtml from '@pie-libs/editable-html';
import InputContainer from './input-container';
import InputLabel from 'material-ui/Input/InputLabel';
import PropTypes from 'prop-types';
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
    const { lang, value, onChange } = this.props;

    const target = value.find(v => v.lang === lang);
    if (!target) {
      value.push({ lang, value });
    } else {
      const updatedValue = Object.assign(target, { value: update });
      value.splice(value.indexOf(target), 1, updatedValue);
    }

    onChange(value);
  }

  render() {
    const { lang, value, label, classes, imageSupport } = this.props;
    log('value: ', value);
    const renderValue = (typeof value === 'string') ?
      value : (value.find(t => t.lang === lang) || {}).value || '';

    log('[render] renderValue: ', renderValue);

    return (
      <InputContainer label={label} className={classes.container}>
        <EditableHtml
          markup={renderValue}
          onChange={this.onChange}
          imageSupport={imageSupport}
          className={classes.editor} />
      </InputContainer>
    );
  }
}

const styles = {
  container: {
    marginTop: '0px',
    marginBottom: '20px'
  },
  editor: {
    marginTop: '10px'
  },
  root: {
    position: 'relative',
    display: 'block',
    width: '100%'
  },
  textField: {
    width: '100%'
  }
};

const LangValue = PropTypes.shape({
  lang: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
});

MultiLangInput.propTypes = {
  imageSupport: PropTypes.shape({
    add: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired
  }),
  lang: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(LangValue)]).isRequired
}

MultiLangInput.defaultProps = {
  imageSupport: null
}

export default withStyles(styles, { name: 'MultiLangInput' })(MultiLangInput);