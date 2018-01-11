import { withStyles } from 'material-ui/styles';
import React from 'react';
import { Typography, TextField, FormControl, Select, MenuItem } from 'material-ui';
import { Checkbox, FeedbackConfig, TagsInput } from '@pie-libs/config-ui';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import groupBy from 'lodash/groupBy';
import { Cancel, AddCircle } from 'material-ui-icons';
import IconButton from 'material-ui/IconButton';
import debug from 'debug';

const log = debug('pie-elements:text-entry:configure');

const Box = withStyles(theme => ({
  box: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
}))(({ classes, children }) => (<div className={classes.box}>{children}</div>))

const SubHeader = withStyles(theme => ({
  subHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    fontSize: '0.7rem'
  }
}))(({ classes, children }) => <Typography className={classes.subHeader}>{children}</Typography>);


const Answers = ({ choices, onChange }) => (
  <TagsInput tags={choices} onChange={onChange} />
)

const Bit = withStyles(theme => ({
  bit: {

    padding: 0,//theme.spacing.unit,
    paddingLeft: 0
  },
  contents: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
}))(({ classes, label, children }) => (
  <td className={classes.bit}>
    <div className={classes.contents}>{children}</div>
  </td>
));

const Response = withStyles(theme => ({
  response: {
    width: '100%',
  }
}))(({ classes, value, lang, feedback, onDelete }) => (
  <tr className={classes.response}>
    <Bit label="value">{value}</Bit>
    <Bit label="lang">{lang}</Bit>
    <Bit label="feedback">{!feedback ? 'none' : (feedback === 'DEFAULT' ? 'default' : feedback)}</Bit>
    <td><IconButton onClick={() => onDelete(value, lang)}><Cancel /></IconButton></td>
  </tr>
));

class AddResponse extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addLang: 'en-US'
    }
  }

  render() {
    const { onAddResponse } = this.props;

    return (<tr>
      <td><Input value={this.state.value} onChange={value => this.setState({ value })} /></td>
      <td><Select value={this.state.addLang}>
        <MenuItem value={'en-US'}>en-US</MenuItem>
        <MenuItem value={'es-ES'}>es-ES</MenuItem>
      </Select></td>
      <td>todo</td>
      <td><IconButton onClick={onAddResponse}><AddCircle /></IconButton></td>
    </tr >
    )
  }
}
const RawResponses = ({ responses, label, subHeader, children, classes, onDelete, onAdd }) => {

  return (
    <Box>
      <Typography type="body1">{label}</Typography>
      <table className={classes.responsesGrid}>
        <tbody>
          <tr>
            <th>value</th>
            <th>lang</th>
            <th>feedback</th>
            <th></th>
          </tr>
          {(responses.values || []).map((r, index) => <Response
            key={index}
            {...r}
            onDelete={onDelete} />)}

          <AddResponse onAddResponse={onAdd} />
        </tbody>
      </table>
      <Checkbox label="Case Sensitive" checked={false} />
      <Checkbox label="Ignore Whitespace" checked={false} />
      {children ? children : <div />}
    </Box >
  );
}

const Responses = withStyles(theme => ({
  responsesGrid: {
    width: '100%',
    '& th': {
      textAlign: 'left',
      fontSize: '12px',
      color: theme.palette.grey.A400
    }
  },
  responses: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  subHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    fontSize: '0.7rem'
  }
}))(RawResponses);

const InputSize = () => (<div>input size - todo</div>);
const InputAlignment = () => (<div>input alignment</div>);

const NumberOpts = () => (
  <div>
    <Checkbox label="Allow Decimals" />
    <Checkbox label="Allow Thousands separator" />
    <Checkbox label="Allow Negative numbers" />
  </div>
)

const Constraints = ({ allowNumbers }) => (
  <Box>
    <Typography type="display">Options</Typography>
    <Checkbox label="Only allow numbers" />
    {allowNumbers && <NumberOpts />}
    <InputSize />
    <InputAlignment />
  </Box>
)

const styles = theme => ({
  award: {
    width: '100%'
  }
});

class Configure extends React.Component {

  onDeleteCorrectResponse = (value, lang) => {
    const { model } = this.props;
    const update = model.correctResponses.values.filter(o => o.value !== value || o.lang !== lang);
    log('[onDeleteCorrectResponse] update: ', update);
    model.correctResponses.values = update;
    this.props.onModelChanged(model);
  }

  onAddCorrectResponse = (value, lang) => {
    //todo..
  }

  render() {
    const { classes, model } = this.props;

    return (
      <div>
        <Typography>Students will respond to a prompt (e.g., calculate, identify, compute), and the answer will be evaluated.</Typography>
        <Responses
          label="Correct Answers"
          subHeader="Additional correct answers may be added by clicking enter/return between answers."
          responses={model.correctResponses}
          onDelete={this.onDeleteCorrectResponse}
          onAdd={this.onAddCorrectResponse}
        />
        <Responses
          label="Partial Correct Answers (optional)"
          subHeader="Additional partially correct answers may be added by clicking enter/return between answers."
          responses={[]}>
          <div>
            <TextField className={classes.award} placeholder="0" label="Award % for partially correct answer" />
          </div>
        </Responses>

        <Constraints allowNumbers={true} />
        <FeedbackConfig />
      </div>
    )
  }
}

const ConfigureMain = withStyles(styles)(Configure);


class StateWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      model: props.model
    }

    this.onModelChanged = (m) => {
      this.setState({ model: m }, () => {
        this.props.onModelChanged(this.state.model);
      });
    }
  }


  render() {
    const { model } = this.state;
    return <ConfigureMain model={model} onModelChanged={this.onModelChanged} />
  }
}

export default StateWrapper;