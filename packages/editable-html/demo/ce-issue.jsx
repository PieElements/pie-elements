import MathInput from '@pie-libs/math-input';
import React from 'react';
import ReactDOM from 'react-dom';

class Issue extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      latex: '\frac{3}{2}'
    }
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    console.log('onKeyDown');
    // e.preventDefault();
    // e.stopPropagation();
  }

  render() {
    const { latex } = this.state;

    return <div contentEditable="true" onKeyDown={this.onKeyDown}>
      <div contentEditable="false">
        <MathInput latex={latex} onLatexChange={(latex) => this.setState({ latex })} />
      </div>
    </div>
  }

}

document.addEventListener('DOMContentLoaded', () => {

  const el = React.createElement(Issue, {});

  ReactDOM.render(el, document.querySelector('#app'));
});