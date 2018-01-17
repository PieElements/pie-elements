import { getQuestion, env } from './stub-data';

import { outcome } from '../index';



describe('outcome', () => {

  it('if award not set returns 0.5', () => {
    const question = getQuestion();
    delete question.partialResponses.award;
    const session = {
      value: 'apples'
    }
    return outcome(question, session, env())
      .then(o => {
        expect(o.score).toEqual(0.5);
      });
  });

  it('returns award', () => {
    const question = getQuestion();
    const session = {
      value: 'apples'
    }
    return outcome(question, session, env())
      .then(o => {
        expect(o.score).toEqual(0.52);
      });
  });
});