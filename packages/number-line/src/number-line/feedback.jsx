import {
  Correct,
  Incorrect,
  NothingSubmitted,
  PartiallyCorrect,
  ShowRationale
} from '@pie-libs/icons';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

require('./feedback.less');

let getIcon = (t) => {
  switch (t) {
    case 'unanswered': return NothingSubmitted;
    case 'correct': return Correct;
    case 'incorrect': return Incorrect;
    case 'partial': return PartiallyCorrect;
    case 'info': return ShowRationale;
    default:
      return undefined;
  }
}

const Feedback = (props) => {

  let className = classNames('feedback', props.type);
  let Icon = getIcon(props.type);

  return <ReactCSSTransitionGroup
    transitionName="fb"
    transitionAppear={true}
    transitionAppearTimeout={300}
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}>
    <div key="panel"
      className={className}
      style={{ width: props.width }}>
      <Icon iconSet="emoji" shape="square" />
      <span
        className="message"
        dangerouslySetInnerHTML={{ __html: props.message }}></span>
    </div>
  </ReactCSSTransitionGroup>;
}

export default Feedback;
