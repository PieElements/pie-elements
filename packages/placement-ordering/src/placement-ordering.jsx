import { buildState, reducer } from './ordering';

import CorrectAnswerToggle from '@pie-libs/correct-answer-toggle';
import PropTypes from 'prop-types';
import React from 'react';
import Tile from './tile';
import debug from 'debug';
import { withStyles } from 'material-ui/styles';

const log = debug('pie-elements:placement-ordering');

class PlacementOrdering extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showingCorrect: false
    }

    this.toggleCorrect = (showingCorrect) => {
      this.setState({ showingCorrect });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.model.correctResponse) {
      this.setState({ showingCorrect: false });
    }
  }

  onDropChoice(target, ordering, source, index) {
    const { onSessionChange, session } = this.props;
    const from = ordering.tiles.find(t => t.id === source.id && t.type === source.type);
    const to = target;
    log('[onDropChoice] ', from, to);
    const update = reducer({ type: 'move', from, to }, ordering);
    const sessionUpdate = Object.assign({}, session, { value: update.response })
    onSessionChange(sessionUpdate);
  }

  render() {
    const { classes, model, session, onSessionChange } = this.props;
    const showToggle = model.correctResponse && model.correctResponse.length > 0;
    const { showingCorrect } = this.state;
    const { orientation, includeTargets } = model.config || { orientation: 'vertical', includeTargets: true };
    const vertical = orientation === 'vertical';

    const ordering = showingCorrect ?
      buildState(model.choices, model.correctResponse, model.correctResponse.map(id => ({ id, outcome: 'correct' })), { includeTargets }) :
      buildState(model.choices, session.value, model.outcomes, { includeTargets });

    const tileSize = model.config ? (model.config.tileSize || '1fr') : '1fr';
    const mainAxisCount = `repeat(${model.choices.length}, ${tileSize})`;
    const minorAxisCount = `repeat(${includeTargets ? '2' : '1'}, ${tileSize})`;

    const choicesAndTargetStyle = {
      gridAutoFlow: vertical ? 'column' : 'row',
      gridTemplateColumns: vertical ? minorAxisCount : mainAxisCount,
      gridTemplateRows: vertical ? mainAxisCount : minorAxisCount
    }

    return <div className={classes.placementOrdering}>
      <CorrectAnswerToggle
        show={showToggle}
        toggled={this.state.showingCorrect}
        onToggle={this.toggleCorrect} />

      <div className={classes.prompt}
        dangerouslySetInnerHTML={{ __html: model.prompt }}></div>

      <div className={classes.choicesAndTargets} style={choicesAndTargetStyle}>
        {ordering.tiles.map((t, index) => {
          t.onDropChoice = this.onDropChoice.bind(this, t, ordering);
          t.disabled = model.disabled;
          return <Tile {...t} key={index} />;
        })}
      </div>
    </div>;
  }
}

const styles = {
  placementOrdering: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  prompt: {
    padding: '5px',
    paddingBottom: '15px'
  },
  choicesAndTargets: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'repeat(4, 1fr)',
    gridAutoFlow: 'column',
    gridGap: '10px'
  },
  choices: {
    backgroundColor: 'magenta'
  },
  targets: {
    backgroundColor: 'lightblue'
  }
}

export default withStyles(styles)(PlacementOrdering);