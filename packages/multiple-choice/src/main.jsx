import { amber500, amber600, green200, green500 } from 'material-ui/styles/colors';

import CorespringChoice from './corespring-choice.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

require('./index.less');

class Main extends React.Component {

  constructor(props) {
    super(props);
  }


  _getMuiTheme(className) {
    if (className === 'white-on-black') {
      return getMuiTheme(darkBaseTheme, {
        correctColor: green200,
        incorrectColor: amber500,
        palette: {
          textColor: 'white'
        }
      });
    } else if (className === 'black-on-rose') {
      return getMuiTheme({
        correctColor: green500,
        incorrectColor: amber600
      });
    } else {
      return getMuiTheme({
        correctColor: green500,
        incorrectColor: amber600
      });
    }
  };

  getClass(className) {
    className = className || '';
    return `corespring-choice-root ${className}`
  }

  render() {

    const { model, onChoiceChanged, session } = this.props;

    let theme = this._getMuiTheme(model.className);

    return <div className={this.getClass(model.className)}>
      <MuiThemeProvider muiTheme={theme}>
        <CorespringChoice
          {...model}
          session={session}
          onChoiceChanged={onChoiceChanged} />
      </MuiThemeProvider>
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

export default Main;

