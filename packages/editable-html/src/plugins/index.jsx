import Bold from 'material-ui-icons/FormatBold';
import Code from 'material-ui-icons/Code';
import ImagePlugin from './image';
import Italic from 'material-ui-icons/FormatItalic';
import MathPlugin from './math';
import PropTypes from 'prop-types';
import React from 'react';
import Strikethrough from 'material-ui-icons/FormatStrikethrough';
import ToolbarPlugin from './toolbar';
import Underline from 'material-ui-icons/FormatUnderlined';
import compact from 'lodash/compact';
import debug from 'debug';

const log = debug('editable-html:plugins');

function MarkHotkey(options) {
  const { type, key, icon, tag } = options

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    toolbar: {
      isMark: true,
      type,
      icon,
      onToggle: (change) => {
        log('[onToggleMark] type: ', type);
        return change.toggleMark(type);
      }
    },
    renderMark(props) {
      if (props.mark.type === type) {
        const K = tag || type;
        return <K>{props.children}</K>
      }
    },
    onKeyDown(event, change) {
      // Check that the key pressed matches our `key` option.
      if (!event.metaKey || event.key != key) return

      // Prevent the default characters from being inserted.
      event.preventDefault()

      // Toggle the mark `type`.
      change.toggleMark(type)
      return true
    }
  }
}

export const buildPlugins = (opts) => {
  log('[buildPlugins] opts: ', opts);

  return compact([
    !opts.excludePlugins.includes("bold") && MarkHotkey({ key: 'b', type: 'bold', icon: <Bold />, tag: 'strong' }),
    !opts.excludePlugins.includes("code") && MarkHotkey({ key: '`', type: 'code', icon: <Code /> }),
    !opts.excludePlugins.includes("italic") && MarkHotkey({ key: 'i', type: 'italic', icon: <Italic />, tag: 'em' }),
    !opts.excludePlugins.includes("strikethrough") && MarkHotkey({ key: '~', type: 'strikethrough', icon: <Strikethrough />, tag: 'del' }),
    !opts.excludePlugins.includes("underline") && MarkHotkey({ key: 'u', type: 'underline', icon: <Underline />, tag: 'u' }),
    !opts.excludePlugins.includes("math") && opts.image && opts.image.onDelete && ImagePlugin(opts.image),
    !opts.excludePlugins.includes("math") && MathPlugin(opts.math),
    !opts.excludePlugins.includes("toolbar") && ToolbarPlugin(opts.toolbar)
  ]);
}
