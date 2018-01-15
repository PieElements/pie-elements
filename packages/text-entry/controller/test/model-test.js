import { expect } from 'chai';
import debug from 'debug';

const env = (locale) => ({ mode: 'evaluate', locale: locale || 'en-US' });
const log = debug('pie-elements:text-entry:test');

describe('model', () => {

  let mod, question;

  beforeEach(() => {
    mod = require('../src/model');
    question = {
      correctResponses: {
        values: [
          { lang: 'en-US', value: 'apple', feedback: 'Custom One' },
          { lang: 'en-US', value: 'pear', feedback: 'DEFAULT' },
          { lang: 'es-ES', value: 'manzana', feedback: 'Custom Two' }
        ]
      },
      partialResponses: {
        values: [
          { lang: 'en-US', value: 'apples' },
          { lang: 'es-ES', value: 'manzanan' }
        ]
      },
      incorrectFeedback: {
        disabled: false,
        matches: [
          { lang: 'en-US', value: 'appler', feedback: 'Typo?' },
          { lang: 'es-ES', value: 'apples', feedback: 'Uso Espanol' },
          { lang: 'es-ES', value: 'mmanzana', feedback: 'Typo??' }
        ],
        fallback: {
        }
      }
    }
  });

  describe('multilang', () => {

    describe('lang lookup', () => {

      it('returns correct for apple:en-US', () =>
        mod.model(question, { value: 'apple' }, env())
          .then(m => {
            log('m: ', m);
            expect(m.correctness).to.eql('correct');
          }));

      it('returns correct for APPLE:en-US', () => {
        question.correctResponses.ignoreCase = true;
        return mod.model(question, { value: 'APPLE' }, env())
          .then(m => expect(m.correctness).to.eql('correct'))
      });

      it('returns incorrect for APPLE:en-US when ignoreCase:false', () => {
        question.correctResponses.ignoreCase = false;
        return mod.model(question, { value: 'APPLE' }, env())
          .then(m => expect(m.correctness).to.eql('incorrect'))
      });

      it('returns correct for A P P L E:en-US', () => {
        question.correctResponses.ignoreWhitespace = true;
        question.correctResponses.ignoreCase = true;
        return mod.model(question, { value: 'A P P L E' }, env())
          .then(m => expect(m.correctness).to.eql('correct'));
      });

      it('returns incorrect for A P P L E:en-US when ignoreWhitespace: false', () => {
        question.correctResponses.ignoreWhitespace = false;
        return mod.model(question, { value: 'A P P L E' }, env())
          .then(m => expect(m.correctness).to.eql('incorrect'));
      });


      it('returns correct for pear:en-US', () =>
        mod.model(question, { value: 'pear' }, env())
          .then(m => {
            log('m: ', m);
            expect(m.correctness).to.eql('correct');
          }));

      it('returns incorrect for manzana:en-US', () =>
        mod.model(question, { value: 'manzana' }, env())
          .then(m => {
            expect(m.correctness).to.eql('incorrect');
          }));

      it('returns correct for manzana:es-ES', () =>
        mod.model(question, { value: 'manzana' }, env('es-ES'))
          .then(m => {
            expect(m.correctness).to.eql('correct');
          }));
    });

    describe('when data is a string', () => {

      it('returns correct for appley:en-US', () => {
        question.correctResponses.values[0].value = 'appley';
        return mod.model(question, { value: 'appley' }, env())
          .then(m => {
            log('m: ', m);
            expect(m.correctness).to.eql('correct');
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
        mod.model(question, { value: 'apple' }, env('zh-CN'))
          .then(m => {
            expect(m.correctness).to.eql('correct');
          }));


      it('returns incorrect for manzana:zh-CN', () =>
        mod.model(question, { value: 'manzana' }, env('zh-CN'))
          .then(m => {
            expect(m.correctness).to.eql('incorrect');
          }));
    });

    describe('feedback', () => {
      it('return custom feedback for apple:en-US', () => mod.model(question, { value: 'apple' }, env())
        .then(c => expect(c.feedback).to.eql('Custom One')))

      it('return custom feedback for manzana:es-ES', () => mod.model(question, { value: 'manzana' }, env('es-ES'))
        .then(c => expect(c.feedback).to.eql('Custom Two')))

      it('return default correct feedback for pear:en-US', () => mod.model(
        question,
        { value: 'pear' },
        env()).then(c => expect(c.feedback).to.eql(mod.DEFAULT_FEEDBACK.correct)));
    });

    describe('incorrect feedback', () => {

      it('return default incorrect feedback for melon:en-US', () => mod.model(
        question,
        { value: 'melon' },
        env()).then(c => expect(c.feedback).to.eql(mod.DEFAULT_FEEDBACK.incorrect)));

      it('returns matched incorrect feedback', () => {
        return mod.model(question, { value: 'appler' }, env())
          .then(c => expect(c.feedback).to.eql('Typo?'));
      });

      it('returns matched incorrect feedback', () => {
        return mod.model(question, { value: 'apples' }, env('es-ES'))
          .then(c => expect(c.feedback).to.eql('Uso Espanol'));
      });

      it('returns matched incorrect feedback', () => {
        return mod.model(question, { value: 'mmanzana' }, env('es-ES'))
          .then(c => expect(c.feedback).to.eql('Typo??'));
      });

      describe('disabled', () => {
        beforeEach(() => {
          question.incorrectFeedback.disabled = true;
        });

        it('has no feedback', () => {
          return mod.model(question, { value: 'apples', lang: 'en-US' }, env())
            .then(c => expect(c.feedback).to.eql(''));
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
          return mod.model(question, { value: 'aaaapplllee' }, env())
            .then(c => {
              expect(c.feedback).to.eql(feedback);
            });
        });

        it('falls back to defaultLang targeted feedback', () => {
          return mod.model(question, { value: 'aaaapplllee' }, env('zh-CN'))
            .then(c => {
              expect(c.feedback).to.eql(feedback);
            });
        });
      })
    })
  });
});