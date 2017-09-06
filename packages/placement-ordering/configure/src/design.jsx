import {
  Checkbox,
  FeedbackConfig,
  LanguageControls,
  MultiLangInput
} from '@pie-libs/config-ui';
import { FormControlLabel, FormGroup } from 'material-ui/Form';

import Button from 'material-ui/Button';
import ChoiceEditor from './choice-editor';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from 'material-ui/Typography';
import cloneDeep from 'lodash/cloneDeep';
import { withStyles } from 'material-ui/styles';

const choiceForId = (choices, choiceId) => choices.find(({ id }) => choiceId === id);


class Design extends React.Component {

  constructor(props) {
    super(props);
    this.toggleAllOnDrag = this.toggleAllOnDrag.bind(this);
    this.toChoiceConfig = this.toChoiceConfig.bind(this);
    this.moveChoice = this.moveChoice.bind(this);
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onMoveOnDragChange = this.onMoveOnDragChange.bind(this);
    this.onDeleteChoice = this.onDeleteChoice.bind(this);
    this.onAddChoice = this.onAddChoice.bind(this);
    this.onPromptChange = this.onPromptChange.bind(this);

    this.state = {
      activeLang: props.model.defaultLang,
      allMoveOnDrag: this.moveAllOnDrag()
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      allMoveOnDrag: this.moveAllOnDrag(props)
    });
  }

  moveAllOnDrag(props) {
    const { model } = (props || this.props);
    return model.model.choices.find(({ moveOnDrag }) => moveOnDrag !== false) === undefined;
  }

  toggleAllOnDrag() {
    const { model, onChoicesChange } = this.props;
    const { allMoveOnDrag } = this.state;
    model.model.choices.forEach(choice => choice.moveOnDrag = allMoveOnDrag);
    onChoicesChange(model.model.choices);
  }

  toChoiceConfig(response, index) {
    const { model } = this.props;
    let id = response instanceof Object ? response.id : response;
    let choice = choiceForId(model.model.choices, id);
    return <ChoiceConfig
      moveChoice={this.moveChoice.bind(this)}
      index={index}
      onLabelChange={this.onLabelChange.bind(this, id)}
      onMoveOnDragChange={this.onMoveOnDragChange.bind(this, id)}
      onDelete={this.onDeleteChoice.bind(this, choice)}
      activeLang={this.state.activeLang}
      key={index}
      choice={choice} />;
  }

  moveChoice(dragIndex, hoverIndex) {
    const choices = this.props.model.correctResponse;
    const dragId = choices[dragIndex];
    choices.splice(dragIndex, 1);
    choices.splice(hoverIndex, 0, dragId);
    this.props.onCorrectResponseChange(this.props.model.correctResponse);
  }

  onLabelChange(choiceId, value, targetLang) {
    let translation = this.props.model.model.choices.find(({ id }) => id === choiceId).label.find(({ lang }) => lang === targetLang);
    translation.value = value;
    this.props.onChoicesChange(this.props.model.model.choices);
  }

  onPromptChange(value) {
    const { model, onPromptChange } = this.props;
    const { activeLang } = this.state;
    const prompt = cloneDeep(model.model.prompt);
    const targetPrompt = prompt.find(p => p.lang === activeLang);
    if (!targetPrompt) {
      prompt.push({ lang: activeLang, value });
    } else {
      const update = Object.assign(targetPrompt, { value });
      prompt.splice(prompt.indexOf(targetPrompt), 1, update);
    }

    onPromptChange(prompt);
  }

  onMoveOnDragChange(choiceId, value) {
    let choice = this.props.model.model.choices.find(({ id }) => id === choiceId);
    choice.moveOnDrag = value;
    this.props.onChoicesChange(this.props.model.model.choices);
  }

  onDeleteChoice(choice) {
    let { id } = choice;
    this.props.model.model.choices = this.props.model.model.choices.filter((choice) => {
      return choice.id !== id;
    });
    this.props.model.correctResponse = this.props.model.correctResponse.filter((choiceId) => { return id !== choiceId; });
    this.props.onChoicesChange(this.props.model.model.choices);
    this.props.onCorrectResponseChange(this.props.model.correctResponse);
  }

  onAddChoice() {
    function findFreeChoiceSlot(props) {
      let slot = 1;
      let ids = props.model.model.choices.map(({ id }) => id);
      while (ids.includes(`c${slot}`)) {
        slot++;
      }
      return slot;
    }
    let id = `c${findFreeChoiceSlot(this.props)}`;
    this.props.model.model.choices.push({
      id: id,
      label: [{ lang: this.state.activeLang, value: '' }],
    });
    this.props.model.correctResponse.push(id);
    this.props.onChoicesChange(this.props.model.model.choices);
    this.props.onCorrectResponseChange(this.props.model.correctResponse);
  }

  onChoicesChange(choices) {
    //Update choice data.
  }
  onCorrectResponseChange(correctResponse) {
    //Update choice data.
  }

  render() {

    const { model, onDefaultLangChange, onFeedbackChange, classes } = this.props;
    const { activeLang, allMoveOnDrag } = this.state;
    return (
      <div>
        <LanguageControls
          langs={model.langs}
          activeLang={activeLang}
          defaultLang={model.defaultLang}
          onActiveLangChange={activeLang => this.setState({ activeLang })}
          onDefaultLangChange={onDefaultLangChange}
          className={classes.langControls} />
        <MultiLangInput
          label="Prompt"
          value={model.model.prompt}
          lang={activeLang}
          onChange={this.onPromptChange} />

        <div className={classes.choices}>
          <Typography type="heading">Choices</Typography>
          <ChoiceEditor
            activeLang={activeLang}
            correctResponse={model.correctResponse}
            onCorrectResponseChange={this.onCorrectResponseChange}
            choices={model.model.choices}
            onChoicesChange={this.onChoicesChange} />

          {/* {model.correctResponse.map(this.toChoiceConfig)} */}
        </div>
        {/* <Checkbox
          checked={allMoveOnDrag}
          onChange={this.toggleAllOnDrag}
          value="allMoveOnDrag"
          label="Remove all tiles after placing" />
        <Button raised color="primary" onClick={this.onAddChoice.bind(this)} >Add a choice</Button> */}
        <FeedbackConfig
          feedback={model.feedback}
          onChange={onFeedbackChange} />
      </div>);
  }
}


Design.propTypes = {
  onPromptChange: PropTypes.func.isRequired,
  onDefaultLangChange: PropTypes.func.isRequired,
  onFeedbackChange: PropTypes.func.isRequired,
}

export default withStyles({
  langControls: {
    marginTop: '20px',
    marginBottom: '20px'
  },
  choices: {
    marginTop: '20px',
    marginBottom: '20px'
  }
})(Design);