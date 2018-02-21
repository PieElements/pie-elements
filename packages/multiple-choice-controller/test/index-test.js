import * as controller from '../src/index';

import _ from 'lodash';
import chai from 'chai';
import shallowDeepEqual from 'chai-shallow-deep-equal';

chai.use(shallowDeepEqual);

const expect = chai.expect;

describe('index', () => {

  let base = (o) => {
    o = _.merge({
      defaultLang: 'en-US',
      prompt: [
        { lang: 'en-US', value: 'hi' },
        { lang: 'es-ES', value: 'ola' }
      ],
      choices: [
        {
          value: '1',
          label: [
            { lang: 'en-US', value: 'One' },
            { lang: 'es-ES', value: 'Uno' }
          ],
          correct: true,
          feedback: {
            type: 'custom',
            custom: [
              { lang: 'en-US', value: 'Yes 1 is right' },
              { lang: 'es-ES', value: 'Si 1 esta correcto' }
            ]
          }
        },
        {
          value: '1',
          label: [
            { lang: 'en-US', value: 'Two' },
            { lang: 'es-ES', value: 'Dos' }
          ],
          feedback: {
            type: 'custom',
            custom: [
              { lang: 'en-US', value: 'not right' },
              { lang: 'es-ES', value: 'no bueno' }
            ]
          }
        }
      ]
    }, o);
    return o;
  }

  describe('model', () => {

    let assertModel = (q, s, e, partialExpected) => {
      return (done) => {
        controller.model(q, s, e)
          .then(m => {
            if (_.isFunction(partialExpected)) {
              partialExpected(m);
            } else {
              expect(m).to.shallowDeepEqual(partialExpected);
            }
            done();
          })
          .catch(e => {
            if (_.isFunction(partialExpected) && partialExpected.name === 'Error') {
              done();
            } else {
              done(e);
            }
          });
      }
    }

    it('throws an error for an empty model', assertModel({}, {}, {}, Error));

    describe('prompt', () => {
      it('returns prompt', assertModel(base(), {}, {}, { prompt: 'hi' }));
      it('returns prompt in spanish', assertModel(base(), {}, { locale: 'es-ES' }, { prompt: 'ola' }));
    });

    describe('mode', () => {
      it('returns the mode', assertModel(base(), {}, { mode: 'gather' }, { mode: 'gather' }));
    });

    describe('disabled', () => {
      it('gather is disabled', assertModel(base(), {}, { mode: 'gather' }, { disabled: false }));
      it('view is disabled', assertModel(base(), {}, { mode: 'view' }, { disabled: true }));
      it('evaluate is disabled', assertModel(base(), {}, { mode: 'evaluate' }, { disabled: true }));
    });

    describe('responseCorrect', () => {
      it('undefined in gather', assertModel(base(), {}, { mode: 'gather' }, {
        responseCorrect: undefined
      }));

      it('undefined in view', assertModel(base(), {}, { mode: 'view' }, {
        responseCorrect: undefined
      }));

      it('false if answer wrong in evaluate', assertModel(base(), {}, { mode: 'evaluate' }, {
        responseCorrect: false
      }));

      it('true if answer right in evaluate', assertModel(base(), { value: ['1'] }, { mode: 'evaluate' }, {
        responseCorrect: true
      }));
    });

    describe('choices', () => {
      it('returns the choice', assertModel(base(), {}, { mode: 'gather' }, {
        choices: [
          { label: 'One', value: '1' }
        ]
      }));

      it('returns the choice', assertModel(base(), {}, { mode: 'view' }, {
        choices: [
          { label: 'One', value: '1' }
        ]
      }));

      it('returns the choice feedback in evaluate mode', assertModel(base(), {}, { mode: 'evaluate' }, {
        choices: [
          { label: 'One', value: '1', correct: true, feedback: 'Yes 1 is right' }
        ]
      }));

      describe('in spanish', () => {
        let env = { locale: 'es-ES', mode: 'evaluate' }
        it('returns the choice', assertModel(base(), {}, env, {
          choices: [
            { label: 'Uno', value: '1', feedback: 'Si 1 esta correcto' },
            { label: 'Dos', value: '1', feedback: 'no bueno' }
          ]
        }));
      });
    });

    describe('className', () => {
      it('returns black_on_rose', assertModel(base(), {}, { accessibility: { colorContrast: 'black_on_rose' } }, { className: 'black-on-rose' }));
      it('returns white_on_black', assertModel(base(), {}, { accessibility: { colorContrast: 'white_on_black' } }, { className: 'white-on-black' }));
      it('returns black_on_white', assertModel(base(), {}, { accessibility: { colorContrast: 'black_on_white' } }, { className: 'default' }));
    });



    describe('outcome', () => {

      let outcome = (q, s, e, handler) => {
        return () => {
          return controller.outcome(q, s, e)
            .then(o => handler(o))
            .catch(e => handler(e));
        }
      }

      const isSessionComplete = (session, expected) => outcome.bind(null,
        { choices: [{ correct: true, value: 'a' }, { value: 'b' }] },
        session,
        null,
        result => expect(result.complete).to.eql(expected)
      );

      it('returns complete:false if the no of answers is the >= correct length', () => {
        isSessionComplete([], false);
      });
      it('returns complete:false if the no of answers is the >= correct length', () => {
        isSessionComplete(['b'], true);
      });


      it('returns an error if the question is null', outcome(null, {}, {}, (result) => {
        expect(result.message).to.eql('Question is missing required array: choices');
      }));

      it('returns an error if the question.correctResponse', outcome({}, {}, {}, (result) => {
        expect(result.message).to.eql('Question is missing required array: choices');
      }));

      it('returns an error if the question.correctResponse is empty', outcome({ correctResponse: [] }, {}, {}, (result) => {
        expect(result.message).to.eql('Question is missing required array: choices');
      }));


      const justA = outcome.bind(null, {
        choices: [{ value: 'a', correct: true }]
      });

      const eqls = (o) => (r) => expect(r).to.eql(o);

      it('returns score: 1 for a correct response', justA({ value: ['a'] }, null, eqls({ score: 1, complete: true })));
      it('returns score: 0 and complete: false for an empty response', justA({ value: [] }, null, eqls({ score: 0, complete: false })));
      it('returns score: 0 for an incorrect response', justA({ value: ['b'] }, null, eqls({ score: 0, complete: true })));
    });
  });
});