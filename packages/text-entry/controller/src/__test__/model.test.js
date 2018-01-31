import debug from 'debug';
import { model, getCorrectness, DEFAULT_FEEDBACK } from '../model';
import { getQuestion, env } from './stub-data';

const log = debug('pie-elements:text-entry:test');

describe('model', () => {

  let question;

  beforeEach(() => {
    question = getQuestion();
  });

  describe('multilang', () => {

    describe('lang lookup', () => {

      it('returns correct for apple:en-US', () =>
        model(question, { value: 'apple' }, env())
          .then(m => {
            log('m: ', m);
            expect(m.correctness).toEqual('correct');
          }));

      it('returns correct for APPLE:en-US', () => {
        question.correctResponses.ignoreCase = true;
        return model(question, { value: 'APPLE' }, env())
          .then(m => expect(m.correctness).toEqual('correct'))
      });

      it('returns incorrect for APPLE:en-US when ignoreCase:false', () => {
        question.correctResponses.ignoreCase = false;
        return model(question, { value: 'APPLE' }, env())
          .then(m => expect(m.correctness).toEqual('incorrect'))
      });

      it('returns correct for A P P L E:en-US', () => {
        question.correctResponses.ignoreWhitespace = true;
        question.correctResponses.ignoreCase = true;
        return model(question, { value: 'A P P L E' }, env())
          .then(m => expect(m.correctness).toEqual('correct'));
      });

      it('returns incorrect for A P P L E:en-US when ignoreWhitespace: false', () => {
        question.correctResponses.ignoreWhitespace = false;
        return model(question, { value: 'A P P L E' }, env())
          .then(m => expect(m.correctness).toEqual('incorrect'));
      });


      it('returns correct for pear:en-US', () =>
        model(question, { value: 'pear' }, env())
          .then(m => {
            log('m: ', m);
            expect(m.correctness).toEqual('correct');
          }));

      it('returns incorrect for manzana:en-US', () =>
        model(question, { value: 'manzana' }, env())
          .then(m => {
            expect(m.correctness).toEqual('incorrect');
          }));

      it('returns correct for manzana:es-ES', () =>
        model(question, { value: 'manzana' }, env('es-ES'))
          .then(m => {
            expect(m.correctness).toEqual('correct');
          }));
    });

    describe('when data is a string', () => {

      it('returns correct for appley:en-US', () => {
        question.correctResponses.values[0].value = 'appley';
        return model(question, { value: 'appley' }, env())
          .then(m => {
            log('m: ', m);
            expect(m.correctness).toEqual('correct');
          });
      });
    });

    describe('defaultLang', () => {

      beforeEach(() => {
        question = Object.assign(question, {
          defaultLang: 'en-US'
        });
      });
      /**
       * if zh-CN isn't found it'll check the response using the defaultLang.
       */
      it('returns correct for apple:zh-CN', () =>
        model(question, { value: 'apple' }, env('zh-CN'))
          .then(m => {
            expect(m.correctness).toEqual('correct');
          }));


      it('returns incorrect for manzana:zh-CN', () =>
        model(question, { value: 'manzana' }, env('zh-CN'))
          .then(m => {
            expect(m.correctness).toEqual('incorrect');
          }));
    });

    describe('feedback', () => {
      it('return custom feedback for apple:en-US', () => model(question, { value: 'apple' }, env())
        .then(c => expect(c.feedback).toEqual('Custom One')))

      it('return custom feedback for manzana:es-ES', () => model(question, { value: 'manzana' }, env('es-ES'))
        .then(c => expect(c.feedback).toEqual('Custom Two')))

      it('return default correct feedback for pear:en-US', () => model(
        question,
        { value: 'pear' },
        env()).then(c => expect(c.feedback).toEqual(DEFAULT_FEEDBACK.correct)));
    });

    describe('incorrect feedback', () => {

      it('return default incorrect feedback for melon:en-US', () => model(
        question,
        { value: 'melon' },
        env()).then(c => expect(c.feedback).toEqual(DEFAULT_FEEDBACK.incorrect)));

      it('returns matched incorrect feedback', () => {
        return model(question, { value: 'appler' }, env())
          .then(c => expect(c.feedback).toEqual('Typo?'));
      });

      it('returns matched incorrect feedback', () => {
        return model(question, { value: 'apples' }, env('es-ES'))
          .then(c => expect(c.feedback).toEqual('Uso Espanol'));
      });

      it('returns matched incorrect feedback', () => {
        return model(question, { value: 'mmanzana' }, env('es-ES'))
          .then(c => expect(c.feedback).toEqual('Typo??'));
      });

      describe('disabled', () => {
        beforeEach(() => {
          question.incorrectFeedback.disabled = true;
        });

        it('has no feedback', () => {
          return model(question, { value: 'apples', lang: 'en-US' }, env())
            .then(c => expect(c.feedback).toEqual(''));
        })
      })


      describe('fallback', () => {

        let feedback;
        beforeEach(() => {
          feedback = 'this is generic feedback for en-US'
          question.incorrectFeedback.fallback.values = [
            {
              lang: 'en-US',
              feedback
            }];
        });

        it('falls back to lang targeted feedback', () => {
          return model(question, { value: 'aaaapplllee' }, env())
            .then(c => {
              expect(c.feedback).toEqual(feedback);
            });
        });

        it('falls back to defaultLang targeted feedback', () => {
          return model(question, { value: 'aaaapplllee' }, env('zh-CN'))
            .then(c => {
              expect(c.feedback).toEqual(feedback);
            });
        });
      })
    })
  });

  describe('correctness', () => {

    it('returns correct', () => {
      const correctness = getCorrectness(question, { value: 'apple' }, env());
      expect(correctness).toEqual('correct');
    });

    it('returns partially-correct', () => {
      const correctness = getCorrectness(question, { value: 'apples' }, env());
      expect(correctness).toEqual('partially-correct');
    });

    it('returns incorrect', () => {
      const correctness = getCorrectness(question, { value: 'appler' }, env());
      expect(correctness).toEqual('incorrect');
    });
  });
});
