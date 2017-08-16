import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw
} from 'draft-js';

// import CustomImageEditor from './custom-image-editor';
import EditableHtml from '../src/index';
import MediaEditor from './media-editor';
import React from 'react';
import ReactDOM from 'react-dom';
import { RichEditorExample } from './example';
import { stateToHTML } from 'draft-js-export-html';

const LogState = ({ editorState }) => {
  return <pre>{stateToHTML(editorState.getCurrentContent())}</pre>
}
const blocksFromHtml = convertFromHTML('<div>hi</div>');

const initialState = ContentState.createFromBlockArray(
  blocksFromHtml.contentBlocks,
  blocksFromHtml.entityMap
)
console.log('initial state: ', initialState);
// const initialState = {
//   entityMap: {
//     "0": {
//       "type": "image",
//       "mutability": "IMMUTABLE",
//       "data": {
//         "src": "/images/canada-landscape-small.jpg"
//       }
//     }
//   },
//   blocks: [{}]
// };

const initialStateOrig = {
  "entityMap": {
    "0": {
      "type": "image",
      "mutability": "IMMUTABLE",
      "data": {
        "src": "/images/canada-landscape-small.jpg"
      }
    }
  },
  "blocks": [{
    "key": "9gm3s",
    "text": "You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {}
  }, {
    "key": "ov7r",
    "text": " ",
    "type": "atomic",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [{
      "offset": 0,
      "length": 1,
      "key": 0
    }],
    "data": {}
  }, {
    "key": "e23a8",
    "text": "See advanced examples further down …",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {}
  }]
};
/* eslint-enable */

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.onImageClick = this.onImageClick.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      // editorState: EditorState.createWithContent(initialState),
      // editorState: EditorState.createWithContent(convertFromRaw(initialStateOrig)),
    }
  }

  handleFileSelect(event) {
    this.fileInput.blur();
    console.log('files: ', event);
    const file = event.target.files[0];
    this.fileInput.value = '';
    var reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      console.log('call setHref...');
      this.state.setHref(dataURL);
      this.setState({ setHref: null });
    };
    console.log('call readAsDataUrl...', file);
    reader.readAsDataURL(file);
  }

  componentDidMount() {
    this.fileInput.addEventListener('change', this.handleFileSelect);
  }

  componentWillUnmount() {
    this.fileInput.removeEventListener('change', this.handleFileSelect);
  }

  onImageClick(setHref) {
    this.setState({ setHref });
    this.fileInput.click();
  }

  onChange(editorState) {
    console.log('update state: ...');
    this.setState({ editorState });
  }

  render() {
    const { us } = this.props;
    return <div>
      <input ref={r => this.fileInput = r} type="file" hidden></input>
      <MediaEditor addImage={this.onImageClick} />
      {/* <CustomImageEditor editorState={this.state.editorState} onChange={this.onChange} /> */}
      {/* <LogState editorState={this.state.editorState} /> */}
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