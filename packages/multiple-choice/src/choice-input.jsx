import { FormControlLabel, FormGroup } from 'material-ui/Form';
import React, { PropTypes } from 'react';
import { createStyleSheet, withStyles, withTheme } from 'material-ui/styles';

import Checkbox from 'material-ui/Checkbox';
import Feedback from './feedback.jsx';
import FeedbackTick from './feedback-tick.jsx';
import RadioButton from 'material-ui/RadioButton';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';

const tagStyle = {
  display: 'inline-block',
  width: 'auto',
  verticalAlign: 'middle',
  marginRight: '5px'
}

const styleSheet = createStyleSheet('ChoiceInput', theme => {

  return {
    label: {
      color: 'var(--choice-input-color, black)',
      display: 'inline-block',
      verticalAlign: 'middle',
      cursor: 'pointer'
    }
  }
});


const formStyleSheet = createStyleSheet('StyledFormControlLabel', theme => {
  return {
    label: {
      color: 'var(--choice-input-color, black)'
    }
  }
});

const StyledFormControlLabel = withStyles(formStyleSheet)((props) => <FormControlLabel {...props} classes={{ label: props.classes.label }} />);

const checkboxStyles = createStyleSheet('StyledCheckbox', theme => {
  return {
    root: {
      color: 'var(--choice-input-color, black)'
    },
    checked: {
      color: 'var(--choice-input-selected-color, black)'
    },
    disabled: {
      color: 'var(--choice-input-disabled-color, black)'
    }
  }
});

const StyledCheckbox = withStyles(checkboxStyles)((props) => <Checkbox {...props}
  className={props.classes.root}
  checkedClassName={props.classes.checked}
  disabledClassName={props.classes.disabled} />);

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

  render() {

    const {
      choiceMode,
      disabled,
      displayKey,
      feedback,
      label,
      checked,
      correctness,
      classes
     } = this.props;

    const Tag = choiceMode === 'checkbox' ? StyledCheckbox : RadioButton;
    const classSuffix = choiceMode === 'checkbox' ? 'checkbox' : 'radio-button';

    return <div className={"corespring-" + classSuffix}>

      <div className="row">
        <FeedbackTick correctness={correctness} />
        <div className="checkbox-holder">
          <StyledFormControlLabel
            disabled={disabled}
            label={displayKey + '. '}
            control={
              <Tag
                checked={checked}
                onChange={this.onToggleChoice}
              />}
            label={displayKey + '. '} />
          <span
            className={classNames(classes.label)}
            onClick={this.onToggleChoice}
            dangerouslySetInnerHTML={{ __html: label }} />
        </div>
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

export default withStyles(styleSheet)(ChoiceInput);
