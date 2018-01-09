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
          { lang: 'es-ES', value: 'sabuesos', feedback: 'Hoy' }
        ],
        ignoreWhitespace: true,
        ignoreCase: true,
      },
      incorrectFeedback: {
        //you can completely disable incorrect feedback if you want.
        disabled: false,
        //An array of possible incorrect responses to match against.
        matches: [
          { lang: 'en-US', value: 'x', feedback: 'no x' }, //aka if they enter x when using en-US feedback is 'no x'
          { lang: 'es-ES', value: 'apple', feedback: 'Uso Espanol' } //aka if they enter x when using en-US feedback is 'no x'
        ],
        //Failing that match by lang only
        fallback: {
          values: [
            { lang: 'en-US', feedback: 'fallback feedback for en-US' },
            { lang: 'es-ES', feedback: 'no bueno' }
          ]
        }
        //Failing that we use the internal default feedback.
      },
      model: {
        answerBlankSize: '5',
        answerAlignment: 'right',
        allowDecimal: false,
        allowIntegersOnly: false
      }
    }
  ]
}