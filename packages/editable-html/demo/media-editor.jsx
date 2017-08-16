import {
  AtomicBlockUtils,
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  SelectionState,
  convertToRaw
} from 'draft-js';

import React from 'react';

export default class MediaEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      showURLInput: false,
      url: '',
      urlType: '',
    };
    //this.deleteMediaBlock = this.deleteMediaBlock.bind(this);/

    this.focus = () => this.refs.editor.focus();
    this.mediaBlockRenderer = this.mediaBlockRenderer.bind(this);
    this.onDeleteBlock = this.onDeleteBlock.bind(this);
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };
    this.onChange = (editorState) => this.setState({ editorState });
    this.onURLChange = (e) => this.setState({ urlValue: e.target.value });

    this.addImage = this.addImage.bind(this);
  }

  setHref(href) {
    console.log('this: ', this);
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      { src: href }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity }
    );

    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' '
      )
    }, () => {
      setTimeout(() => this.focus(), 0);
    });
  }

  addImage() {
    this.props.addImage(this.setHref.bind(this));
  }


  onDeleteBlock(block) {

    const key = block.getKey();
    console.log('key: ', key);
    const rangeToRemove = SelectionState.createEmpty(key).merge({ focusOffset: block.getText().length });

    const contentState = this.state.editorState.getCurrentContent();

    // const newContentState = Modifier.removeRange(contentState, rangeToRemove);
    console.log('new content state after removal: ', newContentState);
    const newContentState = Modifier.removeRange(contentState, rangeToRemove, 'forward');
    const update = EditorState.push(this.state.editorState, newContentState, 'remove-range');
    // onContentStateChange(newContentState);
    // const newEditorState = EditorState.set(
    //   this.state.editorState,
    //   { currentContent: newContentState }
    // )
    this.setState({ editorState: update });
  }

  mediaBlockRenderer(block) {
    if (block.getType() === 'atomic' && block.getText() !== '') {
      console.log('got atomic block: ', block);
      return {
        component: Media,
        editable: false,
        props: {
          // onContentStateChange: this.onContentStateChange
          onDelete: this.onDeleteBlock
        }
      };
    }
    return null;
  }

  render() {

    return (
      <div style={styles.root}>
        <div style={{ marginBottom: 10 }}>
          Use the buttons to add audio, image, or video.
        </div>
        <div style={{ marginBottom: 10 }}>
          Here are some local examples that can be entered as a URL:
          <ul>
            <li>media.mp3</li>
            <li>media.png</li>
            <li>media.mp4</li>
          </ul>
        </div>
        <div style={styles.buttons}>
          <button
            onMouseDown={this.addImage}
            style={{ marginRight: 10 }}>
            Add Image
          </button>
        </div>
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            blockRendererFn={this.mediaBlockRenderer}
            editorState={this.state.editorState}
            placeholder="Enter some text..."
            onChange={this.onChange}
            ref="editor"
          />
        </div>
        <input
          onClick={this.logState}
          style={styles.button}
          type="button"
          value="Log State"
        />
      </div>
    );
  }
}

const Audio = (props) => {
  return <audio controls src={props.src} style={styles.media} />;
};

const Image = (props) => {
  console.log('props: ', props);
  return <div onClick={() => {
    console.log('onClick')
  }}>
    <img src={props.src}
      style={styles.media}
    /></div>;
};

const Video = (props) => {
  return <video controls src={props.src} style={styles.media} />;
};

class Media extends React.Component {

  constructor(props) {
    super(props);
    this.deleteBlock = this.deleteBlock.bind(this);
  }

  deleteBlock() {
    const { block, contentState, blockProps: { onDelete } }
      = this.props;

    onDelete(block);
  }

  render() {
    const { contentState, block } = this.props;

    const e = block.getEntityAt(0);
    console.log('e: ', e);
    const entity = contentState.getEntity(e);
    const { src } = entity.getData();
    const type = entity.getType();

    let media;
    if (type === 'audio') {
      media = <Audio src={src} />;
    } else if (type === 'image') {
      media = <Image src={src} />;
    } else if (type === 'video') {
      media = <Video src={src} />;
    }

    return <div onClick={this.deleteBlock}>{media}</div>;
  };
}

const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  media: {
    width: '100%',
  },
};
