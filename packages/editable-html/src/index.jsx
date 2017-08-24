import TextEditor, { htmlToState, stateToHtml } from './rte';

import { Raw } from 'slate';
import React from 'react';
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
        readOnly: true
      });
    }
  }

  render() {
    const { classes, placeholder, className, onImageClick, html } = this.props;
    const { editorState, readOnly } = this.state;
    log('[render] readOnly: ', readOnly);
    return (
      <div className={className}
        onClick={this.onClick}>
        <TextEditor
          readOnly={readOnly}
          editorState={editorState}
          onChange={(editorState) => this.setState({ editorState })}
          onDone={this.onEditingDone}
          addImage={onImageClick} />
      </div>
    );
  }
}

const style = {
  root: {
    border: '1px solid #cccccc',
    borderRadius: '0px',
    cursor: 'text'
  },
  editor: {
    padding: '8px',
    background: '#ffffff'
  }
}


export default injectSheet(style)(EditableHTML);
