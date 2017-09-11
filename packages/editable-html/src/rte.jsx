import { Block, Data, Editor, Html, Raw } from 'slate';
import { buildPlugins, serializationRules } from './plugins';

import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from './toolbar';
import classNames from 'classnames';
import debug from 'debug';
import { findDOMNode } from 'react-dom';
import injectSheet from 'react-jss';
import { inlineMath } from './plugins/math';

const log = debug('editable-html:rte');
const logError = debug('editable-html:rte');
logError.log = console.error.bind(console);

const serializer = new Html({
  rules: serializationRules,
  defaultBlock: 'div'
});

const armBlur = () => {      /// k 
  this.setState({ blur: true });
  setTimeout(() => {
    if (this.state.blur) {
      onBlur()
    }
    this.setState({ blur: false });
  });
}

class RichText extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inFocus: false
    }

    this.onFocus = (event, data, change, editor) => {
      log('[onFocus]', change);
      this.setState({ inFocus: true, cancelBlur: true });
      editor.focus();
      return change;
      // this.setState({ focus: true });
      // this.editor.focus();
      // this.props.onFocus();
    }

    this.onBlur = (event, data, change, editor) => {
      log('[onBlur]', event);
      log('[onBlur] activeElement', document.activeElement);
      // event.preventDefault();
      this.setState({ inFocus: false });
      editor.blur();
      return change;
      // this.setState({ blur: true });
      // setTimeout(() => {
      //   if (this.state.blur) {
      //     this.props.onBlur();
      //   }
      //   this.setState({ blur: false });
      // }, 500);
    }

    this.insertImage = (err, src) => {
      this.setState({ blur: false });

      if (err) {
        logError(err);
      } else {
        const { editorState, onChange } = this.props;
        const change = editorState.change()

        const update = change
          .insertBlock({
            type: 'image',
            isVoid: true,
            data: { src }
          });

        onChange(update);
      }
    }

    this.onToggleMark = (type) => {
      log('[onToggleMark] type: ', type);
      let { editorState } = this.props;

      const change = editorState
        .change()
        .toggleMark(type);

      this.props.onChange(change);
    }

    this.insertMath = () => {

      this.setState({ blur: false });

      const { editorState } = this.props;

      const math = inlineMath();

      const change = editorState
        .change()
        .insertInline(math);

      this.props.onChange(change);
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

      let change = editorState
        .change()
        .insertBlock(block);

      onChange(change);

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
            const data = child.data.merge(
              Data.create({ loaded: true, src, percent: 100 })
            );

            change = this.editor.getState()
              .change()
              .setNodeByKey(block.key, { data });

            onChange(change);
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

            change = editor.getState()
              .change()
              .setNodeByKey(block.key, { data });
            onChange(change);
          };

          reader.readAsDataURL(file);
        },
        progress: (percent, bytes, total) => {
          log('progress: ', percent, bytes, total);
          const child = newState.document.getChild(block.key);
          const data = child.data.set('percent', percent);


          change = this.editor.getState()
            .change()
            .setNodeByKey(block.key, { data })

          onChange(change);
        }
      }

      this.props.imageSupport.add(handler);

    };

    this.onPluginBlur = (event) => {
      log('[onPluginBlur] activeElement: ', document.activeElement);
      event.preventDefault();

      if (document.activeElement !== findDOMNode(this.editor)) {
        this.setState({ inFocus: false });
      }
      // this.setState({ inFocus: true });
      // setTimeout(() => {
      //   log('[onPluginBlur] state:', this.state);
      //   if (this.state.cancelBlur) {
      //     this.setState({ cancelBlur: false });
      //   } else {
      //     this.setState({ inFocus: false })
      //   }

      // }, 500);
    }

    this.onPluginFocus = (event) => {
      log('[onPluginFocus]');
      this.setState({ inFocus: true });
    }

    // this.onToolbarBlur = (event) => {
    //   log('[onToolbarBlur]');
    // }

    // this.onToolbarFocus = (event) => {
    //   log('[onToolbarFocus]');
    //   this.setState({ blur: false });
    // }

    this.plugins = buildPlugins({
      math: {
        onFocus: this.onPluginFocus,
        onBlur: this.onPluginBlur
      },
      image: {
        onDelete: this.props.imageSupport && this.props.imageSupport.delete,
        onFocus: this.onPluginFocus,
        onBlur: this.onPluginBlur
      }
    })
  }

  render() {
    const { classes, editorState, focus, onDone, imageSupport } = this.props;

    const { inFocus } = this.state;

    log('[render] inFocus?', inFocus);

    const names = classNames(classes.root, inFocus && classes.inFocus);

    return (
      <div className={names}>
        in focus ? {inFocus}
        <div className={classes.editorHolder}>
          <Editor
            ref={r => this.editor = r}
            spellCheck
            tabIndex={0}
            placeholder={'Enter some rich text...'}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            plugins={this.plugins}
            state={this.props.editorState}
            onChange={this.props.onChange}
            onKeyDown={this.onKeyDown} />
        </div>
        <Toolbar
          editorState={editorState}
          onToggleMark={this.onToggleMark}
          onInsertMath={this.insertMath}
          onFocus={this.onToolbarFocus}
          onBlur={this.onToolbarBlur}
          onImageClick={imageSupport && this.addImage}
          onDone={onDone} />
      </div>
    )
  }
}

export const ImageSupportType = PropTypes.shape({
  add: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired
});

RichText.propTypes = {
  imageSupport: ImageSupportType
}

export const htmlToState = html => serializer.deserialize(html)

export const stateToHtml = (state) => serializer.serialize(state);



const style = {
  inFocus: {
    color: 'orange',
    border: 'solid 1px orange'
  },
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
