import { createStyleSheet, withStyles, withTheme } from 'material-ui/styles';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classNames from 'classnames';

const styleSheet = createStyleSheet('Feedback', theme => {
  return {
    corespringFeedback: {
      transformOrigin: '0% 0px 0px',
      width: '100%',
      display: 'block',
      overflow: 'hidden',
      '&:.incorrect': {
        color: '#946202'
      }
    },
    content: {
      '-webkit-font-smoothing': 'antialiased',
      backgroundColor: 'var(--feedback-bg-color, grey)',
      borderRadius: '4px',
      fontFamily: "'Roboto', 'Noto', sans-serif",
      fontSize: '12px',
      lineHeight: '25px',
      margin: '0px',
      padding: '10px',
      verticalAlign: 'middle',
      color: 'var(--feedback-color, purple)'
    },
    correct: {
      backgroundColor: 'var(--feedback-correct-bg-color, blue)'
    },
    incorrect: {
      backgroundColor: 'var(--feedback-incorrect-bg-color, orange)'
    }
  }
});

export class Feedback extends React.Component {

  render() {
    const { correctness, feedback, classes, className } = this.props;

    function chooseFeedback(correctness) {
      if (correctness && feedback) {
        return <div
          key="hasFeedback"
          className={classNames(classes.corespringFeedback)}>
          <div className={classNames(classes.content, classes[correctness])}
            dangerouslySetInnerHTML={{ __html: feedback }}></div>
        </div>
      } else {
        return null;
      }
    }

    return <ReactCSSTransitionGroup
      transitionName="corespring-feedback"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={200}>
      {chooseFeedback(correctness)}
    </ReactCSSTransitionGroup>;

  }
}

Feedback.propTypes = {
  correctness: React.PropTypes.string,
  feedback: React.PropTypes.string
}


export default withStyles(styleSheet)(Feedback);