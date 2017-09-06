import Tabs, { Tab } from 'material-ui/Tabs';

import Design from './design';
import Help from './help';
import React from 'react';
import ScoringConfig from '@pie-libs/scoring-config';
import omit from 'lodash/omit';
import { withContext } from '@pie-elements/placement-ordering';
import { withStyles } from 'material-ui/styles';

const styles = {
  tabBar: {
    display: 'flex',
    justifyContent: 'space-between'
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

  onTabIndexChange(event, index) {
    this.setState({ index });
  }

  render() {

    const { classes, model, partialScoring, onPartialScoringChange } = this.props;
    const { index } = this.state;

    return (
      <div>
        <div className={classes.tabBar}>
          <Tabs onChange={this.onTabIndexChange} value={index}>
            <Tab label="Design" />
            <Tab label="Scoring" />
          </Tabs>
          <Help />
        </div>
        {index === 0 && <Design {...omit(this.props, 'classes') } />}
        {index === 1 && <ScoringConfig
          partialScoring={model.partialScoring}
          numberOfCorrectResponses={model.correctResponse.length}
          onChange={onPartialScoringChange} />}
      </div>
    );
  }
}


export default withContext(withStyles(styles)(Main));