import CSSTransition from 'react-transition-group/CSSTransition';
import { CorrectResponse } from '@pie-libs/icons';
import Expander from './expander';
import React from 'react';
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import merge from 'lodash/merge';
//require('./index.less');

/**
 * We export the raw unstyled class for testability. For public use please use the default export.
 */
export default class CorrectAnswerToggle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: props.show
    }
  }

  onClick() {
    this.props.onToggle(!this.props.toggled);
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    });
  }

  render() {

    return (
      <div className={`correct-answer-toggle ${this.props.className || ''}`}>
        <Expander
          show={this.state.show}
          class="toggle-expander">
          <div className="icon-and-label" onClick={this.onClick.bind(this)} >
            <div className="icons">
              <CSSTransition
                timeout={400}
                in={this.props.toggled}
                classNames="icon">
                <div className={this.props.toggled ? 'show' : 'hide'}>
                  <CorrectResponse open={true} key="correct-open" />
                </div>
              </CSSTransition>
              <CSSTransition
                timeout={5000}
                in={!this.props.toggled}
                classNames="icon">
                <div className={!this.props.toggled ? 'show' : 'hide'}>
                  <CorrectResponse open={false} key="correct-closed" />
                </div>
              </CSSTransition>
            </div>
            <div className="label">{this.props.toggled ? this.props.hideMessage : this.props.showMessage}</div>
          </div>
        </Expander >
      </div >
    );
  }
}

CorrectAnswerToggle.propTypes = {
  onToggle: React.PropTypes.func,
  toggled: React.PropTypes.bool,
  show: React.PropTypes.bool,
  hideMessage: React.PropTypes.string,
  showMessage: React.PropTypes.string
};

CorrectAnswerToggle.defaultProps = {
  showMessage: 'Show correct answer',
  hideMessage: 'Hide correct answer',
  show: false,
  toggled: false
};
