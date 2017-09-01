import CorrectAnswerToggle from '@pie-libs/correct-answer-toggle';
import DraggableChoice from './DraggableChoice';
import PropTypes from 'prop-types';
import React from 'react';
import compact from 'lodash/compact';
import { withStyles } from 'material-ui/styles';

export const Choice = (props) => {
  return <pre style={{ border: 'solid 1px red' }}>{JSON.stringify(props)}</pre>
}

// const DraggableChoice = mkDraggable(Choice);


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

    return <div className={classes.placementOrdering}>
      <CorrectAnswerToggle
        show={showToggle}
        toggled={this.state.showingCorrect}
        onToggle={this.toggleCorrect} />
      <div className={classes.prompt}
        dangerouslySetInnerHTML={{ __html: model.prompt }}></div>

      <div className={classes.choicesAndTargets}>
        <div className={classes.choices}>
          {choiceView.map((c, index) => <Choice {...c} key={index} />)}
        </div>
        <div className={classes.targets}>
          targets
        </div>
      </div>
    </div>;
  }
}

const styles = {
  prompt: {
    padding: '5px'
  },
  choicesAndTargets: {
    display: 'flex'
  },
  choices: {
    backgroundColor: 'magenta'
  },
  targets: {
    backgroundColor: 'lightblue'
  }
}

export default withStyles(styles)(PlacementOrdering);