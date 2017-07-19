import { createStyleSheet, withStyles, withTheme } from 'material-ui/styles';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classNames from 'classnames';

// 1. We define the styles.
const styleSheet = createStyleSheet('Feedback', theme => {
  console.log('theme in styles: ', theme);
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
      backgroundColor: '#f8f6f6',
      borderRadius: '4px',
      fontFamily: "'Roboto', 'Noto', sans-serif",
      fontSize: '12px',
      lineHeight: '25px',
      margin: '0px',
      padding: '10px',
      verticalAlign: 'middle'
    },
    correct: {
      backgroundColor: theme.mc.correctColor,
    },
    incorrect: {
      backgroundColor: theme.mc.incorrectColor,
    }
  }
});

export class Feedback extends React.Component {

  // getStyle(correctness) {

  //   let color = this.props.muiTheme.palette.textColor;
  //   if (correctness === 'correct') {
  //     color = this.props.muiTheme.correctColor;
  //   } else if (correctness === 'incorrect') {
  //     color = this.props.muiTheme.incorrectColor;
  //   }

  //   return {
  //     color: color,
  //     backgroundColor: this.props.muiTheme.palette.canvasColor
  //   };
  // }

  render() {
    const { correctness, feedback, classes, className, theme } = this.props;

    console.log('theme in render: ', theme);
    function chooseFeedback(correctness) {
      if (correctness && feedback) {
        var feedbackClass = "corespring-feedback " + correctness;
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
      {chooseFeedback.bind(this)(correctness)}
    </ReactCSSTransitionGroup>;

  }
}

Feedback.propTypes = {
  correctness: React.PropTypes.string,
  feedback: React.PropTypes.string
}


export default withTheme(withStyles(styleSheet)(Feedback));