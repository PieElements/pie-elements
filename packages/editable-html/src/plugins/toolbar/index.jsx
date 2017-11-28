import React from 'react';
import Toolbar from './toolbar';
import debug from 'debug';
const log = debug('editable-html:toolbar');

// export class Toolbar extends React.Component {

//   render() {
//     const { value, plugins } = this.props;
//     log('editor:', value);

//     return <div>
//       <div>TOOLBAR {value.isFocused ? 'focus' : ''}</div>
//     </div>
//   }
// }


export default function ToolbarPlugin(opts) {
  return {
    renderEditor: (props) => (
      <div>
        <div>{props.children}</div>
        {props.value.isFocused && <Toolbar value={props.value} />}
      </div>
    )
  }
}