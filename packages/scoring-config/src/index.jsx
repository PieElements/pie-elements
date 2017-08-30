import Card, { CardContent } from 'material-ui/Card';

import React from 'react';
import ReactDom from 'react-dom';
import ScoringConfigRow from './scoring-config-row';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const emptyStyles = {
  root: {
    padding: '20px'
  }
};

const Empty = ({ classes }) => <div className={classes.root}>
  <Typography type="caption">You must have more than 1 correct response to set up partial scoring</Typography>
</div>;

const StyledEmpty = withStyles(emptyStyles, { name: 'Empty' })(Empty);

export class PartialScoringConfig extends React.Component {

  render() {
    const { numberOfCorrectResponses, classes } = this.props;

    return <div className={classes.scoringConfig}>
      <Typography type="subheading">Partial Scoring Rules</Typography>
      <br />
      <Typography>
        If there is more than one correct answer to this question, you may allow partial credit based
        on the number of correct answers submitted. This is optional.
      </Typography>
      <br />
      {numberOfCorrectResponses > 1 ? <ScoringConfigRow {...this.props} /> : <StyledEmpty />}
    </div>;
  }
}

export default withStyles({
  scoringConfig: {
    paddingTop: '10px'
  }
}, { name: 'PartialScoringConfig' })(PartialScoringConfig);