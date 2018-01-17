import debug from 'debug';
import _ from 'lodash';
import { convert } from '../legacy-model-converter';
import { assert, match } from 'sinon';

const log = debug('pie-elements:text-entry:controller:test');

describe('legacy-model-converter', () => {


  const _conversionMatch = (label, input, output, isOnly) => {

    const fn = isOnly ? it.only : it;
    fn(label, () => {
      const converted = convert(input);
      log('converted: ', converted);
      if (_.isFunction(output)) {
        output(converted);
      } else {
        expect(converted).to.eql(output);
      }
    });
  }

  const conversionMatch = (label, i, o, isOnly) => _conversionMatch(label, i, o, false);
  conversionMatch.only = (label, i, o, isOnly) => _conversionMatch(label, i, o, true);

  describe('defaultLang', () => {
    conversionMatch('defaultLang is added', {}, c => assert.match(c.defaultLang, 'en-US'));
  });

  describe('correctResponses', () => {
    conversionMatch('strings are normalized with custom lang', {
      defaultLang: 'es-ES',
      correctResponses: {
        values: 'a'
      }
    }, c => assert.match(c.correctResponses.values, [{ lang: 'es-ES', value: 'a' }]));

    conversionMatch('strings are normalized', {
      correctResponses: {
        values: 'a'
      }
    }, c => assert.match(c.correctResponses.values, [{ lang: 'en-US', value: 'a' }]));

    conversionMatch('array of strings are normalized', {
      correctResponses: {
        values: ['a']
      }
    }, c => assert.match(c.correctResponses.values, [{ lang: 'en-US', value: 'a' }]));

    conversionMatch('array of lang objects arent normalized', {
      correctResponses: {
        values: [{ lang: 'es-ES', value: 'a' }]
      }
    }, c => assert.match(c.correctResponses.values, [{ lang: 'es-ES', value: 'a' }]));

    conversionMatch('feedback is added when in <div>', {

      correctResponses: {
        values: 'a',
        feedback: {
          type: 'custom',
          value: '<div>a</div>',
          custom: 'this is the feedback'
        }
      }
    }, c => {
      return assert.match(c.correctResponses.values, [{
        lang: 'en-US', value: 'a', feedback: 'this is the feedback'
      }])
    })

    conversionMatch('feedback is added ', {

      correctResponses: {
        values: 'a',
        feedback: {
          type: 'custom',
          value: 'a',
          custom: 'this is the feedback'
        }
      }
    }, c => {
      return assert.match(c.correctResponses.values, [{
        lang: 'en-US', value: 'a', feedback: 'this is the feedback'
      }]);
    });

    conversionMatch('feedback none is set ', {

      correctResponses: {
        values: ['a', 'b'],
        feedback: {
          type: 'none',
          value: 'a',
        }
      }
    }, c => {
      return assert.match(c.correctResponses.values, [
        {
          lang: 'en-US', value: 'a', feedback: null
        },
        {
          lang: 'en-US', value: 'b', feedback: null
        }
      ]);
    });
  })
});

/*
      defaultLang: 'en-US',
      correctResponses: {
        ignoreCase: false,
        ignoreWhitespace: false,
        values: [
          { lang: 'en-US', value: 'a' }
        ]
      },
      partialResponses: {
        ignoreCase: false,
        ignoreWhitespace: false,
        values: []
      },
      incorrectResponses: {
        feedback: {
          type: 'default'
        }
      }
    }
  )
});
*/