import Tabs, { Tab } from 'material-ui/Tabs';

import Design from './design';
import React from 'react';
import ScoringConfig from '@pie-libs/scoring-config';
import { withContext } from '@pie-elements/placement-ordering';

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
        <Tabs onChange={this.onTabIndexChange} index={index}>
          <Tab label="Design" />
          <Tab label="Scoring" />
        </Tabs>
        {index === 0 && <Design {...this.props} />}
        {index === 1 && <ScoringConfig
          partialScoring={model.partialScoring}
          numberOfCorrectResponses={model.correctResponse.length}
          onChange={onPartialScoringChange} />}
      </div>
    )
  }
}


export default withContext(Main);