import { Checkbox, MultiLangInput } from '@pie-libs/config-ui';
import { DragSource, DropTarget } from 'react-dnd';

import IconButton from 'material-ui/IconButton';
import React from 'react';
import { RemoveCircle } from 'material-ui-icons';
import { DragSource as dragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { withStyles } from 'material-ui/styles';

class ChoiceTile extends React.Component {

  constructor(props) {
    super(props);
    this.onLabelChange = (value, lang) => {
      const { choice, onChoiceChange } = this.props;
      //TODO map update to lang..
      onChoiceChange(choice);
    }

    this.onMoveOnDragChange = (event, value) => {
      const { choice, onChoiceChange } = this.props;
      choice.moveOnDrag = value;
      onChoiceChange(choice);
    }
  }

  render() {
    const { choice,
      connectDragSource,
      connectDropTarget,
      isDragging,
      classes,
      activeLang,
      onDelete } = this.props;

    const opacity = isDragging ? 0 : 1;
    const markup = (
      <div className={classes.choiceTile} style={{ opacity: opacity }}>
        <MultiLangInput
          style={{ display: 'inline-block' }}
          placeholder="Enter a choice"
          value={choice.label}
          lang={activeLang}
          onChange={this.onLabelChange} />
        <div className={classes.controls}>
          <Checkbox label="Remove tile after placing"
            checked={choice.moveOnDrag === false}
            onChange={this.onMoveOnDragChange} />
          <IconButton
            color="primary"
            onClick={onDelete}><RemoveCircle classes={{
              root: classes.removeCircle
            }} /></IconButton>
        </div>
      </div>);

    return connectDragSource(
      connectDropTarget(markup)
    );
  }

}

const Styled = withStyles((theme) => ({
  removeCircle: {
    fill: theme.palette.error[500]
  },
  choiceTile: {
    border: '1px solid #c2c2c2',
    marginTop: '5px',
    marginBottom: '5px',
    padding: '5px'
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))(ChoiceTile);

const NAME = 'choice-config';

const choiceSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
}

const StyledSource = DragSource(
  NAME,
  choiceSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Styled);


const choiceTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    }
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    props.moveChoice(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
}

const StyledSourceAndTarget = DropTarget(
  NAME,
  choiceTarget,
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(StyledSource);

export default StyledSourceAndTarget;