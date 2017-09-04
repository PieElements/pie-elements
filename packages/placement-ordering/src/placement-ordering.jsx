import { CSSTransitionGroup } from 'react-transition-group';
import CorrectAnswerToggle from '@pie-libs/correct-answer-toggle';
import DraggableChoice from './DraggableChoice.jsx';
import DroppableTarget from './DroppableTarget.jsx';
import React from 'react';
import classNames from 'classnames';
import find from 'lodash/find';
import injectSheet from 'react-jss';
import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';
import uniqueId from 'lodash/uniqueId';
const choiceWidth = 150;

const styles = {
  choicesContainer: {
    position: 'relative'
  },
  prompt: {
    padding: '5px'
  },
  placeHolderChoices: {
    opacity: 0.0,
    pointerEvents: 'none'
  },

  choicesAndTargetsTable: {
    margin: '0 auto',
    '& td': {
      verticalAlign: 'top'
    },
    choiceColumn: {
      width: `${choiceWidth + 30}px`
    },

    '& .choice': {
      cursor: 'pointer',
      marginBottom: '0px',
      boxShadow: '2px 2px 3px 0 rgba(0,0,0,0.18)',
      background: '#fff',
      border: '1px solid #f1f1f4',
      textAlign: 'center',
      marginBottom: '20px',
      minHeight: '55px',
      width: `${choiceWidth}px`,
      position: 'relative',
      transition: 'background 100ms linear',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '&[disabled]': {
        cursor: 'not-allowed',
        color: 'rgba(0,0,0,0.6)',
        border: 'solid 1px rgba(0,0,0,0.2)',
        background: 'rgba(0,0,0,0.1)'
      },
      '&.correct': {
        border: '2px solid green'
      },

      '&.incorrect': {
        border: '2px solid orange'
      },
      '&.placeholder': {
        opacity: 0,
        cursor: 'inherit'
      }
    },

    '& .target': {
      background: '#f8f6f6',
      boxShadow: 'inset 3px 4px 2px 0 rgba(0,0,0,0.08)',
      border: '1px solid #c2c2c2',
      borderRightColor: '#e9e9e9',
      borderBottomColor: '#e9e9e9',
      minHeight: '55px',
      minWidth: `${choiceWidth}px`,
      marginBottom: '18px',

      '& .choice': {
        marginBottom: '0px'
      },

      '&.over': {
        backgroundColor: '#ddd'
      }
    }
  },

  choicesWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  choiceColumn: {
    width: `${choiceWidth + 30}px`,

  },
  placeholder: {
    opacity: 0.2,
    '&:hover': {
      cursor: 'inherit'
    }
  }
};


export const Choice = ({ componentId, disabled, isDroppedAlready, choice, index }) => {
  return (isDroppedAlready && choice.moveOnDrag) ?
    <div className="choice placeholder" key={index}></div> :
    <DraggableChoice
      choiceId={choice.id}
      text={choice.label}
      key={index}
      index={index}
      componentId={componentId}
      disabled={disabled} />
}


export class PlacementOrdering extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order: isEmpty(props.session.value) ? [] : props.session.value,
      showingCorrect: false
    };
    this.componentId = uniqueId();
    this.onDropChoice = this.onDropChoice.bind(this);
    this.onDragInvalid = this.onDragInvalid.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.model.correctResponse) {
      this.setState({ showingCorrect: false });
    }
  }

  toggleCorrect(val) {
    this.setState({ showingCorrect: val });
  }

  onDropChoice(choiceId, index, sourceId) {
    let choice = this.props.model.choices.find(({ id }) => id === choiceId);
    this.state.order[index] = choiceId;
    for (var i = 0; i < this.state.order.length; i++) {
      if (i !== index && this.state.order[i] === choiceId) {
        if (sourceId === i || choice.moveOnDrag !== false) {
          this.state.order[i] = null;
        }
      }
    }
    this.setState({ order: this.state.order });
    this.props.session.value = this.state.order;
    this.props.sessionChanged();
  }

  onDragInvalid(choiceId, index) {
    this.state.order[index] = null;
    this.setState({ order: this.state.order });
    this.props.session.value = this.state.order;
    this.props.sessionChanged();
  }

  render() {

    let { className, classes, model } = this.props;

    classes = classes || {};
    let templateIf = (predicate) => {
      return (template, otherTemplate) => {
        return predicate ? template : otherTemplate;
      };
    };

    const toChoice = (choice, index) => {
      const isDroppedAlready = some(this.state.order, (t) => t === choice.id);
      return <Choice
        key={index}
        componentId={this.componentId}
        index={index}
        choice={choice}
        isDroppedAlready={isDroppedAlready}
        disabled={model.disabled} />;
    }

    const { showingCorrect, order } = this.state;

    const toTarget = (val, idx) => {
      const choiceId = showingCorrect ? model.correctResponse[idx] : order[idx];
      const choice = find(model.choices, c => c.id === choiceId);
      const outcome = showingCorrect ? { outcome: 'correct' } : (find(model.outcomes, c => c.id === choiceId) || {});

      return <DroppableTarget
        key={idx}
        index={idx}
        targetId={val.id}
        componentId={this.componentId}
        onDropChoice={this.onDropChoice}>
        {choice ?
          <DraggableChoice
            disabled={model.disabled}
            text={(choice || {}).label}
            key={idx}
            index={idx}
            sourceId={idx}
            choiceId={choiceId}
            outcome={outcome.outcome}
            componentId={this.componentId}
            onDragInvalid={this.onDragInvalid} /> :
          <div className="choice placeholder" key={idx}></div>}
      </DroppableTarget>
    }


    const names = classNames(classes.root, className);

    let answerTable = (className, key) => {
      return <div className={className} key={key}>
        <table className={classes.choicesAndTargetsTable}>
          <tbody>
            <tr>
              {!model.correctResponse && <td className={classes.choiceColumn}>{model.choices.map(toChoice)}</td>}
              <td>{(model.choices || []).map(toTarget)}</td>
            </tr>
          </tbody>
        </table>
      </div>;
    };

    const showToggle = model.correctResponse && model.correctResponse.length > 0;

    return (
      <div className={names}>

        <div className={classes.prompt}
          dangerouslySetInnerHTML={{ __html: model.prompt }}></div>

        <CorrectAnswerToggle
          show={showToggle}
          toggled={this.state.showingCorrect}
          onToggle={this.toggleCorrect.bind(this)} />

        <div className={classes.choicesContainer}>
          {answerTable(classes.placeHolderChoices)}
          {/*TODO: add transitions back in*/}
          {answerTable(classes.choicesWrapper, 1)}
        </div>
      </div>
    );
  }
}

PlacementOrdering.propTypes = {
  model: React.PropTypes.object,
  session: React.PropTypes.object,
  sessionChanged: React.PropTypes.func.isRequired
};

PlacementOrdering.defaultProps = {
  session: {
    value: []
  }
};

export default injectSheet(styles)(PlacementOrdering);