import Card, { CardContent } from 'material-ui/Card';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import React from 'react';
import ReactDom from 'react-dom';
import ScoringConfigRow from './scoring-config-row';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

const emptyStyles = createStyleSheet('empty', theme => {
  return {
    root: {
      padding: '20px'
    }
  }
});

const Empty = ({ classes }) => <div className={classes.root}>
  <Typography type="caption">You must have more than 1 correct response to set up partial scoring</Typography>
</div>;

const StyledEmpty = withStyles(emptyStyles)(Empty);

export default class PartialScoringConfig extends React.Component {

  render() {
    const { numberOfCorrectResponses } = this.props;

    return <div>
      <Typography>
        If there is more than one correct answer to this question, you may allow partial credit based
        on the number of correct answers submitted. This is optional.
      </Typography>
      <br />
      <Card>
        <CardContent>
          <Typography type="body1">Partial Scoring Rules</Typography>
          {numberOfCorrectResponses > 1 ? <ScoringConfigRow {...this.props} /> : <StyledEmpty />}
        </CardContent>
      </Card>
    </div>;
  }
}