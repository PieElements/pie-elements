import TextEditor, { ImageSupportType, htmlToState, stateToHtml } from './rte';

import PropTypes from 'prop-types';
import { Raw } from 'slate';
import React from 'react';
import classNames from 'classnames';
import debug from 'debug';
import injectSheet from 'react-jss';

const log = debug('editable-html');

const Preview = ({ onClick, hasText, markup, placeholder }) => {
  const html = hasText ? markup() : placeholder;
  return <div
    onClick={onClick}
    dangerouslySetInnerHTML={{ __html: html }}></div>;
};

class EditableHTML extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editorState: htmlToState(props.markup),
      readOnly: true
    }

    this.onClick = () => {
      log('onClick');
      if (this.state.readOnly === true) {
        this.setState({ readOnly: false });
      }
    }

    this.onEditingDone = () => {
      this.setState({ readOnly: true });
      const markup = stateToHtml(this.state.editorState);
      this.props.onChange(markup);
    }
  }

  componentWillReceiveProps(props) {
    if (props.markup !== this.props.markup) {
      this.setState({
        readOnly: true,
        editorState: htmlToState(props.markup)
      });
    }
  }

  render() {
    const { classes, placeholder, className, imageSupport, html } = this.props;
    const { editorState, readOnly } = this.state;

    const rootNames = classNames(classes.editableHtml, className);
    return (
      <div className={rootNames}
        onClick={this.onClick}>
        <TextEditor
          readOnly={readOnly}
          editorState={editorState}
          onChange={(editorState) => this.setState({ editorState })}
          onDone={this.onEditingDone}
          imageSupport={imageSupport}
        />
      </div>
    );
  }
}

EditableHTML.propTypes = {
  imageSupport: ImageSupportType
}

const style = {
  editableHtml: {
    cursor: 'text',
    position: 'relative',
    '&::after': {
      left: '0',
      right: '0',
      bottom: '0',
      height: '1px',
      content: '""',
      position: 'absolute',
      // transform: 'scaleX(0%)',
      transition: 'transform 200ms cubic-bezier(0.0, 0.0, 0.2, 1) 0ms',
      backgroundColor: 'rgba(0, 0, 0, 0.42)',
    },
    '&:hover': {
      '&::after': {
        backgroundColor: 'black',
        height: '2px'
      }
    }
  }
}


export default injectSheet(style)(EditableHTML);
