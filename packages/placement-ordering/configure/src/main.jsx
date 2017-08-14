import Tabs, { Tab } from 'material-ui/Tabs';
import { blue500, green500, green700, grey400, grey500, red500 } from 'material-ui/styles/colors';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import ChoiceConfig from './choice-config';
import Langs from './langs';
import MultiLangInput from './multi-lang-input';
import PartialScoringConfig from './partial-scoring-config';
import React from 'react';
import TextField from 'material-ui/TextField';
import { withContext } from '@pie-elements/placement-ordering';

// require('./main.less');

// const muiTheme = getMuiTheme({
//   palette: {
//     primary1Color: green500,
//     primary2Color: green700,
//     primary3Color: grey400,
//   }
// });

const styles = createStyleSheet('Main', theme => ({
}));

const choiceForId = (choices, choiceId) => choices.find(({ id }) => choiceId === id);


class Design extends React.Component {

  constructor(props) {
    super(props);
    this.toggleAllOnDrag = this.toggleAllOnDrag.bind(this);
    this.toChoiceConfig = this.toChoiceConfig.bind(this);
    this.moveChoice = this.moveChoice.bind(this);
    this.onLabelChanged = this.onLabelChanged.bind(this);
    this.onMoveOnDragChanged = this.onMoveOnDragChanged.bind(this);
    this.onDeleteChoice = this.onDeleteChoice.bind(this);
    this.onAddChoice = this.onAddChoice.bind(this);

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
    const { model, onChoicesChanged } = this.props;
    const { allMoveOnDrag } = this.state;
    model.model.choices.forEach(choice => choice.moveOnDrag = allMoveOnDrag);
    onChoicesChanged(model.model.choices);
  }

  toChoiceConfig(response, index) {
    const { model } = this.props;
    let id = response instanceof Object ? response.id : response;
    let choice = choiceForId(model.model.choices, id);
    return <ChoiceConfig
      moveChoice={this.moveChoice.bind(this)}
      index={index}
      onLabelChanged={this.onLabelChanged.bind(this, id)}
      onMoveOnDragChanged={this.onMoveOnDragChanged.bind(this, id)}
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
    this.props.onCorrectResponseChanged(this.props.model.correctResponse);
  }

  onLabelChanged(choiceId, value, targetLang) {
    let translation = this.props.model.model.choices.find(({ id }) => id === choiceId).label.find(({ lang }) => lang === targetLang);
    translation.value = value;
    this.props.onChoicesChanged(this.props.model.model.choices);
  }

  onMoveOnDragChanged(choiceId, value) {
    let choice = this.props.model.model.choices.find(({ id }) => id === choiceId);
    choice.moveOnDrag = value;
    this.props.onChoicesChanged(this.props.model.model.choices);
  }

  onDeleteChoice(choice) {
    let { id } = choice;
    this.props.model.model.choices = this.props.model.model.choices.filter((choice) => {
      return choice.id !== id;
    });
    this.props.model.correctResponse = this.props.model.correctResponse.filter((choiceId) => { return id !== choiceId; });
    this.props.onChoicesChanged(this.props.model.model.choices);
    this.props.onCorrectResponseChanged(this.props.model.correctResponse);
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
    this.props.onChoicesChanged(this.props.model.model.choices);
    this.props.onCorrectResponseChanged(this.props.model.correctResponse);
  }


  render() {

    const { model, onDefaultLangChanged, onPromptChanged } = this.props;
    const { activeLang, allMoveOnDrag } = this.state;
    return (
      <div>
        <p>In Ordering, a student is asked to sequence events or inputs in a specific order.</p>
        <p>After setting up the choices, drag and drop them into the correct order. Students will see a shuffled version of the choices.</p>
        <h2>Choices</h2>
        <p>Add a label to choice area</p>
        <div className="language-controls">
          <Langs
            label="Choose language to edit"
            langs={model.langs}
            selected={activeLang}
            onChange={(e, index, l) => this.setState({ activeLang: l })} />
          <Langs
            label="Default language"
            langs={model.langs}
            selected={model.defaultLang}
            onChange={(e, index, l) => onDefaultLangChanged(l)} />
        </div>
        <MultiLangInput
          textFieldLabel="Prompt"
          value={model.model.prompt}
          lang={activeLang}
          onChange={onPromptChanged} />
        <Checkbox label="Remove all tiles after placing" checked={allMoveOnDrag} onChange={this.toggleAllOnDrag} />
        <ul className="choices-config-list">{model.correctResponse.map(this.toChoiceConfig)}</ul>
        <Button raised color="primary" onClick={this.onAddChoice.bind(this)} >Add a choice</Button>
      </div>);
  }
}

class Main extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      index: 0
    };
    this.onTabIndexChange = this.onTabIndexChange.bind(this);
  }

  onPartialScoringChange(partialScoring) {
    this.props.onPartialScoringChange(partialScoring);
  }


  onTabIndexChange(index) {
    this.setState({ index });
  }

  render() {

    const { classes, model } = this.props;
    const { index } = this.state;


    //"corespring-placement-ordering-configure-root">
    return (
      <div className={classes.root}>
        <Tabs onChange={this.onTabIndexChange} index={index}>
          <Tab label="Design" />
          <Tab label="Scoring" />
        </Tabs>
        {index === 0 && <Design {...this.props} />}
        {index === 1 && <Scoring />}
        {/* <Tabs>
          <Tab label="Design">
            <p>In Ordering, a student is asked to sequence events or inputs in a specific order.</p>
            <p>After setting up the choices, drag and drop them into the correct order. Students will see a shuffled version of the choices.</p>
            <h2>Choices</h2>
            <p>Add a label to choice area</p>
            <div className="language-controls">
              <Langs
                label="Choose language to edit"
                langs={this.props.model.langs}
                selected={this.state.activeLang}
                onChange={(e, index, l) => this.setState({ activeLang: l })} />
              <Langs
                label="Default language"
                langs={this.props.model.langs}
                selected={this.props.model.defaultLang}
                onChange={(e, index, l) => this.props.onDefaultLangChanged(l)} />
            </div>
            <MultiLangInput
              textFieldLabel="Prompt"
              value={this.props.model.model.prompt}
              lang={this.state.activeLang}
              onChange={this.onPromptChanged} />
            <Checkbox label="Remove all tiles after placing" checked={this.state.allMoveOnDrag} onCheck={this.toggleAllOnDrag.bind(this)} />
            <ul className="choices-config-list">{
              this.props.model.correctResponse.map((response, index) => {
                let id = response instanceof Object ? response.id : response;
                let choice = choiceForId(id);
                return <ChoiceConfig
                  moveChoice={this.moveChoice.bind(this)}
                  index={index}
                  onLabelChanged={this.onLabelChanged.bind(this, id)}
                  onMoveOnDragChanged={this.onMoveOnDragChanged.bind(this, id)}
                  onDelete={this.onDeleteChoice.bind(this, choice)}
                  activeLang={this.state.activeLang}
                  key={index}
                  choice={choice} />;
              })
            }</ul>
            <RaisedButton label="Add a choice" onClick={this.onAddChoice.bind(this)} />
          </Tab>
          <Tab label="Scoring">
            <PartialScoringConfig
              partialScoring={this.props.partialScoring}
              numberOfCorrectResponses={this.props.model.correctResponse.length}
              onPartialScoringChange={this.onPartialScoringChange.bind(this)} />
          </Tab>
        </Tabs> */}
      </div>
    )
  }
}

const StyledMain = withStyles(styles)(Main);

export default withContext(StyledMain);