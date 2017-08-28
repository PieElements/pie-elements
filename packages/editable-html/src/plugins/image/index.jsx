import Image from './component';
import React from 'react';
import debug from 'debug';

const log = debug('editable-html:image');

const Deletable = (Component, onDelete) => {

  log('[Deletable] onDelete: ', onDelete);

  return class extends React.Component {
    render() {
      return <Component {...this.props} onDelete={onDelete} />
    }
  }
}

export default function ImagePlugin(options) {

  log('[ImagePlugin] options: ', options);

  return {
    schema: {
      nodes: {
        image: Deletable(Image, options.onDelete)
      }
    }
  }
}

/**
 * html serialization
 */
export const serialization = {
  deserialize(el, next) {
    const name = el.tagName.toLowerCase();
    const style = el.style || { width: '', height: '' };
    const width = parseInt(style.width.replace('px', ''), 10) || null;
    const height = parseInt(style.height.replace('px', ''), 10) || null;

    if (name === 'img') {
      return {
        kind: 'inline',
        type: 'image',
        isVoid: true,
        data: {
          src: el.getAttribute('src'),
          width, height
        }
      }
    }
  },
  serialize(object, children) {
    if (object.type === 'image') {
      const { data } = object;
      const src = data.get('src');
      const width = data.get('width');
      const height = data.get('height');
      const style = {};
      if (width) {
        style.width = `${width}px`;
      }

      if (height) {
        style.height = `${height}px`;
      }

      const props = {
        src,
        style
      }

      return <img {...props}></img>;
    }
  }
};

