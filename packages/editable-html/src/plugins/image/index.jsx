import Image from 'material-ui-icons/Image';
import ImageComponent from './Component';
import React from 'react';
import debug from 'debug';

const log = debug('editable-html:image');


// const Image = props => (
//   <img
//     src={props.node.data.get('src')}></img>
// );

export default function ImagePlugin(opts) {

  return {
    toolbar: {
      icon: <Image />,
      onClick: opts.onInsertImage
    },
    renderNode(props) {
      if (props.node.type === 'image') {
        const all = Object.assign({ onDelete: opts.onDelete }, props);
        return <ImageComponent {...all} />
      }
    }
  }
}

export const serialization = {


  deserialize(el, next) {
    const name = el.tagName.toLowerCase();
    if (name !== 'img') return;

    log('deserialize: ', name);
    const style = el.style || { width: '', height: '' };
    const width = parseInt(style.width.replace('px', ''), 10) || null;
    const height = parseInt(style.height.replace('px', ''), 10) || null;

    const out = {
      kind: 'block',
      type: 'image',
      isVoid: true,
      nodes: [],
      data: {
        src: el.getAttribute('src'),
        width, height
      }
    }
    log('return object: ', out);
    return out;
  },
  serialize(object, children) {
    if (object.type !== 'image') return;

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
};