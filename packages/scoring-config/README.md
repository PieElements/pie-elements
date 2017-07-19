# scoring-config


`scoring-config` is a panel that allows for the editing of scoring properties, for use within PIE configuration panels.

## Usage

### Install

    npm install --save @pie-libs/scoring-config


### Import

    import PartialScoringConfig from '@pie-libs/scoring-config/src/index.jsx';


### Element

    <PartialScoringConfig 
      numberOfCorrectResponses={this._sumCorrectAnswers()}
      partialScoring={this.props.model.partialScoring}
      onPartialScoringChange={this.onPartialScoringChange.bind(this)} />
