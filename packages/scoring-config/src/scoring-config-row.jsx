import { createStyleSheet, withStyles } from 'material-ui/styles';

import ActionDelete from 'material-ui-icons/Delete';
import Button from 'material-ui/Button';
import Decimal from 'decimal.js';
import IconButton from 'material-ui/IconButton';
import NumberTextField from './number-text-field';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import isEmpty from 'lodash/isEmpty';

export const defaultPercent = 0.2;

export class ScoringConfigRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = this._toState(props);
  }

  componentWillReceiveProps(props) {
    this.setState(this._toState(props));
  }

  _toState(props) {
    return {
      partialScoring: (props.partialScoring === undefined || isEmpty(props.partialScoring)) ? [
        {
          correctCount: '',
          weight: ''
        }
      ] : props.partialScoring.map(({ correctCount, weight }) => {
        return {
          correctCount: correctCount,
          weight: new Decimal(weight).mul(100).toNumber()
        };
      })
    };
  }

  _fromState(partialScoring) {
    return partialScoring.filter((partialScoring) => !this._isInProgress(partialScoring)).map((partialScoring) => {
      return {
        correctCount: partialScoring.correctCount,
        weight: new Decimal(partialScoring.weight).div(100).toNumber()
      };
    });
  }

  _isInProgress({ correctCount, weight }) {
    return correctCount === '' || weight === '';
  }

  addScoringScenario() {
    let self = this;
    function findMaxcorrectCountInScoringScenarios() {
      let maxcorrectCount = 0;
      each(self.state.partialScoring, (ps) => {
        if (ps.correctCount > maxcorrectCount) {
          maxcorrectCount = ps.correctCount;
        }
      });
      return maxcorrectCount;
    }

    let maxcorrectCount = findMaxcorrectCountInScoringScenarios();
    this.state.partialScoring.push(this._makeScenario(maxcorrectCount + 1, defaultPercent * 100));
    this._updateScoring(this.state.partialScoring);
  }


  removeScoringScenario(index) {
    this.state.partialScoring.splice(index, 1);
    this._updateScoring(this.state.partialScoring);
  }

  _updateScoring(newScoring) {
    this.props.onPartialScoringChange(this._fromState(newScoring));
  }

  _makeScenario(correctCount, weight) {
    return {
      correctCount: correctCount,
      weight: weight
    };
  }

  _onUpdate(index, value, key) {
    let update = cloneDeep(this.state.partialScoring);
    let newScoring = update[index];
    this.state.partialScoring[index][key] = value;
    try {
      if (value === '') {
        update.splice(index, 1);
      } else {
        newScoring[key] = parseFloat(value);
      }
      if (!this._isInProgress(newScoring)) {
        this._updateScoring(update);
      }
    } catch (e) {
      console.log('error', e);
    }
  }

  onNumberOfCorrectChange(index, event, value) {
    this._onUpdate(index, value, 'correctCount');
  }

  onPercentageChange(index, event, value) {
    this._onUpdate(index, value, 'weight');
  }

  render() {

    const { classes, numberOfCorrectResponses } = this.props;
    const { partialScoring } = this.state;
    const maxNumberOfScoringScenarios = Math.max(1, numberOfCorrectResponses - 1);
    const canRemoveScoringScenario = partialScoring.length > 1;
    const canAddScoringScenario = partialScoring.length < maxNumberOfScoringScenarios;

    return (
      <div>
        {this.state.partialScoring &&
          <ul className={classes.scenarios}>{
            this.state.partialScoring.map((scenario, index) => {
              return <li key={index}>
                Award <NumberTextField
                  id={`weight-${index}`}
                  min={1}
                  name={`weight-${index}`}
                  max={99}
                  value={scenario.weight}
                  onChange={this.onPercentageChange.bind(this, index)} />% for
                <NumberTextField
                  id={`correct-count-${index}`}
                  min={1}
                  name={`correct-count-${index}`}
                  max={maxNumberOfScoringScenarios}
                  value={scenario.correctCount}
                  onChange={this.onNumberOfCorrectChange.bind(this, index)} />
                correct answer{scenario.correctCount > 1 ? 's' : ''}.
                {canRemoveScoringScenario &&
                  <IconButton
                    onClick={this.removeScoringScenario.bind(this, index)}><ActionDelete /></IconButton>}
              </li>
            })
          }</ul>}

        {canAddScoringScenario &&
          <div>
            <hr />
            <Button
              raised
              color="primary"
              onClick={this.addScoringScenario.bind(this)}>Add another scenario</Button>
          </div>}
      </div>
    );
  }

}

const styles = createStyleSheet('ScoringConfigRow', theme => {
  return {
    scenarios: {
      listStyleType: 'none',
      padding: '0',
      margin: '0 0 0 15px'
    }
  }
});

export default withStyles(styles)(ScoringConfigRow);