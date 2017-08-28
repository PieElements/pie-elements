import { Block, Editor, Html, Raw } from 'slate';
import { plugins, serializationRules } from './plugins';

import React from 'react';
import Toolbar from './toolbar';
import debug from 'debug';
import injectSheet from 'react-jss';

const log = debug('editable-html:rte');

const serializer = new Html({ rules: serializationRules });

class RichText extends React.Component {

  constructor(props) {
    super(props);


    this.insertImage = (src) => {
      const { editorState, onChange } = this.props;
      const transform = editorState.transform()

      const update = transform
        .insertBlock({
          type: 'image',
          isVoid: true,
          data: { src }
        })
        .apply();

      onChange(update);
    }


    this.onToggleMark = (type) => {
      log('[onToggleMark] type: ', type);
      let { editorState } = this.props;

      editorState = editorState
        .transform()
        .toggleMark(type)
        .apply()

      this.props.onChange(editorState);
    }

    this.insertMath = () => {

      const { editorState } = this.props;

      const math = inlineMath();

      const newState = editorState
        .transform()
        .insertInline(math)
        .apply();

      this.props.onChange(newState);

    }
  }


  render() {
    const { classes, editorState, addImage, onDone, readOnly } = this.props;
    return (
      <div className={classes.root}>
        <Editor
          spellCheck
          placeholder={'Enter some rich text...'}
          schema={{}}
          plugins={plugins}
          readOnly={readOnly}
          state={this.props.editorState}
          onChange={this.props.onChange}
          onKeyDown={this.onKeyDown}
        />
        {!readOnly && <Toolbar
          editorState={editorState}
          onToggleMark={this.onToggleMark}
          onImageClick={() => addImage(this.insertImage)}
          onInsertMath={this.insertMath}
          onDone={onDone} />}
      </div>
    )
  }
}

export const htmlToState = html => serializer.deserialize(html)

export const stateToHtml = (state) => serializer.serialize(state);


const style = {
  root: {
    border: '1px solid #cccccc',
    borderRadius: '0px',
    cursor: 'text',
    '& [data-slate-editor="true"]': {
      overflow: 'scroll',
      maxHeight: '500px',
    }
  },
  editor: {
    padding: '8px',
    background: '#ffffff'
  }
}

export default injectSheet(style)(RichText);
