import { maxScore, score } from '../src/scoring';

import _ from 'lodash';
import chai from 'chai';

const expect = chai.expect;

describe('score', () => {
  let correctResponse = ['c1', 'c2', 'c3', 'c4'];

  let baseQuestion = {
    choices: correctResponse.map(choice => {
      return {
        correct: true,
        value: choice
      };
    })
  };

  describe('default scoring', () => {
    let question = _.cloneDeep(baseQuestion);

    describe('all correct', () => {
      let session = {
        value: _.cloneDeep(correctResponse)
      };

      it('should return 1', () => {
        expect(score(question, session)).to.eql(1);
      });

    });

    describe('some correct', () => {
      let session = {
        value: (() => {
          let response = _.cloneDeep(correctResponse);
          response.splice(1, 1);
          return response;
        })()
      };

      it('should return 0', () => {
        expect(score(question, session)).to.eql(0);
      });

    });

    describe('none correct', () => {
      let session = {
        value: ['a1', 'a2']
      };

      it('should return 0', () => {
        expect(score(question, session)).to.eql(0);
      });

    });

  });

  describe('partial scoring', () => {
    let question = _.merge(_.cloneDeep(baseQuestion), {
      partialScoring: [
        {
          correctCount: 1,
          weight: 0.2
        }
      ]
    });

    let weightFor = (count) => {
      return question.partialScoring.find(({ correctCount }) => count === correctCount).weight;
    }

    describe('all correct', () => {
      let session = {
        value: _.cloneDeep(correctResponse)
      };

      it('should return 1', () => {
        expect(score(question, session)).to.eql(1);
      });
    });

    describe('some correct', () => {
      let numberCorrect = 1;

      let session = {
        value: (() => {
          let response = _.cloneDeep(correctResponse);
          for (var i = 0; i < response.length - numberCorrect; i++) {
            response[i] = undefined;
          }
          return response;
        })()
      };

      it('should return corresponding weight * maxScore', () => {
        expect(score(question, session)).to.eql(maxScore * weightFor(numberCorrect));
      });

    });

    describe('none correct', () => {
      let session = {
        value: [null, null, null, null]
      };

      it('should return 0', () => {
        expect(score(question, session)).to.eql(0);
      });

    });

  });

  /**
   * TODO: disabling this for now - it's not in the UI 
   * And it allows values > 1.0 as a score which shouldn't be possible.
   */
  xdescribe('weighted scoring', () => {

    let question = {
      choices: correctResponse.map(choice => {
        return {
          correct: true,
          value: choice,
          weight: Math.random()
        };
      })
    };

    describe('some correct', () => {
      let session = {};

      function sessionForCorrect(correct) {
        return {
          value: _.cloneDeep(correct)
        };
      }

      it('should return the sum of weights for correct choices', () => {
        const correctChoices = ['c1', 'c3'];
        let session = sessionForCorrect(correctChoices);
        let expectedScore = correctChoices.map((choice) => {
          return question.choices.find(({ value }) => value === choice).weight;
        }).reduce((a, b) => a + b, 0);

        const s = score(question, session);
        expect(s <= 1.0).to.be.true;
        expect(score(question, session)).to.eql(expectedScore);
      });

    });

    describe('none correct', () => {
      let session = {
        value: [null, null, null, null]
      };

      it('should return 0', () => {
        expect(score(question, session)).to.eql(0);
      });

    });

  });

});