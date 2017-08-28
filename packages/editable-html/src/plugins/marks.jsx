import React from 'react';
import debug from 'debug';
import keycode from 'keycode';

const log = debug('editable-html:plugins:marks');

const MARKS = [
  { key: 'b', type: 'bold', tag: 'strong' },
  { key: 'c', type: 'code', tag: 'code', isAltKey: true },
  { key: 'i', type: 'italic', tag: 'em' },
  { key: 'd', type: 'strikethrough', tag: 'del' },
  { key: 'u', type: 'underline', tag: 'u' },
];

const findTagForType = (t) => {
  const mark = MARKS.find(m => m.type === t);
  return mark ? mark.tag : undefined;
}

const buildMarks = () => {
  return MARKS.reduce((o, m) => {
    o[m.type] = ({ children }) => React.createElement(m.tag, { children });
    return o;
  }, {});
}

export default Plugin = (options) => {
  return {
    schema: {
      marks: buildMarks()
    },
    onKeyDown: (event, data, state) => {
      const mark = MARKS.find(m => m.key === keycode(event.which));
      const isAltKey = mark && mark.isAltKey === true;
      if (mark && event.metaKey && event.altKey === isAltKey) {
        event.preventDefault();
        return state
          .transform()
          .toggleMark(mark.type)
          .apply();
      }
    }
  }
}

export const serialization = {
  deserialize(el, next) {

    log('[deserialize] tagName: ', el.tagName.toLowerCase());

    const mark = MARKS.find(m => m.tag === el.tagName.toLowerCase());
    log('[deserialize] mark: ', mark);

    if (!mark) {
      return;
    }

    return {
      kind: 'mark',
      type: mark.type,
      nodes: next(el.childNodes)
    }
  },
  serialize(object, children) {
    log('[serialize] object.type: ', object.type);

    if (object.kind === 'mark') {
      const tagName = findTagForType(object.type);
      if (tagName) {
        log('[serialize] tagName: ', tagName);
        return React.createElement(tagName, { children });
      }
    } else if (object.type) {
      return React.createElement(object.type, { children });
    }
  }
}