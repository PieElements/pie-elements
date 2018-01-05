import { expect } from 'chai';
import debug from 'debug';

const env = (mode) => ({ mode: mode || 'evaluate' });
const log = debug('pie-elements:text-entry:test');

describe('model', () => {

  let mod, question;

  beforeEach(() => {
    mod = require('../src/index');
    question = {
      correctResponses: {
        values: [
          { lang: 'en-US', data: ['apple'] },
          { lang: 'es-ES', data: ['manzana'] }
        ]
      }
    }
  });

  describe('multilang', () => {

    describe('lang lookup', () => {

      it('returns correct for apple:en-US', () =>
        mod.model(question, { value: 'apple', lang: 'en-US' }, env())
          .then(m => {
            log('m: ', m);
            expect(m.correctness).to.eql('correct');
          }));

      it('returns incorrect for manzana:en-US', () =>
        mod.model(question, { value: 'manzana', lang: 'en-US' }, env())
          .then(m => {
            expect(m.correctness).to.eql('incorrect');
          }));

      it('returns correct for manzana:es-ES', () =>
        mod.model(question, { value: 'manzana', lang: 'es-ES' }, env())
          .then(m => {
            expect(m.correctness).to.eql('correct');
          }));
    });

    describe('when data is a string', () => {

      it('returns correct for appley:en-US', () => {
        question.correctResponses.values[0].data = 'appley';
        return mod.model(question, { value: 'appley', lang: 'en-US' }, env())
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
        mod.model(question, { value: 'apple', lang: 'zh-CN' }, env())
          .then(m => {
            expect(m.correctness).to.eql('correct');
          }));


      it('returns incorrect for manzana:zh-CN', () =>
        mod.model(question, { value: 'manzana', lang: 'zh-CN' }, env())
          .then(m => {
            expect(m.correctness).to.eql('incorrect');
          }));
    });

  });
});