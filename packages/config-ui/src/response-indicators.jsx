import React from 'react';
import PropTypes from 'prop-types';
import * as icons from '@pie-libs/icons';
import Popover from 'material-ui/Popover';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Feedback from './feedback';

const styles = theme => ({
  paper: {
    padding: '0',
    borderRadius: '4px'
  },
  iconHolder: {
    cursor: 'pointer'
  },
  popover: {
    cursor: 'pointer'
  },
  popperClose: {
    cursor: 'pointer'
  },
});

const BuildIndicator = (Icon, correctness) => {
  class RawIndicator extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
      }
    }

    componentDidMount() {
      this.setState({ anchorEl: this.icon });
    }

    handlePopoverOpen = event => {
      this.setState({ anchorEl: event.target });
    };

    handlePopoverClose = () => {
      this.setState({ anchorEl: null });
    };

    render() {
      const { feedback, classes } = this.props;
      const { anchorEl } = this.state;
      return (
        <div>
          <span
            ref={r => this.icon = r}
            onClick={this.handlePopoverOpen}
            className={classes.iconHolder} ><Icon /></span>

          <Popover
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={!!anchorEl}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={this.handlePopoverClose}>
            <Feedback feedback={feedback} correctness={correctness} />
          </Popover>
        </div>
      );
    }
  }

  RawIndicator.propTypes = {
    feedback: PropTypes.string,
    classes: PropTypes.object.isRequired
  }

  return withStyles(styles)(RawIndicator);
}

export const Correct = BuildIndicator(icons.Correct, 'correct');
export const Incorrect = BuildIndicator(icons.Incorrect, 'incorrect');
export const PartiallyCorrect = BuildIndicator(icons.PartiallyCorrect, 'partially-correct');
export const NothingSubmitted = BuildIndicator(icons.NothingSubmitted, 'nothing-submitted');