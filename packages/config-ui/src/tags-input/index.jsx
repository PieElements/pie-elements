import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import debug from 'debug';
import uniq from 'lodash/uniq';
import Chip from 'material-ui/Chip';
import Done from 'material-ui-icons/Done';

const log = debug('pie-elements:config-ui:tags-input');

const ENTER = 13;

const Tag = withStyles(theme => ({
  tag: {
    borderRadius: '1px',
    padding: '40px'
  }
}))(({ classes, label, onClick }) => (
  <Chip
    label={label}
    onClick={onClick}
    deleteIcon={<Done />}
  />
))
export class TagsInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
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
      }
    }
  }

  render() {
    const { classes, tags } = this.props;

    return (
      <div className={classes.tagsInput}>
        {(tags || []).map((t, index) => <Tag
          key={index}
          label={t}
          onClick={() => this.deleteTag(t)} />)}
        <input
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
          className={classes.input}
          value={this.state.value}
          type="text"></input>
      </div>
    );
  }
}

TagsInput.propTypes = {}

const styles = theme => ({

  tagsInput: {
    border: 'solid 1px red',
    display: 'flex',
    flexWrap: 'wrap'
  },
  input: {
    minWidth: '30px',
    width: '100%',
    flex: '1'

  }
})

export default withStyles(styles)(TagsInput);