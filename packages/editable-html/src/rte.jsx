import { Block, Editor, Html, Raw } from 'slate';
import { buildPlugins, serializationRules } from './plugins';

import React from 'react';
import Toolbar from './toolbar';
import debug from 'debug';
import injectSheet from 'react-jss';
import { inlineMath } from './plugins/math';

const log = debug('editable-html:rte');

const serializer = new Html({ rules: serializationRules, defaultBlockType: 'div' });

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

    this.plugins = buildPlugins({
      image: {
        onDelete: this.props.onDeleteImage
      }
    })
  }


  render() {
    const { classes, editorState, addImage, onDone, readOnly } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.editorHolder}>
          <Editor
            spellCheck
            placeholder={'Enter some rich text...'}
            schema={{}}
            plugins={this.plugins}
            readOnly={readOnly}
            state={this.props.editorState}
            onChange={this.props.onChange}
            onKeyDown={this.onKeyDown}
          />
        </div>
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
    padding: '0px',
    border: '1px solid #cccccc',
    borderRadius: '0px',
    cursor: 'text',
    '& [data-slate-editor="true"]': {
      overflow: 'scroll',
      maxHeight: '500px',
    }
  },
  editorHolder: {
    padding: '10px'
  },
  editor: {
    padding: '8px',
    background: '#ffffff'
  }
}

export default injectSheet(style)(RichText);
