import { Data } from 'slate';
import MathInput from '@pie-libs/math-input';
import React from 'react';
import injectSheet from 'react-jss';

export class MathComponent extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = (latex) => {
      const { node, editor } = this.props;
      const { key } = node;
      const data = Data.create({ latex });
      const newState = this.props.state.transform()
        .setNodeByKey(key, { data })
        .apply();
      editor.onChange(newState);
    }
  }

  render() {
    const { node, state, editor, classes, attributes } = this.props;
    const latex = node.data.get('latex');
    return <MathInput latex={latex} onLatexChange={this.onChange} />;
  }
}

const styles = {

};

export default injectSheet(styles)(MathComponent);