import EditorAndToolbar from './editor-and-toolbar';
import React from 'react';

export default function ToolbarPlugin(opts) {
  return {
    renderEditor: props => <EditorAndToolbar
      {...props}
      onDone={opts.onDone} />

  }
}

