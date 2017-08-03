import React, { PropTypes } from 'react';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import ActionDelete from 'material-ui-icons/Delete';
import ActionFeedback from 'material-ui-icons/Feedback';
import Checkbox from 'material-ui/Checkbox';
import FeedbackMenu from './feedback-menu';
import IconButton from 'material-ui/IconButton';
import MultiLangInput from './multi-lang-input';
import Radio from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import cloneDeep from 'lodash/cloneDeep';
import isString from 'lodash/isString';
import merge from 'lodash/merge';

const defaultFeedback = (c) => c ? 'Correct!' : 'Incorrect';
export class ChoiceConfig extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onLabelChanged = this.onLabelChanged.bind(this);
    this.onFeedbackTypeChanged = this.onFeedbackTypeChanged.bind(this);
    this.onFeedbackChanged = this.onFeedbackChanged.bind(this);
    this.onValueChanged = this.onValueChanged.bind(this);
  }

  _indexToSymbol(index) {
    return ((this.props.keyMode === 'numbers') ? index + 1 : String.fromCharCode(97 + index).toUpperCase()).toString();
  }

  onValueChanged(event) {
    const update = event.target.value;
    this.props.onChoiceChanged(merge({}, this.props.choice, {
      value: update
    }));
  }

  onToggleCorrect() {
    const message = defaultFeedback(!this.props.choice.correct);
    let update = merge({}, this.props.choice, {
      correct: !this.props.choice.correct,
      feedback: {
        'default': message
      }
    });
    this.props.onChoiceChanged(update);
  }

  onLabelChanged(value, lang) {
    if (!lang) {
      throw new Error('You must specify the lang');
    }

    let update = cloneDeep(this.props.choice);
    update.label = update.label || [];
    let t = update.label.find(t => t.lang === lang);
    if (!t) {
      update.label.push({ lang: lang, value });
    } else {
      t.value = value;
    }

    this.props.onChoiceChanged(update);
  }

  onFeedbackChanged(v, lang) {
    const { choice } = this.props;
    const update = cloneDeep(choice);
    update.feedback.custom = update.feedback.custom || [];
    const fb = update.feedback.custom.find(t => t.lang === lang);
    if (fb) {
      fb.value = v;
    } else {
      update.feedback.custom.push({ lang: lang, value: v });
    }
    this.props.onChoiceChanged(update);
  }

  onFeedbackTypeChanged(t) {
    const { choice, activeLang } = this.props;
    const update = cloneDeep(choice);

    update.feedback.type = t;

    if (t === 'default') {
      update.feedback['default'] = defaultFeedback(choice.correct);
    } else if (t === 'custom') {
      update.feedback.custom = update.feedback.custom || [];
      let t = update.feedback.custom.find(t => t.lang === activeLang);
      if (!t) {
        update.feedback.custom.push({ lang: activeLang, value: '' });
      }
    }
    this.props.onChoiceChanged(update);
  }

  render() {
    let {
      index,
      choice,
      choiceMode,
      onChoiceChanged,
      onRemoveChoice,
      activeLang,
      classes } = this.props;

    console.log('>>>> classes: ', classes);

    const ChoiceModeTag = choiceMode === 'checkbox' ? Checkbox : Radio;

    return <div className={classes.root}>
      <div className={classes.main}>
        <span className={classes.index}>{this._indexToSymbol(index)}</span>
        <ChoiceModeTag
          checked={choice.correct === true}
          style={{ width: 'auto', paddingLeft: '5px' }}
          onClick={() => this.onToggleCorrect()} />
        <TextField
          label="value"
          value={choice.value}
          onChange={this.onValueChanged}
          className={classes.valueField}

        />
        <MultiLangInput
          textFieldLabel="label"
          value={choice.label}
          lang={activeLang}
          onChange={this.onLabelChanged} />
        <FeedbackMenu
          value={choice.feedback.type}
          onChange={this.onFeedbackTypeChanged} />

        <IconButton
          aria-label="delete"
          onClick={onRemoveChoice}><ActionDelete /></IconButton>
      </div>
      {choice.feedback.type === 'custom' &&
        <div className={classes.feedback}>
          <MultiLangInput
            textFieldLabel="feedback"
            value={choice.feedback.custom}
            lang={activeLang}
            onChange={this.onFeedbackChanged} />
        </div>
      }

    </div >;
  }
}

ChoiceConfig.props = {
  index: PropTypes.number.isRequired,
  keyMode: PropTypes.oneOf(['letters', 'numbers']).isRequired,
  isCorrect: PropTypes.bool.isRequired,
  choice: PropTypes.object.isRequired,
  onChoiceChanged: PropTypes.func.isRequired,
  onToggleCorrect: PropTypes.func.isRequired,
  onRemoveChoice: PropTypes.func.isRequired,
  activeLang: PropTypes.string.isRequired
}

const styles = createStyleSheet('ChoiceConfig', theme => {
  return {
    root: {
      paddingBottom: '10px',
      paddingTop: '10px',
    },
    main: {
      display: 'flex',
      alignItems: 'baseline',
      paddingBottom: '8px'
    },
    feedback: {
      display: 'flex'
    },
    index: {

      display: 'inline-block',
      position: 'relative',
      top: '-4px',
      fontWeight: 'bold',
      fontSize: '18px',
    },
    valueField: {
      width: '100px',
      maxWidth: '100px',
      marginRight: '10px',
      marginLeft: '10px'
    }
  }
});

export default withStyles(styles)(ChoiceConfig);