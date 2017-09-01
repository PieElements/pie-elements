import PlacementOrdering from './placement-ordering.jsx'
import React from 'react';
import withContext from './with-context';

class Main extends React.Component {

  render() {
    return <PlacementOrdering
      model={this.props.model}
      session={this.props.session}
      sessionChanged={this.props.sessionChanged}>
    </PlacementOrdering>
  }
}

export default withContext(Main);

