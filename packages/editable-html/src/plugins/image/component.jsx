import { Data, Raw } from 'slate';

import { Delete } from '../../components/buttons';
import Portal from 'react-portal';
import React from 'react';
import classNames from 'classnames';
import debug from 'debug';
import injectSheet from 'react-jss';

const log = debug('plugins:image:component');

const logError = debug('plugins:image:component');

logError.log = console.error.bind(console);

const RawMiniButton = ({ classes, children, first, last, onClick }) => {
  const className = classNames(classes.root, first && classes.first, last && classes.last);
  return <div onClick={onClick} className={className}>{children}</div>
}

const border = `solid 1px #cccccc`;
const miniButtonStyles = {
  root: {
    cursor: 'pointer',
    padding: '8px',
    fontFamily: 'sans-serif',
    borderLeft: border,
    borderTop: border,
    borderBottom: border,
    transition: 'background-color 200ms linear',
    '&:hover': {
      backgroundColor: 'pink'
    }
  },
  first: {
  },
  last: {
    borderRight: border
  }
}

const MiniButton = injectSheet(miniButtonStyles)(RawMiniButton);

export class RawImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: null
    }

    this.resizeBy = (amount) => {
      const { node, editor } = this.props;
      const { key } = node;
      const width = this.img.naturalWidth * amount;
      const height = this.img.naturalHeight * amount;

      const { data } = this.props.node;
      const update = data.merge(Data.create({ width, height }));
      const updatedState = this.props.state.transform()
        .setNodeByKey(key, { data: update })
        .apply();

      editor.onChange(updatedState);
    }

    this.onDelete = (event) => {

      const { state, editor, node } = this.props;
      //Prevent this from triggering a select
      event.preventDefault();
      event.stopPropagation();


      this.props.onDelete(node.data.get('src'), err => {
        if (!err) {
          const updatedState = editor.getState()
            .transform()
            .removeNodeByKey(node.key)
            .apply();

          editor.onChange(updatedState);
        } else {
          logError(err);
        }
      });
    }

    this.onOpen = (portal) => {
      this.setState({ menu: portal.firstChild })
    }

    this.updateMenu = () => {
      const { menu } = this.state;
      const { state, node } = this.props;

      if (!menu) return

      const active = state.isFocused && state.selection.hasEdgeIn(node);

      if (!active) {
        menu.style.opacity = 0;
        setTimeout(() => {
          menu.removeAttribute('style')
        }, 500);
        return
      }

      const rect = this.img.getBoundingClientRect();

      const left = Math.max(0, rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2);
      menu.style.opacity = 1
      menu.style.top = `${rect.top + (rect.height * 0.5)}px`
      menu.style.transform = 'translateY(-50%)';
      menu.style.left = `${left}px`
    }
  }

  componentDidMount() {
    this.updateMenu();
  }

  componentDidUpdate() {
    this.updateMenu();
  }

  render() {

    const { node, state, editor, classes, attributes } = this.props;
    const active = state.isFocused && state.selection.hasEdgeIn(node);
    const src = node.data.get('src');
    const width = node.data.get('width');
    const height = node.data.get('height');
    //TODO: There's probably a better way to get this info.
    const readOnly = editor.props.readOnly;

    const style = {
      width: width ? `${width}px` : 'auto',
      height: height ? `${height}px` : 'auto'
    }

    const className = classNames(classes.root, active && classes.active);

    const resize = (amount) => this.resizeBy.bind(this, amount);

    return <div className={className}>
      <Portal isOpened onOpen={this.onOpen}>
        <div className={classes.portal}>
          <div className={classes.floatingButtonRow}>
            <MiniButton onClick={resize(0.25)} first={true}>25%</MiniButton>
            <MiniButton onClick={resize(0.50)}>50%</MiniButton>
            <MiniButton onClick={resize(0.75)}>75%</MiniButton>
            <MiniButton onClick={resize(1)} last={true}>100%</MiniButton>
          </div>
        </div>
      </Portal>
      {!readOnly && <Delete className={classes.delete} onClick={this.onDelete} />}
      <img
        src={src}
        {...attributes}
        ref={r => this.img = r}
        style={style} />
    </div>
  }
}

const styles = {
  portal: {
    position: 'absolute',
    opacity: 0,
    transition: 'opacity 200ms linear'
  },
  floatingButtonRow: {
    backgroundColor: 'white',
    borderRadius: '1px',
    display: 'flex',
    padding: '10px',
    border: 'solid 1px #eeeeee',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
  },
  root: {
    position: 'relative',
    border: 'solid 1px white',
    display: 'inline-block'
  },
  active: {
    border: 'solid 1px green'
  },
  delete: {
    position: 'absolute',
    right: 0,
  }
}

export default injectSheet(styles)(RawImage);