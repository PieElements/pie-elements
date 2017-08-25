import TextEditor, { htmlToState, stateToHtml } from '../src/rte';

import EditableHtml from '../src';
import { Raw } from 'slate';
import React from 'react';

class RteDemo extends React.Component {

  puppy = 'https://s-media-cache-ak0.pinimg.com/736x/ed/0e/68/ed0e68d1f8a0a1f4b5582ed180cce761--puppy-training-tips-images-photos.jpg';
  markup = `<div>​​​
    <span mathjax="">96\\times884</span>​
    <b>hi</b> there
    <div>
      <img src="${this.puppy}"></img> 
    </div>
  <div>`;

  onChange = (editorState) => {
    console.log('editorState changed', Raw.serialize(editorState));
    this.setState({ editorState });
  }

  state = {
    editorState: htmlToState(this.markup),
    markup: this.markup
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

  onMarkupChange = (markup) => {
    console.log('new markup: ', markup);
    this.setState({ markup });
  }

  render() {

    const { editorState } = this.state;
    return <div>
      <h1>@pie-libs/editable-html</h1>
      <EditableHtml
        markup={this.state.markup}
        onChange={this.onMarkupChange}
        onImageClick={this.addImage} />
      <input type="file" hidden ref={r => this.fileInput = r}></input>
    </div>;
  }
}

export default RteDemo

