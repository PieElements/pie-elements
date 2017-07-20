import { createStyleSheet, withStyles } from 'material-ui/styles';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

const stylesheet = createStyleSheet('feedback-tick', theme => {
  return {
    incorrect: {
      fill: 'var(--feedback-incorrect-bg-color, orange)'
    },
    correct: {
      fill: 'var(--feedback-correct-bg-color, green)'
    }
  }
});

class FeedbackTick extends React.Component {


  constructor(props) {
    super(props);
    this.incorrectIcon = <svg key="1"
      preserveAspectRatio="xMinYMin meet"
      x="0px"
      y="0px"
      viewBox="0 0 44 40"
      style={{ "enableBackground": "new 0 0 44 40" }}>
      <g>
        <rect x="11"
          y="17.3"
          transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.852 19.2507)"
          className={this.props.classes.incorrect}
          width="16.6"
          height="3.7"></rect>
        <rect x="17.4"
          y="10.7"
          transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.8175 19.209)"
          className={this.props.classes.incorrect}
          width="3.7"
          height="16.6"></rect>
      </g>
    </svg>;

    this.correctIcon = <svg key="2"
      preserveAspectRatio="xMinYMin meet"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 44 40"
      style={{ "enableBackground": "new 0 0 44 40" }}>
      <polygon className={this.props.classes.correct}
        points="19.1,28.6 11.8,22.3 14.4,19.2 17.9,22.1 23.9,11.4 27.5,13.4"></polygon>
    </svg>;

  }

  render() {
    var correctness = this.props.correctness;

    const icon = (() => {
      if (correctness === 'incorrect') {
        return this.incorrectIcon;
      } else if (correctness === 'correct') {
        return this.correctIcon;
      }
    })();
    console.log('icon: ', icon)

    return (
      <div className="feedback-tick">
        <ReactCSSTransitionGroup
          transitionName="feedback-tick"
          transitionEnterTimeout={700}
          transitionLeaveTimeout={300}>
          {icon}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

FeedbackTick.propTypes = {
  correctness: React.PropTypes.string
}

export default withStyles(stylesheet)(FeedbackTick);