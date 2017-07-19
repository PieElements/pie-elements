import React, { PropTypes } from 'react';

import ChoiceInput from './choice-input';
import CorespringCorrectAnswerToggle from '@pie-libs/correct-answer-toggle';

export default class CorespringChoice extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showCorrect: false
    }

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    if (this.props.mode === 'evaluate') {
      this.setState({ showCorrect: !this.state.showCorrect });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.correctResponse) {
      this.setState({ showCorrect: false });
    }
  }

  isSelected(value) {
    if (this.props.session.value) {
      return this.props.session.value.indexOf(value) >= 0;
    } else {
      return false;
    }
  }

  indexToSymbol(index) {
    return ((this.props.keyMode === 'numbers') ? index + 1 : String.fromCharCode(97 + index).toUpperCase()).toString();
  }

  render() {

    const {
      mode,
      disabled,
      choices,
      choiceMode,
      prompt,
      onChoiceChanged,
      responseCorrect
    } = this.props;

    const { showCorrect } = this.state;
    const isEvaluateMode = mode === 'evaluate';

    const correctness = (c) => c === true ? 'correct' : 'incorrect';

    let choiceToTag = (choice, index) => {
      var choiceClass = 'choice' + (index === choices.length - 1 ? ' last' : '');

      const checked = showCorrect ? (choice.correct || false) : this.isSelected(choice.value);

      const feedback = !isEvaluateMode || showCorrect ? '' : choice.feedback;

      const choiceProps = {
        checked,
        choiceMode,
        disabled,
        feedback,
        value: choice.value,
        correctness: checked && isEvaluateMode ? correctness(choice.correct) : undefined,
        displayKey: this.indexToSymbol(index),
        label: choice.label,
        onChange: mode === 'gather' ? onChoiceChanged : () => { }
      }

      return <div className={choiceClass} key={index}>
        <ChoiceInput {...choiceProps} />
      </div>;
    };

    return <div className="corespring-choice">
      <CorespringCorrectAnswerToggle
        show={isEvaluateMode && !responseCorrect}
        toggled={this.state.showCorrect}
        onToggle={this.onToggle.bind(this)} />
      <div className="prompt">{prompt}</div>
      {choices.map(choiceToTag)}
    </div>;
  }
}

CorespringChoice.propTypes = {
  mode: PropTypes.oneOf(['gather', 'view', 'evaluate']),
  choiceMode: PropTypes.oneOf(['radio', 'checkbox']),
  keyMode: PropTypes.oneOf(['numbers', 'letters']),
  choices: PropTypes.array,
  prompt: PropTypes.string,
  session: PropTypes.object,
  onChoiceChanged: PropTypes.func.isRequired
};

CorespringChoice.defaultProps = {
  session: {
    value: []
  }
};
