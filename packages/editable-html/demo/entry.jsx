import CustomImageEditor from './custom-image-editor';
import EditableHtml from '../src/index';
import React from 'react';
import ReactDOM from 'react-dom';
import { RichEditorExample } from './example';

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.onImageClick = this.onImageClick.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  handleFileSelect(event) {
    console.log('files: ', event);
    const file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      const dataURL = reader.result;
      console.log('dataUrl: ', dataURL);
    };

    reader.readAsDataURL(file);
  }

  componentDidMount() {
    this.fileInput.addEventListener('change', this.handleFileSelect);
  }

  componentWillUnmount() {
    this.fileInput.removeEventListener('change', this.handleFileSelect);
  }

  onImageClick() {
    this.fileInput.click();
  }

  render() {
    const { us } = this.props;
    return <div>
      <CustomImageEditor />
      {/* Us:
    <input ref={r => this.fileInput = r} type="file" hidden></input>
      <EditableHtml {...us} onImageClick={this.onImageClick} />
      FB:
  <RichEditorExample /> */}
    </div>
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const el = React.createElement(Demo, {
    us: {
      model: '<b>hi</b>',
      onChange: function () {
        console.log('onChange: ', arguments)
      },
      onImageClick: function () {
        console.log('onImageClick', arguments);
      }
    }
  });
  ReactDOM.render(el, document.querySelector('#app'));
});