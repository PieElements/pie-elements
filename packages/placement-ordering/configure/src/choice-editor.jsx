import { AddCircle } from 'material-ui-icons';
import { Checkbox } from '@pie-libs/config-ui';
import ChoiceTile from './choice-tile';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import debug from 'debug';
import { withStyles } from 'material-ui/styles';

const log = debug('pie-elements:configure:choice-editor');

class ChoiceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.moveChoice = (from, to) => {
      log('[moveChoice]: ', from, to);
    }
  }

  render() {
    const { classes, correctResponse, choices, activeLang } = this.props;

    const sortedChoices = correctResponse.map(cr => choices.find(c => c.id === cr.id));

    const allMoveOnDrag = true;

    return <div className={classes.choiceEditor}>
      {sortedChoices.map((c, index) => {
        return <ChoiceTile
          choice={c}
          activeLang={activeLang}
          onMoveChoice={this.moveChoice}
          onDelete={this.onDelete}
          onChoiceChange={this.onChoiceChange}
          key={index} />
      })}
      <div className={classes.controls}>
        <IconButton
          classes={{
            label: classes.label
          }}><AddCircle classes={{ root: classes.root }} />
        </IconButton>
        <Checkbox
          checked={allMoveOnDrag}
          onChange={this.toggleAllOnDrag}
          value="allMoveOnDrag"
          label="Remove all tiles after placing" />
      </div>
    </div>;
  }
}

ChoiceEditor.propTypes = {
  correctResponse: PropTypes.array.isRequired,
  choices: PropTypes.array.isRequired,
  onCorrectResponseChange: PropTypes.func.isRequired,
  onChoicesChange: PropTypes.func.isRequired
}

const styles = theme => ({
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  root: {
    width: '40px',
    height: '40px',
    fill: theme.palette.primary[500]
  },
  label: {
    transition: 'opacity 200ms linear',
    '&:hover': {
      opacity: 0.3
    }
  }
})

export default withStyles(styles)(ChoiceEditor);