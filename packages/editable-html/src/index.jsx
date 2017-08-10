import { Editor, EditorState, RichUtils } from 'draft-js';

import React from 'react';
import Toolbar from './toolbar';
import injectSheet from 'react-jss';
import isEmpty from 'lodash/isEmpty';
import { stateFromHTML } from 'draft-js-import-html';
import { stateToHTML } from 'draft-js-export-html';

const style = {
  root: {
    border: '1px solid #cccccc',
    borderRadius: '4px',
    cursor: 'text'
  },
  editor: {
    padding: '8px',
    background: '#ffffff'
  }
}

const getMarkup = (editorContent) => {
  const div = document.createElement('div');
  div.innerHTML = stateToHTML(editorContent);
  const out = div.firstChild.innerHTML;
  return out;
}

export class EditableHTML extends React.Component {

  constructor(props) {
    super(props);
    const content = this.props.model === undefined ? '' : this.props.model;
    const editorState = EditorState.createWithContent(stateFromHTML(content));

    const currentContent = editorState.getCurrentContent();

    this.state = {
      showToolbar: false,
      active: false,
      hasText: currentContent.hasText(),
      editorState
    };
    this.onStyle = this.onStyle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onEditorBlur = this.onEditorBlur.bind(this);
    this.toggleHtml = this.toggleHtml.bind(this);
  }

  onChange(editorState) {
    const currentContent = editorState.getCurrentContent();
    const markup = getMarkup(currentContent);
    this.setState({ editorState, hasText: currentContent.hasText() });
    this.props.onChange(markup);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState)
    }
  }

  onEditorBlur(event) {
    this.blurTimeoutId = setTimeout(() => {
      this.setState({
        active: false
      });
      this.blurTimeoutId = undefined;
    }, 140);
  }

  componentWillUnmount() {
    clearTimeout(this.blurTimeoutId);
  }

  onStyle(style) {
    if (this.blurTimeoutId) {
      clearTimeout(this.blurTimeoutId);
      this.blurTimeoutId = undefined;
    }
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  }

  toggleHtml() {
    if (this.state.active) {
      this.setState({
        active: false
      });
    } else {
      this.setState({
        active: true,
        editorState: EditorState.moveFocusToEnd(this.state.editorState)
      });
    }
  }

  render() {
    const { classes, placeholder, className } = this.props;
    const { editorState, hasText } = this.state;
    return (
      <div className={className}>{
        this.state.active ?
          <Active
            classes={classes}
            onStyle={this.onStyle}
            onBlur={this.onEditorBlur}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange} /> :
          <Preview
            hasText={hasText}
            placeholder={placeholder}
            markup={() => getMarkup(editorState.getCurrentContent())}
            onClick={this.toggleHtml} />}
      </div>
    );
  }
}

const Preview = ({ onClick, hasText, markup, placeholder }) => {
  const html = hasText ? markup() : placeholder;
  return <div
    onClick={onClick}
    dangerouslySetInnerHTML={{ __html: html }}></div>;
};

const Active = ({ classes, onStyle, onBlur, editorState, handleKeyCommand, onChange }) => (
  <div className={classes.root}>
    <Toolbar
      onStyle={onStyle} />
    <div className={classes.editor}>
      <Editor
        onBlur={onBlur}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange} />
    </div>
  </div>
)

export default injectSheet(style)(EditableHTML);
