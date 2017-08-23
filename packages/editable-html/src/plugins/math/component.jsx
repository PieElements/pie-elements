import { Data } from 'slate';
import MathInput from '@pie-libs/math-input';
import React from 'react';
import injectSheet from 'react-jss';

export class MathComponent extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = (latex) => {
      console.log('latex: ', latex);
      const { node } = this.props;
      const { key } = node;
      const data = Data.create({ latex });
      this.props.state.transform()
        .setNodeByKey(key, { data })
        .apply();
    }
  }

  render() {
    const { node, state, editor, classes, attributes } = this.props;
    const latex = node.data.get('latex');
    console.log('latex: ', latex);

    return <div>

      <MathInput latex={latex} onLatexChange={this.onChange} />
    </div>;
  }
}

const styles = {

};

export default injectSheet(styles)(MathComponent);