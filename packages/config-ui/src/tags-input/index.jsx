import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import debug from 'debug';
import uniq from 'lodash/uniq';

const log = debug('pie-elements:config-ui:tags-input');

const ENTER = 13;

const Tag = withStyles(theme => ({
  tag: {
    border: 'solid 1px green'
  }
}))(({ classes, label }) => (
  <div className={classes.tag}>{label}</div>
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
  }

  render() {
    const { classes, tags } = this.props;

    return (
      <div className={classes.tagsInput}>
        {(tags || []).map((t, index) => <Tag key={index} label={t} />)}
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