import Image from './component';
import React from 'react';

export default function ImagePlugin(options) {
  return {
    schema: {
      nodes: {
        image: Image
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

