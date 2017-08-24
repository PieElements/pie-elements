import { Data, findDOMNode } from 'slate';

import MathInput from '@pie-libs/math-input';
import React from 'react';
import injectSheet from 'react-jss';

export class MathComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disableBlur: false
    }

    this.onChange = (latex) => {
      const { node, editor } = this.props;
      const { key } = node;
      const data = Data.create({ latex });
      const newState = this.props.state.transform()
        .setNodeByKey(key, { data })
        .apply();
      editor.onChange(newState);
    }

    this.onFocus = (event) => {
      console.log(">>>>>>>>>>>>>> disable blur");
      this.setState({ disableBlur: true });
      setTimeout(() => {
        this.setState({ disableBlur: false });
      }, 200)
    }

    this.onBlur = (event) => {

      // const document = this.props.state.get('document');
      // const rootNode = node = findDOMNode(this.props.state.get('document'));

      // console.log('!! rootNode: ', rootNode);
      // console.log('!! this.props: ', this.props);
      // console.log('!! relatedTarget: ', event.relatedTarget);
      const blurSrc = event.nativeEvent.path[0];

      console.log('blur src: ', blurSrc);

      if (this.mathInput.contains(blurSrc)) {
        event.preventDefault();
        event.stopPropagation();
        const newState = this.props.state.transform()
          .blur()
          .apply();
        this.props.editor.onChange(newState);
      }
      // if(event.nativeEvent.path)
      // if (this.state.disableBlur) {
      //   console.log(' >>>>>>>>>>> [MathComponent] blur disabled!');
      //   //   this.props.editor.blur();
      //   // event.preventDefault();
      //   // event.stopPropagation();
      //   //   event.stopImmediatePropagation();
      //   this.setState({ disableBlur: false });
      //   const newState = this.props.state.transform()
      //     .blur()
      //     .apply();
      //   this.props.editor.onChange(newState);
      // }
    }
  }

  componentDidUpdate() {
    console.log('componentDidUpdate: MathComponent');
  }

  render() {
    const { node, state, editor, classes, attributes } = this.props;
    const latex = node.data.get('latex');
    return <MathInput
      innerRef={r => this.mathInput = r}
      latex={latex}
      onLatexChange={this.onChange}
      onBlur={this.onBlur}
      onFocus={this.onFocus} />;
  }
}

const styles = {

};

export default injectSheet(styles)(MathComponent);