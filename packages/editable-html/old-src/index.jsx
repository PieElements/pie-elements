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
      focus: false
    }

    this.onClick = () => {
      log('onClick');
      this.setState({ focus: true });
    }

    this.onEditingDone = () => {
      const markup = stateToHtml(this.state.editorState);
      this.props.onChange(markup);
    }

    this.onBlur = () => {
      // this.setState({ focus: false });
      this.onEditingDone();
    }

    this.onFocus = () => {
      // this.setState({ focus: true });
    }

    this.onChange = (change) => {
      log('[onChange]', change);
      this.setState({ editorState: change.value });
    }
  }

  componentWillReceiveProps(props) {
    if (props.markup !== this.props.markup) {
      this.setState({
        focus: false,
        editorState: htmlToState(props.markup)
      });
    }
  }

  render() {
    const { classes, placeholder, className, imageSupport, html } = this.props;
    const { editorState, focus } = this.state;

    log('[render] focus: ', focus);
    log('editorState: ', editorState);
    const rootNames = classNames(classes.editableHtml, className);
    return (
      <div className={rootNames} onClick={this.onClick}>
        <TextEditor
          ref={r => this.editor = r}
          editorState={editorState}
          onChange={this.onChange}
          onDone={this.onEditingDone}
          imageSupport={imageSupport}
          onBlur={this.onBlur}
          onFocus={this.onFocus} />
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

  }
}


export default injectSheet(style)(EditableHTML);