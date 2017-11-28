import ImagePlugin from './image';
import MathPlugin from './math';
import React from 'react';
import ToolbarPlugin from './toolbar';
import compact from 'lodash/compact';
import debug from 'debug';

const log = debug('editable-html:plugins');


function MarkHotkey(options) {
  const { type, key } = options

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {

    renderMark(props) {
      if (props.mark.type === type) {
        const K = key;
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
    MarkHotkey({ key: 'b', type: 'bold' }),
    MarkHotkey({ key: '`', type: 'code' }),
    MarkHotkey({ key: 'i', type: 'italic' }),
    MarkHotkey({ key: '~', type: 'strikethrough' }),
    MarkHotkey({ key: 'u', type: 'underline' }),
    opts.image && opts.image.onDelete && ImagePlugin(opts.image),
    MathPlugin(opts.math),
    ToolbarPlugin()
  ]);
}
