import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Tab, Tabs } from 'material-ui/Tabs';
import { blue500, green500, green700, grey400, grey500, red500 } from 'material-ui/styles/colors';

import ChoiceConfig from './choice-config';
import Langs from './langs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MultiLangInput from './multi-lang-input';
import PartialScoringConfig from '@pie-libs/scoring-config/src/index.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

require('./index.less');


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: grey400,
  }
});

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeLang: props.model.defaultLang
    }
  }

  render() {

    const {
      onChoiceChanged,
      onRemoveChoice,
      onChoiceModeChanged,
      onKeyModeChanged,
      onPromptChanged,
      onAddChoice,
      model,
      onDefaultLangChanged,
      onPartialScoringChanged
    } = this.props;

    return <MuiThemeProvider theme={muiTheme}>
      <div className="corespring-choice-config-root">
        <Tabs>
          <Tab label="Design">
            <div className="base-types">
              <ChoiceType value={model.choiceMode} onChange={onChoiceModeChanged} />
              <KeyType value={model.keyMode} onChange={onKeyModeChanged} />
            </div>
            <hr className="divider" />

            <div className="language-controls">
              <Langs
                label="Choose language to edit"
                langs={model.langs}
                selected={this.state.activeLang}
                onChange={(e, index, l) => this.setState({ activeLang: l })} />
              <Langs
                label="Default language"
                langs={model.langs}
                selected={model.defaultLang}
                onChange={(e, index, l) => onDefaultLangChanged(l)} />
            </div>
            <MultiLangInput
              textFieldLabel="prompt"
              value={model.prompt}
              style={{ width: '100%' }}
              lang={this.state.activeLang}
              onChange={onPromptChanged} />

            {model.choices.map((choice, index) => {
              const choiceProps = {
                choice,
                index,
                choiceMode: model.choiceMode,
                keyMode: model.keyMode,
                activeLang: this.state.activeLang,
                defaultLang: model.defaultLang,
                onChoiceChanged: onChoiceChanged.bind(null, index),
                onRemoveChoice: onRemoveChoice.bind(null, index)
              }
              return <ChoiceConfig key={index} {...choiceProps} />;
            })}

            <br />
            <RaisedButton label="Add a choice" onClick={() => onAddChoice(this.state.activeLang)} />
          </Tab>
          <Tab label="Scoring">
            <PartialScoringConfig
              partialScoring={model.partialScoring}
              numberOfCorrectResponses={model.choices.filter(choice => choice.correct).length}
              onPartialScoringChange={onPartialScoringChanged.bind(this)} />
          </Tab>
        </Tabs>
      </div>
    </MuiThemeProvider>
  }
}

const TwoChoice = (props) => {
  return <div className="two-choice">
    <label className="header">{props.header}</label>
    <RadioButtonGroup
      name="choice-type"
      labelPosition="right"
      valueSelected={props.value}
      onChange={props.onChange}
      defaultSelected={props.defaultSelected}>
      <RadioButton
        value={props.one.value}
        label={props.one.label}
      />
      <RadioButton
        value={props.two.value}
        label={props.two.label}
      />
    </RadioButtonGroup>
  </div>;
}

export const ChoiceType = (props) => {
  let choiceProps = {
    header: 'Response Type',
    defaultSelected: 'radio',
    value: props.value,
    onChange: props.onChange,
    one: {
      label: 'Radio',
      value: 'radio'
    },
    two: {
      label: 'Checkbox',
      value: 'checkbox'
    }
  }
  return <TwoChoice {...choiceProps} />;
}

export const KeyType = (props) => {
  let choiceProps = {
    header: 'Choice Labels',
    defaultSelected: 'numbers',
    value: props.value,
    onChange: props.onChange,
    one: {
      label: 'Numbers',
      value: 'numbers'
    },
    two: {
      label: 'Letters',
      value: 'letters'
    }
  }
  return <TwoChoice {...choiceProps} />;
}