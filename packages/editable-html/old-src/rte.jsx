import { Block, Data, Model, Raw } from 'slate';
import { buildPlugins, serializationRules } from './plugins';

import { Editor } from 'slate-react';
import Html from 'slate-html-serializer';
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

class RichText extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inFocus: false
    }

    this.onFocus = (event, change, editor) => {
      log('[onFocus]', change);
      this.setState({ inFocus: true, pendingBlur: false });
      log('[editor.focus?]', editor.focus);
      editor.focus();
      return change;
    }

    this.completeBlur = () => {
      log('[completeBlur] state: ', this.state);
      if (this.state.pendingBlur) {
        if (!this.root.contains(document.activeElement)) {
          log('[completeBlur] trigger a blur');
          this.setState({ inFocus: false });
          this.props.onDone();
        }
        this.setState({ pendingBlur: false });
      }
    }

    this.onBlur = (event, data, change, editor) => {
      log('[onBlur] preventDefault');
      event.preventDefault();
      event.stopPropagation();
      log('[onBlur] activeElement', document.activeElement);
      this.setState({ pendingBlur: true });
      setTimeout(this.completeBlur, 200);
    }

    this.insertImage = (err, src) => {
      log('[insertImage]')
      this.setState({ pendingBlur: false, insertingImage: true });

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

      this.setState({ pendingBlur: false });

      log('[insertMath]');

      const { editorState } = this.props;

      const math = inlineMath();

      const change = editorState
        .change()
        .insertInline(math);

      this.props.onChange(change);
    }

    this.addImage = () => {
      log('[insertImage]')

      this.setState({ pendingBlur: false });

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

      log('after image block insertion', Raw.deserialize(this.editor.getState()));

      const handler = {
        cancel: () => {
          log('insert cancelled');
          const c = this.editor.getState()
            .change()
            .removeNodeByKey(block.key);
          onChange(c);
        },
        done: (err, src) => {
          log('done: err:', err);
          if (err) {
            logError(err);
          } else {
            const state = this.editor.getState();
            const child = state.document.getChild(block.key);
            const data = child.data.merge(
              Data.create({ loaded: true, src, percent: 100 })
            );

            change = state.change().setNodeByKey(block.key, { data });
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
            const state = this.editor.getState();

            log('[fileChosen] current state', Raw.deserialize(state));
            const dataURL = reader.result;
            const child = state.document.getChild(block.key);
            const data = child.data.set('src', dataURL);

            change = state.change().setNodeByKey(block.key, { data });
            onChange(change);
          };

          reader.readAsDataURL(file);
        },
        progress: (percent, bytes, total) => {
          log('progress: ', percent, bytes, total);
          const state = this.editor.getState();
          const child = state.document.getChild(block.key);
          const data = child.data.set('percent', percent);
          change = state.change().setNodeByKey(block.key, { data });
          onChange(change);
        }
      }

      this.props.imageSupport.add(handler);
    };

    this.onPluginBlur = (event) => {
      log('[onPluginBlur] activeElement: ', document.activeElement);
      event.preventDefault();
      this.setState({ pendingBlur: true });
      setTimeout(this.completeBlur, 200);
    }

    this.onPluginFocus = (event) => {
      log('[onPluginFocus]');
      this.setState({ inFocus: true, pendingBlur: false });
    }

    this.onToolbarBlur = (event) => {
      this.setState({ pendingBlur: true });
      setTimeout(this.completeBlur, 200);
      log('[onToolbarBlur]');
    }

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
    const {
      classes,
      editorState,
      focus,
      onDone,
      imageSupport } = this.props;

    const { inFocus } = this.state;

    log('[render] inFocus?', inFocus);

    const names = classNames(classes.root, inFocus && classes.inFocus);
    const editorNames = classNames(classes.editorHolder, inFocus && classes.editorInFocus);
    return (
      <div
        ref={r => this.root = r}
        className={names}>
        <Editor
          className={editorNames}
          ref={r => this.editor = r}
          spellCheck
          tabIndex={0}
          placeholder={'Enter some rich text...'}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          plugins={this.plugins}
          value={this.props.editorState}
          onChange={this.props.onChange}
          onKeyDown={this.onKeyDown} />
        {inFocus && <Toolbar
          editorState={editorState}
          onToggleMark={this.onToggleMark}
          onInsertMath={this.insertMath}
          onFocus={this.onToolbarFocus}
          onBlur={this.onToolbarBlur}
          onImageClick={imageSupport && this.addImage}
          onDone={onDone} />}
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

export const htmlToState = html => {
  log('[htmlToState] html: ', html);
  const out = serializer.deserialize(html);
  log('[htmlToState] out: ', out);
  return out;
}

export const stateToHtml = (state) => serializer.serialize(state);


const primary = '#304ffe';

const style = {
  root: {
    padding: '0px',
    border: 'none',
    borderBottom: '0px solid #cccccc',
    borderRadius: '0px',
    cursor: 'text',
    '& [data-slate-editor="true"]': {
      overflow: 'auto',
      maxHeight: '500px',
    }
  },
  editorHolder: {
    padding: '7px',
    '&::after': {
      left: '0',
      right: '0',
      bottom: '0',
      height: '1px',
      content: '""',
      position: 'absolute',
      transform: 'scaleX(0%)',
      transition: 'transform 200ms cubic-bezier(0.0, 0.0, 0.2, 1) 0ms',
      backgroundColor: 'rgba(0, 0, 0, 0.42)',
    },
    '&:focus': {
      '&::after': {
        backgroundColor: primary,
        height: '2px'
      }
    },
    '&:hover': {
      '&::after': {
        backgroundColor: 'black',
        height: '2px'
      }
    },
  },
  editorInFocus: {
    '&:hover': {
      '&::after': {
        backgroundColor: primary
      }
    }
  },
  editor: {
    padding: '8px',
    background: '#ffffff'
  }
}

export default injectSheet(style)(RichText);
