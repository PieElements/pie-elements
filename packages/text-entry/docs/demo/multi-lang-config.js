module.exports = {
  langs: ['en-US', 'es-ES'],
  elements: {
    'text-entry': '../..'
  },
  models: [
    {
      id: '1',
      //prompt: 
      //what's another name for a dog
      //¿Cuál es un nombre diferente para un perro?
      element: 'text-entry',
      defaultLang: 'en-US',
      correctResponses: {
        //values: 'a' => values: [ {lang: defaultLang}, value: 'a', feedback: 'default'}]
        //values: ['a'] => values: [ {lang: defaultLang}, value: 'a', feedback: 'default'}]
        values: [
          //set feedback to a string => custom
          { lang: 'en-US', value: 'mutt', feedback: 'M' },
          //set it to null - means no feedback 'none'
          { lang: 'en-US', value: 'hound', feedback: null },
          //not specifying 'feedback' == feedback: 'default'
          { lang: 'es-ES', value: 'chucho' },
          { lang: 'es-ES', value: 'sabueso' }
        ]
      },
      partialResponses: {
        values: [
          { lang: 'en-US', value: 'mutty' },
          { lang: 'es-ES', value: 'sabuesos' }
        ],
        ignoreWhitespace: true,
        ignoreCase: true,
      },
      incorrectFeedback: {
        matches: [
          { lang: 'en-US', value: 'x', feedback: 'no x' }
        ]
        fallback: {
          type: 'custom',
          values: [
            { lang: 'en-US', value: 'fallback feedback for en-US' },
            { lang: 'es-ES', value: 'no bueno' }
          ]
        }
      },
      // {
      //   type: 'custom',

      //   values: ['<div>no</div>']
      // },
      model: {
        answerBlankSize: '5',
        answerAlignment: 'right',
        allowDecimal: false,
        allowIntegersOnly: false
      }
    }
  ]
}