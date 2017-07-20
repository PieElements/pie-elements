import { createStyleSheet, withStyles, withTheme } from 'material-ui/styles';
import { green, orange, pink } from 'material-ui/colors';

import CorespringChoice from './corespring-choice.jsx';
import { MuiThemeProvider } from 'material-ui/styles';
import React from 'react';
import classNames from 'classnames';

const styleSheet = createStyleSheet('multiple-choice-main', theme => {
  const root = {
    '--feedback-correct-bg-color': green[500],
    '--feedback-incorrect-bg-color': orange[500],
    '--feedback-color': 'black',
    '--choice-input-color': 'black',
    '--choice-input-selected-color': theme.palette.primary[500],
    '--choice-input-disabled-color': theme.palette.grey[500],
    '--choice-input-correct-disabled-color': green[500],
    '--choice-input-incorrect-disabled-color': orange[500],
    '--choice-input-selected-color': theme.palette.primary[500],
    '--choice-input-disabled-color': theme.palette.grey[500],
    backgroundColor: 'var(--mc-bg-color, rgba(0,0,0,0))'
  }
  return {
    root,
    'white-on-black': {
      '--correct-answer-toggle-label-color': 'white',
      '--feedback-correct-bg-color': green[800],
      '--feedback-incorrect-bg-color': orange[800],
      '--feedback-color': 'white',
      '--mc-bg-color': 'black',
      '--choice-input-color': 'white',
      '--choice-input-selected-color': theme.palette.primary[200],
    },
    'black-on-rose': {
      '--mc-bg-color': pink[50]
    }
  };
});

require('./index.less');

class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { model, onChoiceChanged, session, classes } = this.props;

    return <div className={classNames(classes.root, classes[model.className])}>
      <CorespringChoice
        {...model}
        session={session}
        onChoiceChanged={onChoiceChanged} />
    </div>;
  }
}

Main.propTypes = {
  model: React.PropTypes.object,
  session: React.PropTypes.object,
  onChoiceChanged: React.PropTypes.func
};

Main.defaultProps = {
  model: {},
  session: {}
}

const Styled = withStyles(styleSheet)(Main);

export default (props) => <MuiThemeProvider><Styled {...props} /></MuiThemeProvider>;

