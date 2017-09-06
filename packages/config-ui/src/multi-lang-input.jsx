import EditableHtml from '@pie-libs/editable-html';
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
    const { lang, onChange } = this.props;
    onChange(update, lang);
  }

  render() {
    const { lang, value, label, classes, imageSupport } = this.props;
    log('value: ', value);
    const renderValue = (typeof value === 'string') ?
      value : (value.find(t => t.lang === lang) || {}).value || '';

    log('[render] renderValue: ', renderValue);

    return <div className={classes.root}>
      {label && <div className={classes.label}>{label}</div>}
      <EditableHtml
        markup={renderValue}
        onChange={this.onChange}
        imageSupport={imageSupport} />
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
  },
  label: {
    fontSize: '10px',
    color: 'rgba(0,0,0,0.4)'
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(LangValue)]).isRequired
}

MultiLangInput.defaultProps = {
  imageSupport: null
}

export default withStyles(styles, { name: 'MultiLangInput' })(MultiLangInput);