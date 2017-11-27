import { Data } from 'slate';
import React from 'react';
import { findSingleNode } from "../toolbar/utils";

export default function (opts) {

  return {
    onChange: (change) => {
      const v = change.value;
      const node = findSingleNode(v);

      const last = change.value.document.findDescendant(n => {
        return n.data && n.data.get('editing') === true
      });

      const lastUpdate = last && last.data.toObject();

      lastUpdate && (delete lastUpdate.editing);

      const c = last ?
        change.setNodeByKey(last.key, { data: lastUpdate }) : change;

      if (node) {
        const data = Data.create({ ...node.data.toObject(), editing: true });
        return c.setNodeByKey(node.key, { data })
      } else {
        return c;
      }
    },
    renderEditor: (props) => {

      const current = props.value.document.findDescendant(n => {
        return n.data && n.data.get('editing') === true;
      });

      return (<div>
        <div>Current: {current && current.type}</div>
        <div>{props.children}</div>
      </div>);
    }
  }
}