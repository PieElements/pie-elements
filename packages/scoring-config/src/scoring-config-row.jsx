import { createStyleSheet, withStyles } from 'material-ui/styles';

import ActionDelete from 'material-ui-icons/Delete';
import Button from 'material-ui/Button';
import Decimal from 'decimal.js';
import IconButton from 'material-ui/IconButton';
import NumberTextField from './number-text-field';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from 'material-ui/Typography';
import cloneDeep from 'lodash/cloneDeep';

export const defaultPercent = 0.2;

const RawRow = ({ classes, scorePercentage, numberOfCorrect, onRowChange, deletable, onDelete, maxAnswers }) => {

  const onScoreChange = (event, scorePercentage) => onRowChange({ scorePercentage, numberOfCorrect });
  const onNumberOfCorrectChange = (event, numberOfCorrect) => onRowChange({ scorePercentage, numberOfCorrect });

  return <div className={classes.root}>
    Award <NumberTextField
      min={1}
      max={99}
      value={scorePercentage}
      onChange={onScoreChange} />% for
                <NumberTextField
      min={1}
      max={maxAnswers}
      value={numberOfCorrect}
      onChange={onNumberOfCorrectChange} />
    correct answer{numberOfCorrect > 1 ? 's' : ''}.
                {deletable && <IconButton
      onClick={onDelete}><ActionDelete /></IconButton>}
  </div>;
};

const rowStyles = createStyleSheet('Row', theme => ({
  root: {
    fontFamily: theme.typography.fontFamily
  }
}));

const Row = withStyles(rowStyles)(RawRow);

Row.propTypes = {
  numberOfCorrect: PropTypes.number.isRequired,
  scorePercentage: PropTypes.number.isRequired,
  onRowChange: PropTypes.func.isRequired,
  deletable: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  maxAnswers: PropTypes.number.isRequired
};

export class ScoringConfigRow extends React.Component {


  constructor(props) {
    super(props);
    this.toRow = this.toRow.bind(this);
    this.addRow = this.addRow.bind(this);
  }

  onRowChange(index, row) {
    const { partialScoring } = this.props;
    const ps = cloneDeep(partialScoring);
    ps.splice(index, 1, row);
    this.props.onChange(ps);
  }

  onDelete(index) {
    const { partialScoring } = this.props;
    const ps = cloneDeep(partialScoring);
    ps.splice(index, 1);
    this.props.onChange(ps);
  }

  toRow(ps, index) {
    const { partialScoring, numberOfCorrectResponses } = this.props;
    const onRowChange = this.onRowChange.bind(this, index);
    const onDelete = this.onDelete.bind(this, index);
    const maxAnswers = Math.max(1, numberOfCorrectResponses - 1);

    return <Row
      key={index}
      {...ps}
      onRowChange={onRowChange}
      deletable={partialScoring && partialScoring.length > 1}
      onDelete={onDelete}
      maxAnswers={maxAnswers}
    />;
  }

  addRow() {
    const { partialScoring, onChange } = this.props;
    const ps = cloneDeep(partialScoring);
    ps.push({
      numberOfCorrect: 1,
      scorePercentage: 50
    });
    onChange(ps);
  }

  render() {
    const { partialScoring, numberOfCorrectResponses } = this.props;
    const maxAnswers = Math.max(1, numberOfCorrectResponses - 1);
    const canAddRow = partialScoring.length < maxAnswers;

    return <div>{partialScoring.map(this.toRow)}
      {canAddRow &&
        <div>
          <hr />
          <Button
            raised
            color="primary"
            onClick={this.addRow}>Add another scenario</Button>
        </div>}
    </div>;
  }
}

const styles = createStyleSheet('ScoringConfigRow', theme => ({}));

const propTypes = {
  numberOfCorrectResponses: PropTypes.number.isRequired,
  partialScoring: PropTypes.arrayOf(PropTypes.shape({
    numberOfCorrect: PropTypes.number.isRequired,
    scorePercentage: PropTypes.number.isRequired
  }))
}

ScoringConfigRow.propTypes = propTypes;

const StyledConfigRow = withStyles(styles)(ScoringConfigRow);

ScoringConfigRow.propTypes = Object.assign({ classes: PropTypes.object.isRequired }, propTypes);

StyledConfigRow.propTypes = propTypes;

export default StyledConfigRow;