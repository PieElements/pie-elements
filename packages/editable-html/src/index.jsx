import TextEditor, { htmlToState, stateToHtml } from './rte';

import { Raw } from 'slate';
import React from 'react';
import injectSheet from 'react-jss';

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
      editorState: null
    }

    this.toggleHtml = () => {
      const { editorState } = this.state;
      if (editorState === null) {
        const newEditorState = htmlToState(this.props.markup);
        console.log('raw:', Raw.serialize(newEditorState));
        this.setState({ editorState: newEditorState });
      } else {
        const markup = stateToHtml(editorState);
        this.setState({ editorState: null });
        this.props.onChange(markup);
      }
    }
  }


  render() {
    const { classes, placeholder, className, onImageClick, html } = this.props;
    const { editorState } = this.state;
    return (
      <div className={className}>{
        editorState ?
          <TextEditor
            editorState={editorState}
            onChange={(editorState) => this.setState({ editorState })}
            addImage={onImageClick} /> :
          <Preview
            hasText={true}
            placeholder={placeholder}
            markup={() => this.props.markup}
            onClick={this.toggleHtml} />}
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
