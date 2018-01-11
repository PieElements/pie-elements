import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import debug from 'debug';
import uniq from 'lodash/uniq';
import { Chip, Input } from 'material-ui';
import Done from 'material-ui-icons/Done';
import classNames from 'classnames';

const log = debug('pie-elements:config-ui:tags-input');

const ENTER = 13;

const Tag = withStyles(theme => ({
  tag: {
    padding: '0px',
    margin: '1px'
  }
}))(({ classes, label, onDelete }) => (
  <Chip
    className={classes.tag}
    label={label}
    onDelete={onDelete}
  />
))

const MuiBox = withStyles(theme => {
  log('theme: ', theme);
  return {
    muiBox: {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      position: 'relative',
      '&:before': {
        left: 0,
        right: 0,
        bottom: 0,
        height: '1px',
        content: '""',
        position: 'absolute',
        transition: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        pointerEvents: 'none',
        backgroundColor: theme.palette.input.bottomLine
      },
      '&:hover:before': {
        height: '2px'
      },
      '&:after': {
        left: 0,
        right: 0,
        bottom: 0,
        height: '2px',
        content: '""',
        position: 'absolute',
        transform: 'scaleX(0)',
        transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        pointerEvents: 'none',
        backgroundColor: theme.palette.primary['A700'] //'#304ffe'
      }
    },
    focused: {
      '&:after': {
        transform: 'scaleX(1)'
      }
    },
  }
})(({ children, classes, focused }) => {
  const names = classNames(classes.muiBox, focused && classes.focused);
  return (
    <div className={names}>
      {children}
    </div>
  )
});

export class TagsInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      focused: false
    }

    this.onKeyDown = (event) => {
      if (event.keyCode === ENTER && this.state.value !== '') {
        const tag = this.state.value.trim();
        const newTags = uniq(this.props.tags.concat([tag]));

        if (newTags.length !== this.props.tags.length) {
          this.props.onChange(newTags);
          this.setState({ value: '' });
        }
      }
    }

    this.onChange = (event) => {
      this.setState({ value: event.target.value });
    }

    this.deleteTag = (tag) => {
      const { tags } = this.props;

      const tagIndex = tags.indexOf(tag);
      if (tagIndex !== -1) {
        tags.splice(tagIndex, 1);
        this.props.onChange(tags);
        this.input.focus();
      }
    }
  }

  onFocus = () => {
    this.setState({ focused: true });
  }

  onBlur = () => {
    this.setState({ focused: false });
  }

  render() {
    const { classes, tags } = this.props;
    return (
      <MuiBox focused={this.state.focused}>
        <div className={classes.tagsInput}>
          {(tags || []).map((t, index) => <Tag
            key={index}
            label={t}
            onDelete={() => this.deleteTag(t)} />)}
          <input
            ref={r => this.input = r}
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            className={classes.input}
            value={this.state.value}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            type="text"></input>
        </div>
      </MuiBox>
    );
  }
}

TagsInput.propTypes = {}

const styles = theme => ({

  tagsInput: {
    border: 'solid 0px white',
    display: 'flex',
    flexWrap: 'wrap'
  },
  input: {
    padding: '2px',
    margin: '1px',
    minWidth: '30px',
    width: '100%',
    flex: '1',
    border: 'solid 0px white',
    height: '28px',
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    outline: 'none',
    '&:focus': {
      outline: 'none'
    }
  }
})

export default withStyles(styles)(TagsInput);