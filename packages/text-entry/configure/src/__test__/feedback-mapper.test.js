import * as feedbackMapper from '../feedback-mapper';
import _ from 'lodash';

describe('feedback-mapper', () => {

  const _assertToFeedbackConfig = (only) => (msg, input, assertion) => {

    const fn = only ? it.only : it;
    fn(msg, () => {
      const out = feedbackMapper.textEntryToFeedbackConfig(input);
      console.log('out: ', out);

      if (_.isFunction(assertion)) {
        assertion(out);
      } else {
        expect(out).to.eql(assertion);
      }
    });
  }

  const assertFeedbackConfig = _assertToFeedbackConfig(false);
  assertFeedbackConfig.only = _assertToFeedbackConfig(true);

  describe('textEntryToFeedbackConfig', () => {

    assertFeedbackConfig('returns default', {
      correctResponses: {
        values: [{ lang: 'en-US', value: 'a', feedback: 'DEFAULT' }]
      }
    }, out => expect(out.correctFeedbackType).toEqual('default'));

    assertFeedbackConfig('returns none', {
      correctResponses: {
        values: [{ lang: 'en-US', value: 'a' }]
      }
    }, out => {
      expect(out.correctFeedbackType).toEqual('none');
    });
  });
});