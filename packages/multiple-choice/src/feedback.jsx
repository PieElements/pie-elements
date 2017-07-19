import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import muiThemeable from 'material-ui/styles/muiThemeable';

export class Feedback extends React.Component {

  getStyle(correctness) {

    let color = this.props.muiTheme.palette.textColor;
    if (correctness === 'correct') {
      color = this.props.muiTheme.correctColor;
    } else if (correctness === 'incorrect') {
      color = this.props.muiTheme.incorrectColor;
    }

    return {
      color: color,
      backgroundColor: this.props.muiTheme.palette.canvasColor
    };
  }

  render() {
    var self = this;
    var correctness = self.props.correctness;
    var feedback = self.props.feedback;

    function chooseFeedback(correctness) {
      if (correctness && feedback) {
        var feedbackClass = "corespring-feedback " + correctness;
        return <div
          key="hasFeedback"
          className={feedbackClass}>
          <div className="content"
            style={this.getStyle(correctness)} dangerouslySetInnerHTML={{__html: feedback}}></div>
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


export default muiThemeable()(Feedback);