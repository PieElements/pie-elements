import CorespringPlacementOrdering from './placement-ordering.jsx'
import React from 'react';
import withContext from './with-context';

class Main extends React.Component {

  render() {
    return <CorespringPlacementOrdering
      model={this.props.model}
      session={this.props.session}
      sessionChanged={this.props.sessionChanged}>
    </CorespringPlacementOrdering>
  }
}

export default withContext(Main);

