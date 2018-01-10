import { withStyles } from 'material-ui/styles';
import React from 'react';
import { Typography, TextField } from 'material-ui';
import { Checkbox, FeedbackConfig } from '@pie-libs/config-ui';

const RawResponses = ({ label, subHeader, children, classes }) => (
  <div className={classes.responses}>
    <Typography type="display">{label}</Typography>
    <Typography className={classes.subHeader}>{subHeader}</Typography>
    <div>answers here</div>
    <Checkbox label="Case Sensitive" />
    <Checkbox label="Ignore Whitespace" />
    {children ? children : <div />}
  </div>
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
  <div>
    <Typography>Options</Typography>
    <Checkbox label="Only allow numbers" />
    {allowNumbers && <NumberOpts />}
    <InputSize />
    <InputAlignment />
  </div>
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