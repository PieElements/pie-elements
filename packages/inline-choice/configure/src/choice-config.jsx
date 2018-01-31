import { MultiLangInput, InputRadio } from '@pie-libs/config-ui';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Radio from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import FeedbackMenu from './feedback-menu';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui-icons/Delete';


export class ChoiceConfig extends React.Component {

  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(event) {
    let updatedValue = event.target.value;
    this.props.onChoiceValueUpdate(updatedValue);
  }

  render() {
    let { classes,
      checked,
      label,
      value,
      feedback,
      index,
      onChoiceChange } = this.props;
    return <div className={classes.root}>
      <div className={classes.main}>
        <InputRadio label="Correct"
          checked={checked}
          value={value}
          className={classes.radio}
          onChange={() => onChoiceChange(value)} />
        {/* <div className={classes.indexAndModeTag}>
          <Radio checked={checked}
          onChange={() => { this.props.onChoiceChange(value) }}
          value={value} />
      </div> */}
        <TextField
          id="value"
          label="Value"
          value={value}
          onChange={this.handleValueChange}
          className={classes.valueField} />
        <MultiLangInput
          label="Label"
          className={classes.multiLangInput}
          value={label}
          lang={this.props.activeLang}
          onChange={(label) => { this.props.onChoiceLabelUpdate(label) }} />
        <FeedbackMenu
          value={feedback}
          onChange={(type) => { this.props.handleFeedbackMenuChange(type) }} />

        <IconButton
          aria-label="delete"
          onClick={() => { this.props.onRemoveChoice(index) }}><ActionDelete /></IconButton>
      </div>
    </div >;
  }
}


const styles = {
  multiLangInput: {
    marginBottom: 0,
    flex: 1
  },
  radio: {
    flex: '0 1 auto'
  },
  root: {
    paddingBottom: '10px',
    paddingTop: '10px',
  },
  main: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '8px'
  },
  feedback: {
    display: 'flex'
  },
  indexAndModeTag: {
    display: 'flex',
    alignItems: 'center'
  },
  index: {
    display: 'inline-block',
    position: 'relative',
    top: '0px',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  valueField: {
    width: '100px',
    maxWidth: '100px',
    marginRight: '10px',
    marginLeft: '10px',
    paddingBottom: '8px'
  }
};

export default withStyles(styles, { name: 'ChoiceConfig' })(ChoiceConfig);