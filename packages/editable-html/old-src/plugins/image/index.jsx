import Image from './component';
import React from 'react';
import debug from 'debug';

const log = debug('editable-html:image');

export default function ImagePlugin(options) {

  log('[ImagePlugin] options: ', options);

  return {
    // schema: {
    //   inlines: {
    //     image: {
    //       isVoid: true,
    //       normalize: (change, reason) => {
    //         log('>>> normalize img', reason);
    //       }
    //     }
    //   }
    // },
    renderNode: (props) => {
      log('[ImagePlugin] props.node: ', props.node);
      return props.node.type === 'image' ? <Image {...Object.assign({ onDelete: options.onDelete }, props) } /> : null
    }
    // schema: {
    //   nodes: {
    //     image: props => <Image
    //       {...Object.assign({ onDelete: options.onDelete }, props) } />
    //   }
    // }
  }
}

/**
 * html serialization
 */
export const serialization = {
  deserialize(el, next) {
    const name = el.tagName.toLowerCase();
    log('deserialize: ', name);
    const style = el.style || { width: '', height: '' };
    const width = parseInt(style.width.replace('px', ''), 10) || null;
    const height = parseInt(style.height.replace('px', ''), 10) || null;

    if (name === 'img') {
      const out = {
        kind: 'inline',
        type: 'image',
        isVoid: true,
        data: {
          src: el.getAttribute('src'),
          width, height
        }
      }
      log('return object: ', out);
      return out;
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

