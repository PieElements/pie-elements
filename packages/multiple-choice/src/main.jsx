import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { amber500, amber600, green200, green500 } from 'material-ui/styles/colors';

import CorespringChoice from './corespring-choice.jsx';
import Feedback from './feedback';
import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

require('./index.less');

class Main extends React.Component {

  constructor(props) {
    super(props);
  }


  _getMuiTheme(className) {
    console.log('className: ', className);
    if (className === 'white-on-black') {
      return createMuiTheme({
        mc: {
          correctColor: 'green', //green200,
          incorrectColor: 'blue', //amber500,
        }
      });
    } else if (className === 'black-on-rose') {
      return createMuiTheme({
        mc: {
          correctColor: 'red', //green500,
          incorrectColor: 'purple', //amber600
        }
      });
    } else {
      return createMuiTheme({
        mc: {
          correctColor: green500,
          incorrectColor: amber600
        }
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
    console.log('tt: ', theme);
    return <div className={this.getClass(model.className)}>
      <MuiThemeProvider theme={theme}>
        <div>
          <Feedback correctness={'correct'} feedback={'hi'} />
          <Feedback correctness={'incorrect'} feedback={'hi'} />
        </div>
        {/* <CorespringChoice
          {...model}
          session={session}
          onChoiceChanged={onChoiceChanged} /> */}
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

