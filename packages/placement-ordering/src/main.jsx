import PlacementOrdering from './new-placement-ordering.jsx'
import React from 'react';
import withContext from './with-context';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      session: props.session ? props.session : { value: [] }
    }

    this.onSessionChange = (session) => {
      this.setState({ session });
      this.props.onSessionChange(session);
    }
  }

  render() {
    return <PlacementOrdering
      model={this.props.model}
      session={this.state.session}
      onSessionChange={this.onSessionChange} />
  }
}

export default withContext(Main);

