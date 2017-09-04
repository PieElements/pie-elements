import mkDraggable, { ConnectedComponent } from './draggable-choice';
import mkDroppable, { ConnectedDropTarget } from './droppable-target';

import CorrectAnswerToggle from '@pie-libs/correct-answer-toggle';
import CustomDragLayer from './drag-layer';
import DraggableChoice from './DraggableChoice';
import PropTypes from 'prop-types';
import React from 'react';
import compact from 'lodash/compact';
import debug from 'debug';
import viewModel from './view-model';
import { withStyles } from 'material-ui/styles';

//https://github.com/react-dnd/react-dnd/issues/442
const log = debug('pie-elements:placement-ordering');

export const RawChoice = (props) => {

  const opacity = props.isDragging ? 0.5 : 1;
  return <pre style={{ height: '120px', border: 'solid 1px red', opacity }}>{JSON.stringify(props, null, '  ')}</pre>
}

export const DropTarget = (props) => {
  return <pre style={{ border: 'solid 1px green' }}>{JSON.stringify(props, null, '  ')}</pre>
}

const NewDraggableChoice = mkDraggable(ConnectedComponent(RawChoice));

const NewDropTarget = mkDroppable(ConnectedDropTarget(DropTarget));

//Dump on a cleaner structure
class PlacementOrdering extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showingCorrect: false
    }

    this.toggleCorrect = (showingCorrect) => {
      this.setState({ showingCorrect });
    }

    this.isChoicePlaced = (choice) => {
      const { session } = this.props;
      return compact(session.value).indexOf(choice.id) !== -1;
    }

    this.buildTargetView = () => {
      const { session, model } = this.props;
      const length = model.choices.length;
      const value = (session || {}).value || new Array(length);
      const out = [];
      for (var i = 0; i < value.length; i++) {
        const s = value[i];
        if (!s) {
          out.push({
            blank: true,
            onDropChoice: function () {
              log('[onDropChoice]', arguments);
            }
          });
        } else {
          const tv = Object.assign({}, s, {
            onDropChoice: function () {
              log('[onDropChoice]', arguments);
            }
          });
          out.push(tv);
        }
      }
      return out;
    }

    this.buildChoiceView = () => {
      const { model } = this.props;
      return model.choices.map(c => {
        const placed = this.isChoicePlaced(c)
        if (placed && c.moveOnDrag) {
          return {
            blank: true
          }
        } else {
          const out = Object.assign({}, c, {
            disabled: model.disabled
          });
          return out;
        }
      });
    }
  }


  render() {
    const { classes, model, session } = this.props;

    const showToggle = model.correctResponse && model.correctResponse.length > 0;

    const choiceView = this.buildChoiceView();

    const targetView = this.buildTargetView();

    log('[render] targetView', targetView);

    const viewModel = new ViewModel(model.choices, session.value, { disabled: model.disabled }, this.props.onSessionChange);

    return <div className={classes.placementOrdering}>
      <CorrectAnswerToggle
        show={showToggle}
        toggled={this.state.showingCorrect}
        onToggle={this.toggleCorrect} />

      {/* <CustomDragLayer /> */}
      <div className={classes.prompt}
        dangerouslySetInnerHTML={{ __html: model.prompt }}></div>

      <div className={classes.choicesAndTargets}>
        {choiceView.map((c, index) => <NewDraggableChoice {...c} key={index} />)}
        {targetView.map((t, index) => <NewDropTarget {...t} key={index} />)}
      </div>
    </div>;
  }
}

const styles = {
  prompt: {
    padding: '5px'
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