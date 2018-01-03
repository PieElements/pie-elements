import { expect } from 'chai';

const env = (lang) => ({ lang, mode: 'evaluate' });

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
        mod.model(question, { value: 'apple' }, env('en-US'))
          .then(m => {
            expect(m.correctness).to.eql('correct');
          }));

      it('returns incorrect for manzana:en-US', () =>
        mod.model(question, { value: 'manzana' }, env('en-US'))
          .then(m => {
            expect(m.correctness).to.eql('incorrect');
          }));

      it('returns correct for manzana:es-ES', () =>
        mod.model(question, { value: 'manzana' }, env('es-ES'))
          .then(m => {
            expect(m.correctness).to.eql('correct');
          }));
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

  });
});