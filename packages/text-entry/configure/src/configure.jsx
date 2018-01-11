import { withStyles } from 'material-ui/styles';
import React from 'react';
import { Typography, TextField } from 'material-ui';
import { Checkbox, FeedbackConfig, TagsInput } from '@pie-libs/config-ui';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';

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

const RawResponses = ({ label, subHeader, children, classes, onResponsesChange }) => (
  <Box>
    <Typography type="body1">{label}</Typography>
    <SubHeader className={classes.subHeader}>{subHeader}</SubHeader>
    <Answers choices={['a', 'b', 'c', 'd', 'e']} onChange={onResponsesChange} />
    <Checkbox label="Case Sensitive" checked={false} />
    <Checkbox label="Ignore Whitespace" checked={false} />
    {children ? children : <div />}
  </Box >
);

const Responses = withStyles(theme => ({
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
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography>Students will respond to a prompt (e.g., calculate, identify, compute), and the answer will be evaluated.</Typography>
        <Responses
          label="Correct Answers"
          subHeader="Additional correct answers may be added by clicking enter/return between answers."
        />
        <Responses
          label="Partial Correct Answers (optional)"
          subHeader="Additional partially correct answers may be added by clicking enter/return between answers." >
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

export default withStyles(styles)(Configure);