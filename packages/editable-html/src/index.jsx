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

export class EditableHTML extends React.Component {

  constructor(props) {
    super(props);
    const content = this.props.model === undefined ? '' : this.props.model;
    this.state = {
      showToolbar: false,
      active: false,
      hasText: !isEmpty(content),
      editorState: EditorState.createWithContent(stateFromHTML(content))
    };
    this.onStyle = this.onStyle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onEditorBlur = this.onEditorBlur.bind(this);
    this.toggleHtml = this.toggleHtml.bind(this);
  }

  onChange(editorState) {
    const content = stateToHTML(editorState.getCurrentContent());
    this.setState({ editorState });
    this.setState({
      hasText: !isEmpty(content)
    });
    this.props.onChange(content);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState)
    }
  }

  onEditorBlur() {
    this.blurTimeoutId = setTimeout(() => {
      this.setState({
        active: false
      });
    }, 200);
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
    const { classes } = this.props;
    return (<div>{
      this.state.active === true ? (
        <div className={classes.root}>
          <Toolbar
            onStyle={this.onStyle} />
          <div className={classes.editor}>
            <Editor
              onBlur={this.onEditorBlur}
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange} />
          </div>
        </div>
      ) : (
          this.state.hasText ? (
            <div dangerouslySetInnerHTML={{ __html: stateToHTML(this.state.editorState.getCurrentContent()) }}
              onClick={this.toggleHtml}></div>
          ) : (
              <div onClick={this.toggleHtml}>{this.props.placeholder}</div>
            )
        )
    }</div>);
  }

}

export default injectSheet(style)(EditableHTML);
