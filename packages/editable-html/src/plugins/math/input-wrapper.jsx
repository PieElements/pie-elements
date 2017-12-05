import { EditableMathInput } from '@pie-libs/math-input';
import React from 'react';

/**
 * Exposes a change function that will update a math input 
 * while editing is true.
 */
export default class MathWrapper extends React.Component {

  change(c) {
    const { editing } = this.props;
    if (!editing || !this.input) {
      return;
    }

    if (c) {
      if (c.type === 'clear') {
        this.input.clear();
      } else if (c.type === 'command') {
        this.input.command(c.value);
      } else if (c.type === 'cursor') {
        this.input.keystroke(c.value);
      } else {
        this.input.write(c.value);
      }
    }
  }

  render() {

    const { latex, editing, onClick, onChange } = this.props;

    return (
      <EditableMathInput
        ref={r => this.input = r}
        latex={latex}
        editing={!!editing}
        onClick={onClick}
        onChange={onChange} />
    );
  }
}
