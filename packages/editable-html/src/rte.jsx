import { Block, Editor, Html, Raw } from 'slate';
import { buildPlugins, serializationRules } from './plugins';

import React from 'react';
import Toolbar from './toolbar';
import debug from 'debug';
import injectSheet from 'react-jss';
import { inlineMath } from './plugins/math';

const log = debug('editable-html:rte');
const logError = debug('editable-html:rte');
logError.log = console.error.bind(console);

const serializer = new Html({
  rules: serializationRules,
  defaultBlockType: 'div'
});

class RichText extends React.Component {

  constructor(props) {
    super(props);

    this.insertImage = (err, src) => {
      if (err) {
        logError(err);
      } else {
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

    this.addImage = () => {
      const { editorState, onChange } = this.props;
      const block = Block.create({
        type: 'image',
        isVoid: true,
        data: {
          loaded: false,
          src: undefined
        }
      });

      let newState = editorState
        .transform()
        .insertBlock(block)
        .apply();

      onChange(newState);

      const handler = {
        cancel: () => {
          log('insert cancelled');
        },
        done: (err, src) => {
          log('done: err:', err);
          if (err) {
            logError(err);
          } else {
            const child = newState.document.getChild(block.key);
            const data = child.data
              .set('loaded', true)
              .set('src', src)
              .set('percent', 100);

            newState = newState
              .transform()
              .setNodeByKey(block.key, { data })
              .apply();

            onChange(newState);
          }
        },
        fileChosen: file => {
          if (!file) {
            return;
          }

          log('got file: ', file);
          const reader = new FileReader();
          reader.onload = () => {
            const dataURL = reader.result;
            const child = newState.document.getChild(block.key);
            const data = child.data.set('src', dataURL);

            newState = newState
              .transform()
              .setNodeByKey(block.key, { data })
              .apply();
            onChange(newState);
          };

          reader.readAsDataURL(file);
        },
        progress: (percent, bytes, total) => {
          log('progress: ', percent, bytes, total);
          const child = newState.document.getChild(block.key);
          const data = child.data.set('percent', percent);


          newState = newState
            .transform()
            .setNodeByKey(block.key, { data })
            .apply();

          onChange(newState);
        }
      }

      this.props.addImage(handler);

    };

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
            plugins={this.plugins}
            readOnly={readOnly}
            state={this.props.editorState}
            onChange={this.props.onChange}
            onKeyDown={this.onKeyDown} />
        </div>
        {/* onImageClick={() => addImage(this.insertImage)} */}
        {!readOnly && <Toolbar
          editorState={editorState}
          onToggleMark={this.onToggleMark}
          onInsertMath={this.insertMath}
          onImageClick={this.addImage}
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
    border: 'none',
    borderBottom: '0px solid #cccccc',
    borderRadius: '0px',
    cursor: 'text',
    '& [data-slate-editor="true"]': {
      overflow: 'scroll',
      maxHeight: '500px',
    }
  },
  editorHolder: {
    padding: '7px'
  },
  editor: {
    padding: '8px',
    background: '#ffffff'
  }
}

export default injectSheet(style)(RichText);
