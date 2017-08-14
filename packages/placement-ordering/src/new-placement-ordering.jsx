import PropTypes from 'prop-types';
import React from 'react';

//Dump on a cleaner structure
class PlacementOrdering extends React.Component {

  render() {
    return <div>
      <Choices
        disabled={disabled}
        choices={model.choices}
      />
      <Targets
        response={response}
      />
    </div>;
  }
}