import ActionDelete from 'material-ui-icons/Delete';
import Button from 'material-ui/Button';
import Decimal from 'decimal.js';
import IconButton from 'material-ui/IconButton';
import { NumberTextField } from '@pie-libs/config-ui';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from 'material-ui/Typography';
import cloneDeep from 'lodash/cloneDeep';
import { withStyles } from 'material-ui/styles';

export const defaultPercent = 0.2;

const RawRow = ({ classes, scorePercentage, numberOfCorrect, onRowChange, deletable, onDelete, maxAnswers }) => {

  const onScoreChange = (event, scorePercentage) => onRowChange({ scorePercentage, numberOfCorrect });
  const onNumberOfCorrectChange = (event, numberOfCorrect) => onRowChange({ scorePercentage, numberOfCorrect });

  return <div className={classes.root}>
    Award <NumberTextField
      className={classes.field}
      min={1}
      max={99}
      value={scorePercentage}
      onChange={onScoreChange} />% for&nbsp;
                <NumberTextField
      className={classes.field}
      min={1}
      max={maxAnswers}
      value={numberOfCorrect}
      onChange={onNumberOfCorrectChange} />
    correct answer{numberOfCorrect > 1 ? 's' : ''}.
                {deletable && <IconButton
      onClick={onDelete}><ActionDelete /></IconButton>}
  </div>;
};

const rowStyles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily
  },
  field: {
    width: '30px'
  }
});

const Row = withStyles(rowStyles, { name: 'Row' })(RawRow);

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

    //all partial score options can be deleted.

    return <Row
      key={index}
      {...ps}
      onRowChange={onRowChange}
      deletable={true}
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
    const canAddRow = partialScoring ? partialScoring.length < maxAnswers : true;

    return <div>{partialScoring.map(this.toRow)}
      {canAddRow &&
        <div>
          <hr />
          <Button
            raised
            color="primary"
            onClick={this.addRow}>{partialScoring.length > 0 ? 'Add another scenario' : 'Add scenario'}</Button>
        </div>}
    </div>;
  }
}

const styles = {};

const propTypes = {
  numberOfCorrectResponses: PropTypes.number.isRequired,
  partialScoring: PropTypes.arrayOf(PropTypes.shape({
    numberOfCorrect: PropTypes.number.isRequired,
    scorePercentage: PropTypes.number.isRequired
  }))
}

ScoringConfigRow.defaultProps = {
  partialScoring: []
}

ScoringConfigRow.propTypes = propTypes;

const StyledConfigRow = withStyles(styles, { name: 'ScoringConfigRow' })(ScoringConfigRow);

ScoringConfigRow.propTypes = Object.assign({ classes: PropTypes.object.isRequired }, propTypes);

StyledConfigRow.propTypes = propTypes;

export default StyledConfigRow;