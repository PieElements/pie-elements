import React, { PropTypes } from 'react';
import { green500, grey500 } from 'material-ui/styles/colors';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionFeedback from 'material-ui/svg-icons/action/feedback';
import Checkbox from 'material-ui/Checkbox';
import FeedbackMenu from './feedback-menu';
import IconButton from 'material-ui/IconButton';
import MultiLangInput from './multi-lang-input';
import RadioButton from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import cloneDeep from 'lodash/cloneDeep';
import isString from 'lodash/isString';
import merge from 'lodash/merge';

const defaultFeedback = (c) => c ? 'Correct!' : 'Incorrect';

export default class ChoiceConfig extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onLabelChanged = this.onLabelChanged.bind(this);
    this.onFeedbackTypeChanged = this.onFeedbackTypeChanged.bind(this);
    this.onFeedbackChanged = this.onFeedbackChanged.bind(this);
  }

  _indexToSymbol(index) {
    return ((this.props.keyMode === 'numbers') ? index + 1 : String.fromCharCode(97 + index).toUpperCase()).toString();
  }

  onValueChanged(update) {
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
      activeLang } = this.props;

    const ChoiceModeTag = choiceMode === 'checkbox' ? Checkbox : RadioButton;

    return <div className="choice-config">
      <div className="main">
        <span className="index">{this._indexToSymbol(index)}</span>
        <ChoiceModeTag
          checked={choice.correct === true}
          style={{ width: 'auto', paddingLeft: '5px' }}
          onClick={() => this.onToggleCorrect()} />
        <TextField
          floatingLabelText="value"
          value={choice.value}
          onChange={(e, u) => this.onValueChanged(u)}
          style={{ width: '100px', maxWidth: '100px', marginRight: '10px' }} />

        <MultiLangInput
          textFieldLabel="label"
          value={choice.label}
          lang={activeLang}
          onChange={this.onLabelChanged} />

        <FeedbackMenu
          value={choice.feedback.type}
          onChange={this.onFeedbackTypeChanged} />

        <IconButton
          tooltip="delete"
          onClick={onRemoveChoice}><ActionDelete /></IconButton>
      </div>
      {choice.feedback.type === 'custom' &&
        <div className="feedback">
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