import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DragSource as dragSource } from 'react-dnd';
import { withStyles } from 'material-ui/styles';

const choiceSource = {
  beginDrag(props) {
    return {
      id: props.choiceId,
      sourceId: props.sourceId,
    };
  },

  canDrag(props) {
    console.log('canDrag: ', props);
    return !props.disabled;
  },

  endDrag(props, monitor) {
    if (props.onDragInvalid && !monitor.didDrop()) {
      props.onDragInvalid(props.choiceId, props.index);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class DraggableChoice extends Component {
  render() {
    const { connectDragSource, isDragging, text, classes } = this.props;
    let className = classNames(classes.draggableChoice, isDragging && classes.dragging);
    // "choice " + (isDragging ? 'dragging' : '') + (this.props.outcome || '');
    return connectDragSource(
      <div
        className={className}
        disabled={this.props.disabled}>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
    );
  }
}

const styles = {
  draggableChoice: {

  },
  dragging: {

  }
}

const Styled = withStyles(styles)(DraggableChoice);

DraggableChoice.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  // index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  outcome: PropTypes.string,
  choiceId: PropTypes.string.isRequired,
  // componentId: PropTypes.string.isRequired,
  onDragInvalid: PropTypes.func
};

export default dragSource('CHOICE', choiceSource, collect)(Styled);