import SlateRichText, { htmlToState, stateToHtml } from './slate-rich-text';

import { Raw } from 'slate';
import React from 'react';

class SlateDemo extends React.Component {

  puppy = 'https://s-media-cache-ak0.pinimg.com/736x/ed/0e/68/ed0e68d1f8a0a1f4b5582ed180cce761--puppy-training-tips-images-photos.jpg';

  //markup = htmlToState(`<div>puppy:<img src="${puppy}"></img></div>`)
  markup = `<div><b>hi</b> there<img src="${this.puppy}"></img></div>`;

  onChange = (editorState) => {
    this.setState({ editorState });
  }

  state = {
    editorState: htmlToState(this.markup)
  }

  handleFileSelect = (event) => {
    const file = event.target.files[0];
    this.fileInput.value = '';
    var reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      this.state.insertImage(dataURL);
      this.setState({ insertImage: null });
    };
    console.log('call readAsDataUrl...', file);
    reader.readAsDataURL(file);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.insertImage !== nextState.insertImage) {
      console.log('skip update if the insertImageCallback has changed');
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.fileInput.addEventListener('change', this.handleFileSelect);
  }

  componentWillUnmount() {
    this.fileInput.removeEventListener('change', this.handleFileSelect);
  }

  addImage = (insertImage) => {
    this.setState({ insertImage });
    this.fileInput.click();
  }

  render() {

    const { editorState } = this.state;
    console.log('editorState: ', Raw.serialize(editorState));
    return <div>
      <h1>Slate Rich Text</h1>
      <hr />
      <input type="file" ref={r => this.fileInput = r}></input>
      <SlateRichText
        editorState={editorState}
        addImage={this.addImage}
        onChange={this.onChange} />
    </div>;
  }
}

export default SlateDemo
