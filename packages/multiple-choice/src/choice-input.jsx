import React, { PropTypes } from 'react';

import Checkbox from 'material-ui/Checkbox';
import Feedback from './feedback.jsx';
import FeedbackTick from './feedback-tick.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RadioButton from 'material-ui/RadioButton';
import cloneDeep from 'lodash/cloneDeep';
import muiThemeable from 'material-ui/styles/muiThemeable';

const tagStyle = {
  display: 'inline-block',
  width: 'auto',
  verticalAlign: 'middle',
  marginRight: '5px'
}

const labelStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
  cursor: 'pointer'
}

export class ChoiceInput extends React.Component {

  constructor(props) {
    super(props);
    this.onToggleChoice = this.onToggleChoice.bind(this);
  }

  onToggleChoice() {
    this.props.onChange({
      value: this.props.value,
      selected: !this.props.checked
    })
  }

  getTheme() {
    let theme = cloneDeep(this.props.muiTheme);
    if (this.props.correctness === 'correct') {
      theme.checkbox.disabledColor = theme.correctColor;
    } else if (this.props.correctness === 'incorrect') {
      theme.checkbox.disabledColor = theme.incorrectColor;
    }
    return theme;
  }

  render() {

    const {
      choiceMode,
      disabled,
      displayKey,
      feedback,
      label,
      checked,
      correctness
     } = this.props;

    const muiTheme = this.getTheme();
    const Tag = choiceMode === 'checkbox' ? Checkbox : RadioButton;
    const classSuffix = choiceMode === 'checkbox' ? 'checkbox' : 'radio-button';

    /**
     * TODO: should only really have 1 theme provider in the component tree.
     * but the way Checkbox is set up you can't tweak the styles via the props fully.
     * So have to use an additional MuiThemeProvider for now.*/0
    return <div className={"corespring-" + classSuffix}>
      <FeedbackTick correctness={correctness} />
      <div className="checkbox-holder">
        <MuiThemeProvider muiTheme={muiTheme}>
          <Tag
            style={tagStyle}
            disabled={disabled}
            checked={checked}
            onCheck={this.onToggleChoice}
            label={displayKey + '. '} />
        </MuiThemeProvider>
        <span
          style={labelStyle}
          className="label"
          onClick={this.onToggleChoice}
          dangerouslySetInnerHTML={{ __html: label }} />
      </div>
      <Feedback feedback={feedback} correctness={correctness} />
    </div>
  }
};

ChoiceInput.propTypes = {
  choiceMode: React.PropTypes.oneOf(['radio', 'checkbox']),
  displayKey: React.PropTypes.string.isRequired,
  choiceMode: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  correctness: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  feedback: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};


ChoiceInput.defaultProps = {
};

export default muiThemeable()(ChoiceInput);
