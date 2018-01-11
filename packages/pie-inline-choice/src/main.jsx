import { green, orange, pink } from 'material-ui/colors';
import { withStyles, withTheme } from 'material-ui/styles';
import InlineChoice from "./inline-choice.jsx";

import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import React from 'react';
import classNames from 'classnames';

const styleSheet = theme => {
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
};

class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {model, session} = this.props;

    return <div>
      <InlineChoice model={model} session={session} />
    </div>;
  }
}

const Styled = withStyles(styleSheet, { name: 'Main' })(Main);

const theme = createMuiTheme();

export default (props) => <MuiThemeProvider theme={theme}><Styled {...props} /></MuiThemeProvider>;

