import { Checkbox, MultiLangInput } from '@pie-libs/config-ui';
import { DragSource, DropTarget } from 'react-dnd';

import { Delete } from 'material-ui-icons';
import IconButton from 'material-ui/IconButton';
import React from 'react';
import { DragSource as dragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const choiceSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
}

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

class ChoiceConfig extends React.Component {

  constructor(props) {
    super(props);
  }

  onLabelChange(value, lang) {
    this.props.onLabelChange(value, lang);
  }

  onMoveOnDragChange(event, value) {
    this.props.onMoveOnDragChange(!value);
  }

  render() {
    const { choice, connectDragSource, connectDropTarget, isDragging } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(connectDropTarget(<li className="choice-config" style={{ opacity: opacity }}>
      <MultiLangInput
        style={{ display: 'inline-block' }}
        placeholder="Enter a choice"
        value={choice.label}
        lang={this.props.activeLang}
        onChange={this.onLabelChange.bind(this)} />
      <IconButton style={{ flex: 1 }} onClick={this.props.onDelete.bind(this)}><Delete /></IconButton>
      <Checkbox label="Remove tile after placing" checked={choice.moveOnDrag === false} onChange={this.onMoveOnDragChange.bind(this)} />
    </li>));
  }

}

export default DropTarget('CHOICECONFIG', choiceTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(DragSource('CHOICECONFIG', choiceSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(ChoiceConfig));